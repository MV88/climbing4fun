
const express = require("express");

const { checkAuth } = require('../auth/auth.utils');
const upload = require('../../utils/upload');
const Gallery = require('./galleries.model');

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const galleries = await Gallery.query()
      .withGraphFetched('hasMedia(getMedia)')
      .select("*")
      .modifiers({
        getMedia (builder) {
          builder.select('url');
        },
      }).withGraphFetched('hasThumbnail(thumbnail)')
      .select("*")
      .modifiers({
        thumbnail (builder) {
          builder.select('url');
        },
      });
    res.status(200).json({ length: galleries.length, result: galleries, message: "galleries fetched correctly" });
  } catch (e) {
    next(e);
  }
});
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const gallery = await Gallery.query().where({ id });
    res.status(200).json({ result: gallery, message: "gallery fetched correctly" });
  } catch (e) {
    next(e);
  }
});
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
    const ropeCreated = await Gallery.query().insertGraph({
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
router.delete("/:id", checkAuth, async (req, res, next) => {
  try {
    const { id } = req.params;
    // TODO use soft delete
    const numDeleted = await Gallery.query().deleteById(id);
    res.status(200).json({ result: numDeleted, message: "rope deleted correctly" });
  } catch (e) {
    next(e);
  }
});
router.patch("/:id", checkAuth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const rope = req.body;
    await Gallery.query().findById(id).patch(rope);
    const ropePatched = await Gallery.query()
      .where({ id })
      .first();
    res.status(200).json({ result: ropePatched, message: "rope patched correctly" });
  } catch (e) {
    next(e);
  }
});
module.exports = router;
