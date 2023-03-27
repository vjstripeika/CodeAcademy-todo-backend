import { listJSON } from "../data/list.mjs";

export const removeTodoController = (req, res) => {
  // let deletedCount = 0;
  // const { documents } = listJSON;

  // const requestedDeleteId = req.body._id;

  // const newDocuments = [];
  // for (let i = 0; i < documents.length; i++) {
  //   const todo = documents[i];
  //   if (todo._id !== requestedDeleteId) {
  //     newDocuments.push(todo);
  //   } else {
  //     deletedCount++;
  //   }
  // }

  // listJSON.documents = newDocuments;

  const { documents } = listJSON;
  const requestedDeleteId = req.body._id;

  const isRequestedDeleteIdValid = typeof requestedDeleteId === "string";
  if (!isRequestedDeleteIdValid) {
    res.status(400).json({
      message: "Invalid delete ID"
    })
    return
  }

  const newDocuments = documents.filter(({ _id }) => _id !== requestedDeleteId);
  const deletedCount = documents.length - newDocuments.length;
  listJSON.documents = newDocuments;
  
  res.json({
    deletedCount,
  });
};
