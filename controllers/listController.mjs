import { listJSON } from "../data/list.mjs";

export const listController = (req, res) => {
  if (!req.user) {
    res.status(403).json({ message: "User not logged in." });
    return;
  }

  if (!listJSON[req.user._id]) {
    listJSON[req.user._id] = [];
  }

  res.json({ documents: listJSON[req.user._id] });
};
