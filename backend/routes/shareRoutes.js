const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { shareItem, getSharedWithMe, togglePublic } = require('../controllers/shareController');

// All share routes are protected
router.use(auth);

// POST /api/shares - Share item with another user
router.post('/', shareItem);

// GET /api/shares/me - Get items shared with me
router.get('/me', getSharedWithMe);

// PUT /api/shares/public/:id - Toggle public status
router.put('/public/:id', togglePublic);

module.exports = router;
