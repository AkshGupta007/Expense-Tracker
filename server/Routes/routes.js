const express = require('express');

const router = express.Router();

const { getData, editData, addData, deleteData} = require('../Controllers/expenses');

router.get('/expenses',getData);

router.put('/expenses/:id',editData);

router.post('/expenses',addData);

router.delete('/expenses/:id',deleteData);




module.exports = router;