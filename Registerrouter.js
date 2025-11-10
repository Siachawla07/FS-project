const express = require("express")
const { registerUser,loginUser, signupUser } = require("../controller/Usercontroller")

const router= express.Router();

router.post('/register',registerUser);
router.post('/login', loginUser);
router.post('/signup',signupUser);

module.exports = router;
