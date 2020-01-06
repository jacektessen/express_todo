const express = require("express");
const router = express.Router();
const Users = require("../../usingDB/controller/Users");
const Auth = require("../../usingDB/middleware/Auth");

router.post("/api/v1/users", Users.create);
router.post("/api/v1/users/login", Users.login);
router.delete("/api/v1/users/me", Auth.verifyToken, Users.delete);

module.exports = router;
