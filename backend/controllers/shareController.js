const db = require('../config/db');
const { createClerkClient } = require('@clerk/backend');

const clerkClient = createClerkClient({ 
    secretKey: process.env.CLERK_SECRET_KEY 
});

// @desc    Share a file or folder with another user
// @route   POST /api/shares
exports.shareItem = async (req, res) => {
    try {
        const { file_id, email, permission } = req.body;
        const sharedBy = req.user.id;

        if (!file_id || !email) {
            return res.status(400).json({ message: 'file_id and email are required' });
        }

        // 1. Look up the target user by email using Clerk API
        const userList = await clerkClient.users.getUserList({ 
            emailAddress: [email] 
        });

        if (!userList.data || userList.data.length === 0) {
            return res.status(404).json({ message: 'No user found with this email. They must sign up first.' });
        }

        const sharedWith = userList.data[0].id;

        if (sharedWith === sharedBy) {
            return res.status(400).json({ message: 'You cannot share with yourself' });
        }

        // 2. Check if the item exists and belongs to the sharer
        const fileResult = await db.query('SELECT * FROM files WHERE id = $1 AND user_id = $2', [file_id, sharedBy]);
        if (fileResult.rows.length === 0) {
            return res.status(404).json({ message: 'Item not found or you do not have permission to share it' });
        }

        // 3. Create share record (upsert - update permission if already shared)
        const shareResult = await db.query(
            'INSERT INTO shares (file_id, shared_by, shared_with, permission) VALUES ($1, $2, $3, $4) ON CONFLICT (file_id, shared_with) DO UPDATE SET permission = EXCLUDED.permission RETURNING *',
            [file_id, sharedBy, sharedWith, permission || 'viewer']
        );

        res.status(201).json({ 
            ...shareResult.rows[0],
            message: `Shared successfully with ${email} as ${permission || 'viewer'}`
        });
    } catch (error) {
        console.error('Share Item Error:', error.message);
        res.status(500).json({ message: 'Failed to share item', error: error.message });
    }
};

// @desc    Get items shared with the current user
// @route   GET /api/shares/me
exports.getSharedWithMe = async (req, res) => {
    try {
        const userId = req.user.id;

        const result = await db.query(
            `SELECT f.*, s.permission, s.shared_by 
             FROM files f 
             JOIN shares s ON f.id = s.file_id 
             WHERE s.shared_with = $1`,
            [userId]
        );

        res.json(result.rows);
    } catch (error) {
        console.error('Get Shared Error:', error.message);
        res.status(500).json({ message: 'Failed to fetch shared items' });
    }
};

// @desc    Toggle public access for a file
// @route   PUT /api/shares/public/:id
exports.togglePublic = async (req, res) => {
    try {
        const fileId = req.params.id;
        const userId = req.user.id;
        const { is_public } = req.body;

        const result = await db.query(
            'UPDATE files SET is_public = $1 WHERE id = $2 AND user_id = $3 RETURNING *',
            [is_public, fileId, userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Item not found' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update public status' });
    }
};
