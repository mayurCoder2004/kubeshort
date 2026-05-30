const express = require("express");
const Analytics = require("../models/Analytics");
const router = express.Router();

router.post("/track", async (req, res) => {
  try {
    const { shortCode } = req.body;

    let analytics = await Analytics.findOne({
      shortCode,
    });

    if (analytics) {
      analytics.clicks += 1;

      await analytics.save();
    } else {
      analytics = await Analytics.create({
        shortCode,
        clicks: 1,
      });
    }

    res.status(200).json({
      message: "Tracked",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.get("/analytics/:shortCode", async (req, res) => {
  try {
    const { shortCode } = req.params;

    const analytics = await Analytics.findOne({
      shortCode,
    });

    if (!analytics) {
      return res.status(404).json({
        message: "Analytics not found",
      });
    }

    res.status(200).json({
      shortCode,
      clicks: analytics.clicks,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;