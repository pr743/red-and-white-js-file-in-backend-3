module.exports = (err, req, res, next) => {
  console.error(err.message);
  res.status(500).render("error", { error: err.message });
};