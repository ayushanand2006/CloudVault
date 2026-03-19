const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const { uploadFile, getFiles, deleteFile, getPublicFile, toggleStar, toggleTrash, renameFile, getFileInfo, getStats } = require('../controllers/fileController');

// Public route - NO TOKEN REQUIRED
router.get('/public/:id', getPublicFile);

// All routes below require token
router.use(auth);

// GET /api/files/stats - Must come BEFORE /:id routes
router.get('/stats', getStats);

// POST /api/files/upload
router.post('/upload', upload.single('file'), uploadFile);

// GET /api/files
router.get('/', getFiles);

// PUT /api/files/:id/star - Toggle star
router.put('/:id/star', toggleStar);

// PUT /api/files/:id/trash - Move to/from trash
router.put('/:id/trash', toggleTrash);

// PUT /api/files/:id/rename - Rename file
router.put('/:id/rename', renameFile);

// GET /api/files/:id/info - Get file info
router.get('/:id/info', getFileInfo);

// DELETE /api/files/:id
router.delete('/:id', deleteFile);

module.exports = router;
