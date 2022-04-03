const express = require("express");
const countries = require("./countries");
const exphbs = require("express-handlebars");

const app = express();

// Handlebars Middleware
app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Homepage Route
app.get("/", (req, res) => res.send(req.body));
//Countries API Router
app.use("/api/countries", require("./routes/api/countries"));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
