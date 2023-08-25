const { getAllTest, addNewTest, deleteTest } = require("../../Model/test.model");

function httpGetTest(req, res) {
  res.status(200).json(getAllTest());
}

function httpPostTest(req, res) {
  const test = req.body;
  console.log(test);

  if (!test.title) {
    return res.status(400).json({ message: "Invalid value " });
  }

  addNewTest(test);
  return res.status(201).json(test);
}

function httpDeleteTest(req,res){
    const id = +req.params.id;
    
    deleteTest(id);
    return res.status(200).json({message:`Item with ${id} id Deleted`})
}

module.exports = {
  httpGetTest,
  httpPostTest,
  httpDeleteTest,
};
