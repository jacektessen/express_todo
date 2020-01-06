const express = require("express");
const dotenv = require("dotenv");
const usersRouter = require("./routes/api/users");
const tasksRouter = require("./routes/api/tasks");
const settingsRouter = require("./routes/api/settings");

dotenv.config();
const app = express();
app.use(express.json());

app.use(usersRouter);
app.use(tasksRouter);
app.use(settingsRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
