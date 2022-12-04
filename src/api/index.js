const express = require("express");
const registerApi = require("./register");
const loginApi = require("./login");
const customerApi = require("./customer");
const packageApi = require("./package");

const router = express.Router();

router.use(registerApi);
router.use(loginApi);
router.use(customerApi);
router.use(packageApi);

module.exports = router;
