const addFileValidate = (req, res, next) => {
  const { name, author, genre } = req.body;
  if (!name || !author || !genre) {
    return res
      .status(400)
      .json({ success: false, msg: "input required field" });
  }
  next();
};

module.exports = addFileValidate
