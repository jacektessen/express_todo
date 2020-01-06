const express = require("express");
const router = express.Router();
const Auth = require("../../usingDB/middleware/Auth");
const Settings = require("../../usingDB/controller/Settings");

router.post("/api/v1/settings", Auth.verifyToken, Settings.create);
router.get("/api/v1/settings", Auth.verifyToken, Settings.getOne);
router.put("/api/v1/settings", Auth.verifyToken, Settings.update);

module.exports = router;
