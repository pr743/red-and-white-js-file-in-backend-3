require("dotenv").config();
const express = require("express");
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");
const connectDB = require("./config/db");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const expressLayouts = require("express-ejs-layouts");
const Event = require("./models/Event");   


const app = express(); 
connectDB();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set("layout", "layout");

app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(logger);
app.use(expressLayouts);

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

app.use(flash());

app.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const skip = (page - 1) * limit;
    const search = req.query.search || "";

    const query = {
      eventTitle: { $regex: search, $options: "i" }   
    };

    const total = await Event.countDocuments(query);

    const events = await Event.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.render("index", {
      title: "All Events",
      events,                 
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      search,
      success: req.flash("success") || "",
      error: req.flash("error") || ""
    });

  } catch{
    res.status(500).send("Server Error");
  }
});

app.use("/", require("./routes/event.routes"));
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);