const express = require('express');
const router = express.Router();
const { createResult, getResult, getAllResult, deleteResult, updateResult } = require('../../controllers/resultController');

router.post('/result/post', createResult);
router.get('/result/find', getResult);
router.get('/result/find_all', getAllResult);
router.delete('/result/delete', deleteResult);
router.put('/result/put', updateResult);

module.exports = router