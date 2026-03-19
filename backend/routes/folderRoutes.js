const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { createFolder, getFolderContents, renameFolder, deleteFolder } = require('../controllers/folderController');


// All folder routes are protected
router.use(auth);

// POST /api/folders - Create folder
router.post('/', createFolder);

// GET /api/folders/:id - Get contents (use 'root' for home)
router.get('/:id', getFolderContents);

// PUT /api/folders/:id - Rename folder
router.put('/:id', renameFolder);

// DELETE /api/folders/:id - Delete folder
router.delete('/:id', deleteFolder);


module.exports = router;
