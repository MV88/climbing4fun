const express = require("express");
const router = express.Router();
const styleQueries = require('../controllers/styles');

router.get("/", async (req, res) => {
  const styles = await styleQueries.find();
  res.json(styles);
});
module.exports = router;
