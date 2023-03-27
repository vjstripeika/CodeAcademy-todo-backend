import { listJSON } from "../data/list.mjs";

export const replaceTodoController = (req, res) => {
  const { _id, title, description, completed } = req.body;

  const isIdValid = typeof _id === "string";
  const isTitleValid = typeof title === "string" && title.length > 5;
  const isDescriptionValid =
    typeof description === "string" && description.length > 5;
  const isCompletedValid = typeof completed === "boolean";

  if (!isIdValid || !isTitleValid || !isDescriptionValid || !isCompletedValid) {
    res.status(400).json({
      message: "Todo data is invalid",
    });
    return;
  }

  let replacedCount = 0;

  for (let i = 0; i < listJSON.documents.length; i++) {
    const todo = listJSON.documents[i];
    if (todo._id !== _id) continue;

    listJSON.documents[i] = req.body;
    replacedCount++;
  }

  res.json({
    matchedCount: replacedCount,
    modifiedCount: replacedCount,
  });

  // const itemIndex = listJSON.documents.find(({ _id }) => _id === replaceId);
  // if (itemIndex === -1) {
  //   res.json({
  //     matchedCount: 0,
  //     modifiedCount: 0,
  //   });
  //   return;
  // }

  // listJSON.documents[i] = req.body;
  // res.json({
  //   matchedCount: 1,
  //   modifiedCount: 1,
  // });
};
