const express = require("express");
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middlewares/check-auth');
const {
  ropesGet,
  ropesGetById,
  ropesPatchById,
  ropesDeleteById,
  ropesPost,
} = require('../controllers/ropes');

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

router.get("/", ropesGet);
router.get("/:ropeId", ropesGetById);
router.patch("/:ropeId", checkAuth, ropesPatchById);
router.delete("/:ropeId", checkAuth, ropesDeleteById);
router.post("/", checkAuth, upload.single("ropeImage"), ropesPost);

module.exports = router;
