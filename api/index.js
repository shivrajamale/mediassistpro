module.exports = (req, res) => {
  res.status(200).json({
    status: "success",
    message: "MediAssist Pro API is working!",
    timestamp: new Date().toISOString()
  });
};
