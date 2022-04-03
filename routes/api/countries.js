const bodyParser = require("body-parser");
const express = require("express");
const router = express.Router();
const countries = require("../../Countries");
const uuid = require("uuid");

// Get all Countries
router.get("/", (req, res) => {
  //   res.send("<h1>Hey</h1>");
  res.json(countries);
});

//Get one Country
router.get("/:id", (req, res) => {
  const found = countries.some(
    (country) => country.id === parseInt(req.params.id)
  );
  if (found) {
    res.json(
      countries.filter((country) => country.id === parseInt(req.params.id))
    );
  } else {
    res
      .status(400)
      .json({ message: `that country doesn't exist ${req.params.id}` });
  }
});

// Create Country
router.post("/", (req, res) => {
  const newCountries = {
    ...req.body,
    id: uuid.v4(),
  };

  if (
    !newCountries.country ||
    !newCountries.language ||
    !newCountries.population
  ) {
    return res.status(400).json({
      message: "Please include the country and language and population ",
    });
  }

  countries.push(newCountries);
  res.json(countries);
});

// Update Member
router.put("/:id", (req, res) => {
  const found = countries.some(
    (country) => country.id === parseInt(req.params.id)
  );
  if (found) {
    const updateCountry = req.body;
    countries.forEach((country) => {
      if (country.id === parseInt(req.params.id)) {
        !updateCountry.country ||
          !updateCountry.language ||
          !updateCountry.population;
        res.json({ message: "Country updated", updateCountry });
      }
    });
  } else {
    res
      .status(400)
      .json({ message: `that country doesn't exist ${req.params.id}` });
  }
});

router.delete("/:id", (req, res) => {
  const found = countries.some(
    (country) => country.id === parseInt(req.params.id)
  );
  if (found) {
    res.json({
      message: "country Deleted",
      countries: countries.filter(
        (country) => country.id !== parseInt(req.params.id)
      ),
    });
  } else {
    res
      .status(400)
      .json({ message: `that country doesn't exist ${req.params.id}` });
  }
});
module.exports = router;
