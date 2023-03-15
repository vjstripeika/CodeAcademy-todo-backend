import { listJSON } from "../data/list.mjs";

export const listController = (req, res) => {
  res.json(listJSON);
};
