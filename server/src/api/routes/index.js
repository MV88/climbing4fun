const express = require("express");
const { API } = require('../../constants/project');
const styles = require('./styles');

const router = express.Router();
router.get("/", (req, res) => {
  res.json({ message: API });
});
router.use("/styles", styles);

module.exports = router;
