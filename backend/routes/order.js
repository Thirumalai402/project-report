const express = require('express');
const { getorder } = require('../../controller/ordercontrol');
const router = express.Router();

router.route('/order').post(getorder);
module.exports = router;