const express = require("express");
const shortid = require("shortid");
const axios = require("axios");

const Url = require("../models/Url");

const router = express.Router();

router.post("/shorten", async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({
        message: "URL is required",
      });
    }

    // Optional: prevent duplicate URLs
    const existingUrl = await Url.findOne({
      originalUrl: url,
    });

    if (existingUrl) {
      return res.status(200).json({
        shortCode: existingUrl.shortCode,
        shortUrl: `http://localhost:5000/${existingUrl.shortCode}`,
      });
    }

    const shortCode = shortid.generate();

    const newUrl = await Url.create({
      originalUrl: url,
      shortCode,
    });

    res.status(201).json({
      shortCode: newUrl.shortCode,
      shortUrl: `http://localhost:5000/${newUrl.shortCode}`,
    });
  } catch (error) {
    console.error(error);

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

    

    // Track analytics but don't fail redirect if analytics service is down
    try {
      await axios.post("http://localhost:5001/track", {
        shortCode,
      });
    } catch (analyticsError) {
      console.log(
        "Analytics service unavailable:",
        analyticsError.message
      );
    }

    return res.redirect(url.originalUrl);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;