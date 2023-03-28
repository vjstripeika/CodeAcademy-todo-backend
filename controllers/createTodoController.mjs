import { listJSON } from "../data/list.mjs";
import { v4 as createId } from "uuid";

export const createTodoController = (req, res) => {
  if (!req.user) {
    res.status(403).json({ message: "User not logged in." });
    return;
  }

  const id = createId();
  const { title, description, completed } = req.body;

  // Patikrinam Body duomenis
  const isTitleValid = typeof title === "string" && title.length > 5;
  const isDescriptionValid =
    typeof description === "string" && description.length > 5;
  const isCompletedValid = typeof completed === "boolean";

  if (!isTitleValid || !isDescriptionValid || !isCompletedValid) {
    res.status(400).json({
      message: "Invalid data",
    });
    return;
  }
  // užduotis: patikrinti duomenis remove ir replace endpointuose.

  // Create Todo
  const todo = {
    _id: id,
    title,
    description,
    completed,
  };

  if (!listJSON[req.user._id]) {
    listJSON[req.user._id] = [];
  }
  listJSON[req.user._id].push(todo);

  res.json({
    insertedId: id,
  });
};
