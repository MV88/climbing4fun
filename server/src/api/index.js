const express = require("express");
const { API } = require('../../constants/project');
const styles = require('./styles');
const auth = require('./auth');
const users = require('./users');
const ropes = require('./ropes');

const router = express.Router();
router.get("/", (req, res) => {
  res.json({ message: API });
});
router.use("/styles", styles);
router.use("/users", users);
router.use("/ropes", ropes);
router.use("/auth", auth);

module.exports = router;
