const express = require("express");
// const { checkAuth } = require('../auth/auth.utils');
const Rope = require('./ropes.model');

const router = express.Router();

/*
const multer = require('multer');
const checkAuth = require('../middlewares/check-auth');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + file.originalName);
  },
});
const fileFilter = (req, file, cb) => {
  if (file.mimeType === "image/jpeg" || file.mimeType === "image/png") {
    // accept a file
    cb(null, true);
  } else {
    // reject a file
    cb(null, false);
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter,
});
*/
router.get("/", async (req, res, next) => {
  try {
    const ropes = await Rope.query();
    res.status(200).json({ ropes });
  } catch (e) {
    next(e);
  }
});
router.get("/:ropeId", async (req, res, next) => {
  try {
    const { id } = req.params;
    const ropes = await Rope.query().select({ id });
    res.status(200).json({ ropes });
  } catch (e) {
    next(e);
  }
});
// TODO manage uploads
// TODO test check Auth
router.post("/", /* checkAuth, /* upload.single("ropeImage"), */ async (req, res, next) => {
  try {
    const rope = await Rope.query().insert(req.body);
    res.status(200).json({ rope, message: "Rope inserted correctly" });
  } catch (e) {
    next(e);
  }
});
/*
router.patch("/:ropeId", checkAuth, ropesPatchById);
router.delete("/:ropeId", checkAuth, ropesDeleteById);
*/
module.exports = router;
