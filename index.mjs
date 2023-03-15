import express from "express";
import { listController } from "./controllers/listController.mjs";
import { createTodoController } from "./controllers/createTodoController.mjs";
import { removeTodoController } from "./controllers/removeTodoController.mjs";

const app = express();
const port = 3000;

const bodyParser = express.json(); // (req, res, next) => {...}

app.use(bodyParser);
app.get("/api/list", listController);
app.post("/api/todo", createTodoController);
app.delete("/api/todo", removeTodoController);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
