require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const analyticsRoutes = require("./routes/analyticsRoutes");
const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/", analyticsRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});