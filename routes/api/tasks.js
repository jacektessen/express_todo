const express = require("express");
const router = express.Router();
const Auth = require("../../usingDB/middleware/Auth");
const Tasks = require("../../usingDB/controller/Tasks");

router.post("/api/v1/tasks", Auth.verifyToken, Tasks.create);
router.get("/api/v1/tasks", Auth.verifyToken, Tasks.getAll);
router.get("/api/v1/tasks/:id", Auth.verifyToken, Tasks.getOne);
router.put("/api/v1/tasks/:id", Auth.verifyToken, Tasks.update);
router.delete("/api/v1/tasks/:id", Auth.verifyToken, Tasks.delete);

module.exports = router;
