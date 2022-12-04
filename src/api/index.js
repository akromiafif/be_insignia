const express = require("express");
const registerApi = require("./register");
const loginApi = require("./login");
const customerApi = require("./user");
const tweetApi = require("./tweet");

const router = express.Router();

router.use(registerApi);
router.use(loginApi);
router.use(customerApi);
router.use(tweetApi);

module.exports = router;
