const express = require('express');

const router = express.Router();

const { getData, editData, addData, deleteData} = require('../Controllers/expenses');

router.get('/',getData);

router.put('/:id',editData);

router.post('/',addData);

router.delete('/:id',deleteData);




module.exports = router;