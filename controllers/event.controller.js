const Event = require("../models/Event");


exports.getAll = async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });

    res.render("index", {
      events,
      success: req.flash("success"),
      error: req.flash("error")
    });

  } catch{
    res.status(500).send("Server Error");
  }
};


exports.getAdd = (req, res) => {
  res.render("add", { error: req.flash("error") });
};


exports.create = async (req, res) => {
  try {
    await Event.create(req.body);
    req.flash("success", "Event Registered Successfully");
    res.redirect("/");   
  } catch{
    res.status(500).send("Server Error");
  }
};


exports.getEdit = async (req, res) => {
  const event = await Event.findById(req.params.id);
  res.render("edit", { event });
};


exports.update = async (req, res) => {
  await Event.findByIdAndUpdate(req.params.id, req.body);
  req.flash("success", "Event Updated");
  res.redirect("/");   
};


exports.delete = async (req, res) => {
  await Event.findByIdAndDelete(req.params.id);  
  req.flash("success", "Event Deleted");
  res.redirect("/");
};