const express = require("express");
const { API } = require('../constants/project');
const styles = require('./styles/styles.routes');
const auth = require('./auth/auth.routes');
const users = require('./users/users.routes');
const ropes = require('./ropes/ropes.routes');

const router = express.Router();
router.get("/", (req, res) => {
  res.json({ message: API });
});
router.use("/styles", styles);
router.use("/users", users);
router.use("/ropes", ropes);
router.use("/auth", auth);

module.exports = router;
