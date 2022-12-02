const express = require("express");
const registerApi = require("./register");
const loginApi = require("./login");
const paymentApi = require("./payment");
const userApi = require("./user");
const tweetApi = require("./tweet");

const router = express.Router();

router.use(registerApi);
router.use(loginApi);
router.use(paymentApi);
router.use(userApi);
router.use(tweetApi);

module.exports = router;
