const supabase = require('../config/supabase');
const db = require('../config/db');

// @desc    Upload file to Supabase & Save Metadata
// @route   POST /api/files/upload
exports.uploadFile = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

        const file = req.file;
        const userId = req.user.id;
        const parentId = (req.body.parent_id && req.body.parent_id.trim() !== "") ? req.body.parent_id : null;

        // If uploading to a folder, check ownership
        if (parentId) {
            const hasAccess = await db.query(
                'SELECT * FROM files WHERE id = $1 AND user_id = $2 AND is_folder = TRUE',
                [parentId, userId]
            );
            if (hasAccess.rows.length === 0) return res.status(403).json({ message: 'Access denied' });
        }

        const fileName = `${Date.now()}-${file.originalname}`;

        // 1. Upload to Supabase Storage
        const { data, error } = await supabase.storage
            .from(process.env.SUPABASE_BUCKET)
            .upload(fileName, file.buffer, {
                contentType: file.mimetype,
            });

        if (error) {
            console.error('Supabase Storage Error:', error);
            throw new Error(`Storage Error: ${error.message}`);
        }

        // 2. Get Public URL
        const { data: urlData } = supabase.storage
            .from(process.env.SUPABASE_BUCKET)
            .getPublicUrl(fileName);

        const publicUrl = urlData.publicUrl;

        // 3. Save to Database
        const newFile = await db.query(
            'INSERT INTO files (name, size, type, url, user_id, parent_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [file.originalname, file.size, file.mimetype, publicUrl, userId, parentId]
        );

        res.status(201).json(newFile.rows[0]);

    } catch (error) {
        console.error('Upload Error:', error.message);
        res.status(500).json({ message: 'Upload failed', error: error.message });
    }
};

// @desc    Get all files for logged-in user with filters
// @route   GET /api/files
exports.getFiles = async (req, res) => {
    try {
        const userId = req.user.id;
        const { starred, trash } = req.query;

        let query = 'SELECT * FROM files WHERE user_id = $1';
        let params = [userId];

        if (trash === 'true') {
            query += ' AND is_trash = TRUE';
        } else if (starred === 'true') {
            query += ' AND is_starred = TRUE AND is_trash = FALSE';
        } else {
            query += ' AND is_trash = FALSE';
        }

        query += ' ORDER BY is_folder DESC, created_at DESC';
        
        const result = await db.query(query, params);
        res.json(result.rows);
    } catch (error) {
        console.error('Get Files Error:', error.message);
        res.status(500).json({ message: 'Failed to fetch files' });
    }
};

// @desc    Delete file permanently
// @route   DELETE /api/files/:id
exports.deleteFile = async (req, res) => {
    try {
        const fileId = req.params.id;
        const userId = req.user.id;

        const result = await db.query('SELECT * FROM files WHERE id = $1 AND user_id = $2', [fileId, userId]);
        if (result.rows.length === 0) return res.status(403).json({ message: 'Unauthorized: Only the owner can delete this file' });

        const file = result.rows[0];
        
        // Delete from Supabase storage if it's a file (not folder)
        if (!file.is_folder && file.url) {
            const fileName = file.url.split('/').pop();
            await supabase.storage.from(process.env.SUPABASE_BUCKET).remove([fileName]);
        }

        await db.query('DELETE FROM files WHERE id = $1', [fileId]);

        res.json({ message: 'File deleted successfully' });
    } catch (error) {
        console.error('Delete Error:', error.message);
        res.status(500).json({ message: 'Delete failed' });
    }
};

// @desc    Toggle star on a file/folder
// @route   PUT /api/files/:id/star
exports.toggleStar = async (req, res) => {
    try {
        const fileId = req.params.id;
        const userId = req.user.id;

        const result = await db.query(
            'UPDATE files SET is_starred = NOT is_starred WHERE id = $1 AND user_id = $2 RETURNING *',
            [fileId, userId]
        );

        if (result.rows.length === 0) return res.status(404).json({ message: 'Item not found' });

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Toggle Star Error:', error.message);
        res.status(500).json({ message: 'Failed to toggle star' });
    }
};

// @desc    Move file/folder to trash (soft delete) or restore
// @route   PUT /api/files/:id/trash
exports.toggleTrash = async (req, res) => {
    try {
        const fileId = req.params.id;
        const userId = req.user.id;

        const result = await db.query(
            'UPDATE files SET is_trash = NOT is_trash WHERE id = $1 AND user_id = $2 RETURNING *',
            [fileId, userId]
        );

        if (result.rows.length === 0) return res.status(404).json({ message: 'Item not found' });

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Toggle Trash Error:', error.message);
        res.status(500).json({ message: 'Failed to move to trash' });
    }
};

// @desc    Rename a file
// @route   PUT /api/files/:id/rename
exports.renameFile = async (req, res) => {
    try {
        const fileId = req.params.id;
        const userId = req.user.id;
        const { name } = req.body;

        if (!name || !name.trim()) return res.status(400).json({ message: 'Name is required' });

        const result = await db.query(
            'UPDATE files SET name = $1 WHERE id = $2 AND user_id = $3 RETURNING *',
            [name.trim(), fileId, userId]
        );

        if (result.rows.length === 0) return res.status(404).json({ message: 'Item not found' });

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Rename Error:', error.message);
        res.status(500).json({ message: 'Failed to rename' });
    }
};

// @desc    Get file info
// @route   GET /api/files/:id/info
exports.getFileInfo = async (req, res) => {
    try {
        const fileId = req.params.id;
        const userId = req.user.id;

        const result = await db.query(
            'SELECT * FROM files WHERE id = $1 AND user_id = $2',
            [fileId, userId]
        );

        if (result.rows.length === 0) return res.status(404).json({ message: 'Item not found' });

        res.json(result.rows[0]);
    } catch (error) {
        console.error('File Info Error:', error.message);
        res.status(500).json({ message: 'Failed to get file info' });
    }
};

// @desc    Get public file metadata
// @route   GET /api/files/public/:id
exports.getPublicFile = async (req, res) => {
    try {
        const fileId = req.params.id;
        const result = await db.query('SELECT * FROM files WHERE id = $1 AND is_public = TRUE', [fileId]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Public file not found' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get storage stats for user
// @route   GET /api/files/stats
exports.getStats = async (req, res) => {
    try {
        const userId = req.user.id;
        
        // Total storage used
        const storageResult = await db.query(
            'SELECT COALESCE(SUM(size), 0) as total_size FROM files WHERE user_id = $1 AND is_trash = FALSE AND is_folder = FALSE',
            [userId]
        );
        
        // File count
        const fileCount = await db.query(
            'SELECT COUNT(*) as count FROM files WHERE user_id = $1 AND is_trash = FALSE AND is_folder = FALSE',
            [userId]
        );
        
        // Folder count
        const folderCount = await db.query(
            'SELECT COUNT(*) as count FROM files WHERE user_id = $1 AND is_trash = FALSE AND is_folder = TRUE',
            [userId]
        );
        
        // Shared items count (items shared BY this user)
        let sharedCount = 0;
        try {
            const sharedResult = await db.query(
                'SELECT COUNT(*) as count FROM shares WHERE shared_by = $1',
                [userId]
            );
            sharedCount = parseInt(sharedResult.rows[0].count);
        } catch (e) {
            // shares table might not exist yet
        }
        
        // Starred count
        const starredResult = await db.query(
            'SELECT COUNT(*) as count FROM files WHERE user_id = $1 AND is_starred = TRUE AND is_trash = FALSE',
            [userId]
        );
        
        // Trash count
        const trashResult = await db.query(
            'SELECT COUNT(*) as count FROM files WHERE user_id = $1 AND is_trash = TRUE',
            [userId]
        );
        
        // Has 2FA (check from Clerk user info passed via middleware)
        const has2fa = !!req.user.twoFactorEnabled;
        
        const totalBytes = parseInt(storageResult.rows[0].total_size);
        const maxStorage = 15 * 1024 * 1024 * 1024; // 15 GB free tier
        
        res.json({
            totalBytes,
            maxStorageBytes: maxStorage,
            usedPercentage: Math.round((totalBytes / maxStorage) * 100 * 100) / 100,
            fileCount: parseInt(fileCount.rows[0].count),
            folderCount: parseInt(folderCount.rows[0].count),
            sharedCount,
            starredCount: parseInt(starredResult.rows[0].count),
            trashCount: parseInt(trashResult.rows[0].count),
            has2fa,
            plan: totalBytes > 5 * 1024 * 1024 * 1024 ? 'Pro' : 'Free'
        });
    } catch (error) {
        console.error('Stats Error:', error.message);
        res.status(500).json({ message: 'Failed to get stats', error: error.message });
    }
};
