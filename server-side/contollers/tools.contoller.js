let data = [
  { id: 1, name: "hasem" },
  { id: 2, name: "rohoman" },
  { id: 3, name: "kovir" },
  { id: 4, name: "kovir" },
];

module.exports.getAllTools = (req, res, next) => {
  const { limit, page } = req.query;
  console.log(limit, page);
  res.json(data.slice(0, limit));
};

module.exports.toolsDetails = (req, res, next) => {
  const { id } = req.params;
  //  const filter = {_id: id}
  const foundData = data.filter(tool => tool.id === Number(id));
  res.status(200).send({
    success: true,
    message: 'success',
    data: foundData
  });
  // 
  // res.status(5000).send({
  //   success: false,
  //   message: 'Intenaly server error'
  // })
};

module.exports.saveATools = (req, res) => {
  // console.log(req.query);
  data.push(req.body);
  res.send(res.send(data));
};

module.exports.updateTools = (req, res) => {
  // const body = req.params
  const { id } = req.params;
  const filter = { _id: id };
  const newData = data.find(tool => tool.id == Number(id));
  newData.id = id;
  newData.name = req.body.name;
  res.send(newData);
};

module.exports.deleteTools = (req, res) => {
  const { id } = req.params;
  const filter = { _id: id };
  data = data.filter(tool => tool.id !== Number(id));
  res.send(data);
};
