const express = require("express");
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middlewares/check-auth');
const {
  medicinesGet,
  medicinesGetById,
  medicinesPatchById,
  medicinesDeleteById,
  medicinesPost,
} = require('../controllers/medicines');

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

router.get("/", medicinesGet);
router.get("/:medicineId", medicinesGetById);
router.patch("/:medicineId", checkAuth, medicinesPatchById);
router.delete("/:medicineId", checkAuth, medicinesDeleteById);
router.post("/", checkAuth, upload.single("medicineImage"), medicinesPost);

module.exports = router;
