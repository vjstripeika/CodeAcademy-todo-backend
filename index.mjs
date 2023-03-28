import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { listController } from "./controllers/listController.mjs";
import { createTodoController } from "./controllers/createTodoController.mjs";
import { removeTodoController } from "./controllers/removeTodoController.mjs";
import { replaceTodoController } from "./controllers/replaceTodoController.mjs";
import { registerController } from "./controllers/registerController.mjs";
import { loginController } from "./controllers/loginController.mjs";
import { decodeToken } from "./utils/tokens.mjs";
import { usersList } from "./data/users.mjs";

dotenv.config();

const app = express();
const port = process.env.PORT;

const bodyParser = express.json(); // (req, res, next) => {...}
const corsMiddleware = cors();

app.use(corsMiddleware);
app.use(bodyParser);
app.use((req, _, next) => {
  if (req.headers.token) {
    const authId = decodeToken(req.headers.token)?.id;
    const user = usersList.find(({ _id }) => _id === authId);
    if (user) req.user = user;
  }
  next();
});

app.get("/api/list", listController);

app.post("/api/todo", createTodoController);

app.put("/api/todo", replaceTodoController);

app.delete("/api/todo", removeTodoController);

app.post("/api/register", registerController);

app.post("/api/login", loginController);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
