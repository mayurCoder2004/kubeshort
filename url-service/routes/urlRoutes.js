const express = require("express");
const shortid = require("shortid");
const Url = require("../models/Url");
const router = express.Router();

router.post("/shorten", async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({
        message: "URL required",
      });
    }

    const shortCode = shortid.generate();

    const newUrl = await Url.create({
      originalUrl: url,
      shortCode,
    });

    res.status(201).json({
      shortCode: newUrl.shortCode,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.get("/:shortCode", async (req, res) => {
  try {
    const { shortCode } = req.params;

    const url = await Url.findOne({
      shortCode,
    });

    if (!url) {
      return res.status(404).json({
        message: "URL not found",
      });
    }

    res.redirect(url.originalUrl);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;