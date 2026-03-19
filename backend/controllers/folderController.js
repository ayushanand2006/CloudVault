const db = require('../config/db');

// @desc    Create a new folder
exports.createFolder = async (req, res) => {
    try {
        const { name, parent_id } = req.body;
        const userId = req.user.id;
        const actualParentId = (parent_id && String(parent_id).trim() !== "") ? parent_id : null;

        if (!name) return res.status(400).json({ message: 'Folder name is required' });

        // If creating inside a folder, check ownership
        if (actualParentId) {
            const parent = await db.query(
                'SELECT * FROM files WHERE id = $1 AND user_id = $2 AND is_folder = TRUE',
                [actualParentId, userId]
            );
            if (parent.rows.length === 0) {
                return res.status(403).json({ message: 'Access denied' });
            }
        }

        const result = await db.query(
            'INSERT INTO files (name, size, type, url, user_id, parent_id, is_folder) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [name, 0, 'folder', '', userId, actualParentId, true]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Create Folder Error:', error.message);
        res.status(500).json({ message: 'Failed to create folder', error: error.message });
    }
};

// @desc    Get contents of a folder
exports.getFolderContents = async (req, res) => {
    try {
        const userId = req.user.id;
        const parentId = req.params.id === 'root' ? null : req.params.id;

        let result;
        if (parentId) {
            // Get items inside a specific folder (owned by user)
            result = await db.query(
                'SELECT * FROM files WHERE parent_id = $1 AND user_id = $2 AND is_trash = FALSE ORDER BY is_folder DESC, name ASC',
                [parentId, userId]
            );
        } else {
            // Root: get top-level items
            result = await db.query(
                'SELECT * FROM files WHERE user_id = $1 AND parent_id IS NULL AND is_trash = FALSE ORDER BY is_folder DESC, name ASC',
                [userId]
            );
        }

        res.json(result.rows);
    } catch (error) {
        console.error('Get Folder Contents Error:', error.message);
        res.status(500).json({ message: 'Failed to fetch contents', error: error.message });
    }
};

// @desc    Rename folder
exports.renameFolder = async (req, res) => {
    try {
        const { name } = req.body;
        const folderId = req.params.id;
        const userId = req.user.id;

        if (!name || !name.trim()) return res.status(400).json({ message: 'Name is required' });

        const result = await db.query(
            'UPDATE files SET name = $1 WHERE id = $2 AND user_id = $3 AND is_folder = TRUE RETURNING *',
            [name.trim(), folderId, userId]
        );

        if (result.rows.length === 0) return res.status(404).json({ message: 'Folder not found' });

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Rename Error:', error.message);
        res.status(500).json({ message: 'Rename failed', error: error.message });
    }
};

// @desc    Delete folder and its contents
exports.deleteFolder = async (req, res) => {
    try {
        const folderId = req.params.id;
        const userId = req.user.id;

        const folder = await db.query('SELECT * FROM files WHERE id = $1 AND user_id = $2 AND is_folder = TRUE', [folderId, userId]);
        if (folder.rows.length === 0) return res.status(403).json({ message: 'Unauthorized' });

        // Delete children first, then the folder
        await db.query('DELETE FROM files WHERE parent_id = $1', [folderId]);
        await db.query('DELETE FROM files WHERE id = $1', [folderId]);

        res.json({ message: 'Folder deleted' });
    } catch (error) {
        console.error('Delete Folder Error:', error.message);
        res.status(500).json({ message: 'Failed to delete folder', error: error.message });
    }
};
