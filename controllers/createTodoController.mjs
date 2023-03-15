import { listJSON } from "../data/list.mjs";
import { v4 as createId } from "uuid";

export const createTodoController = (req, res) => {
  const id = createId();

  const todo = {
    _id: id,
    ...req.body,
  };

  listJSON.documents.push(todo);

  res.json({
    insertedId: id,
  });
};
