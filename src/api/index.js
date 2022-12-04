const express = require("express");
const registerApi = require("./register");
const loginApi = require("./login");
const customerApi = require("./customer");
const packageApi = require("./package");
const orderApi = require("./order");
const orderDetailApi = require("./order-detail");

const router = express.Router();

router.use(registerApi);
router.use(loginApi);
router.use(customerApi);
router.use(packageApi);
router.use(orderApi);
router.use(orderDetailApi);

module.exports = router;
