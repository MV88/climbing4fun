const express = require("express");
const { checkAuth } = require('../auth/auth.utils');
const Grade = require('../grades/grade.model');
const ClimbingRoute = require('./climbingRoute.model');

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const routes = await ClimbingRoute.query()
      .withGraphFetched('hasGrade(french)')
      .select("name", "sector", "city", "link")
      .modifiers({
        french (builder) {
          builder.select('french');
        },
      });
    res.status(200).json({ result: routes, message: "All routes retrieved" });
  } catch (e) {
    next(e);
  }
});
router.get("/sectors/", async (req, res, next) => {
  try {
    const sectors = await ClimbingRoute.query()
      .select("sector")
      .distinctOn("sector");
    res.status(200).json({ result: sectors.map(({ sector }) => sector), message: "All sectors retrieved" });
  } catch (e) {
    next(e);
  }
});
router.get("/:routeId", async (req, res, next) => {
  try {
    const { routeId } = req.params;
    const route = await ClimbingRoute.query()
      .where({ id: routeId })
      .withGraphFetched('hasGrade(french)')
      .modifiers({
        french (builder) {
          builder.select('french');
        },
      });
    res.status(200).json({ result: route });
  } catch (e) {
    next(e);
  }
});
router.post("/", checkAuth, async (req, res, next) => {
  try {
    const { french, ...route } = req.body;
    const grade = await Grade.query().select("id").where({ french }).first();
    const routeCreated = await ClimbingRoute.query().insert({
      ...route,
      gradeId: grade.id,
    });
    res.status(200).json({ result: routeCreated, message: "Route inserted correctly" });
  } catch (e) {
    next(e);
  }
});
/*
router.patch("/:ropeId", checkAuth, ropesPatchById);
router.delete("/:ropeId", checkAuth, ropesDeleteById);
*/
module.exports = router;
