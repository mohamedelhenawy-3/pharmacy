//fails gracefully
module.exports = (err, req, res, next) => {
  const codeStatus = res.statuscode ? res.statuscode : 500;

  res.status(codeStatus).json({
    message: err.message,
  });
};
