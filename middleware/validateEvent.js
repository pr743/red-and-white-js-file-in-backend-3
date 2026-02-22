module.exports = (req, res, next) => {
  const { name, email, eventTitle } = req.body;

  if (!name || !email || !eventTitle) {
    req.flash("error", "All fields are required");
    return res.redirect("back");
  }

  next();
};