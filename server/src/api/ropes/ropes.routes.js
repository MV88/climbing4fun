
const express = require("express");

const { checkAuth } = require('../auth/auth.utils');
// const Media = require('../media/media.model');
const upload = require('../../utils/upload');
const Rope = require('./ropes.model');

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const ropes = await Rope.query().select("*").joinRelated('hasThumbnail');
    res.status(200).json({ result: ropes, length: ropes.length });
  } catch (e) {
    next(e);
  }
});
router.get("/:ropeId", async (req, res, next) => {
  try {
    const { id } = req.params;
    const ropes = await Rope.query().select({ id });
    res.status(200).json({ result: ropes });
  } catch (e) {
    next(e);
  }
});
// TODO manage uploads
// TODO test check Auth
router.post("/", checkAuth, upload.single("thumbnail"), async (req, res, next) => {
  try {
    const rope = req.body;
    const url = `/${req.file.filename}`;

    const media = {
      name: `${rope.brand} ${rope.color}`,
      url,
      mimeType: req.file.mimetype,
      description: req.file.filename,
    };
    // const mediaCreated = await Media.query().insert(media);

    if (rope.purchaseDate === "") {
      delete rope.purchaseDate;
    }

    if (rope.owner === "yes") {
      rope.ownerId = req.userData.id;
      rope.owner = "";
    } else {
      rope.owner = rope.ownerName;
    }
    delete rope.ownerName;
    const ropeCreated = await Rope.query().insertGraph({
      ...rope,
      hasThumbnail: [{
        ...media,
      }],
    });
    ropeCreated.url = url;
    res.status(200).json({ result: { rope: ropeCreated }, message: "Rope inserted correctly" });
  } catch (e) {
    next(e);
  }
});
/*
router.patch("/:ropeId", checkAuth, ropesPatchById);
router.delete("/:ropeId", checkAuth, ropesDeleteById);
*/
module.exports = router;
