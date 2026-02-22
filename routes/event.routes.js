const express = require("express");
const router = express.Router();
const controller = require("../controllers/event.controller");
const validate = require("../middleware/validateEvent");

router.get("/", controller.getAll);
router.get("/add", controller.getAdd);
router.post("/add", validate, controller.create);

router.get("/edit/:id", controller.getEdit);
router.post("/edit/:id", validate, controller.update);

router.get("/delete/:id", controller.delete);

module.exports = router;