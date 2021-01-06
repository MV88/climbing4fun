const express = require("express");
const router = express.Router();

const {
  userSignup,
  userLogin,
  userDeleteById,
} = require('../controllers/user');

router.post("/signup", userSignup);
router.post("/login", userLogin);
router.delete("/:userId", userDeleteById);

module.exports = router;
