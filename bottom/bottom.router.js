const express = require('express');
const router = express.Router();
const { listBottomsAction, viewBottomAction, insertBottomAction, removeBottomAction, updateBottomAction } = require('./bottom.controller');
router.get('/', listBottomsAction);
router.get('/:bid', viewBottomAction);
router.post('/', insertBottomAction);
router.put('/', updateBottomAction);
router.delete('/:bid', removeBottomAction);
module.exports = router;