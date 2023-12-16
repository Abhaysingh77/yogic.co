const express = require("express");
const cors = require("cors");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const bodyParser = require("body-parser");
const { nanoid } = require("nanoid");
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");

const app = express();
const PORT = process.env.PORT || 8000;

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Kolkata");

const adapter = new FileSync("db.json");
const db = low(adapter);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/categories", (req, res) => {
  const data = db.get("categories").value();
  console.log(data);
  return res.json(data);
});

app.get("/categories/detail", (req, res) => {
  const data = db.get("categories-detail").value();
  const response = data.find((ele) => ele.id == req.query.id);
  if (response) return res.json(response);
  else
    return res.status(400).json({
      message: `Not found for ${req.query.id}!`,
    });
});

app.get("/categories/poses", (req, res) => {
  const data = db.get("pose-detail").value();
  const response = data.filter((item) => item.category_name === req.query.name);

  if (response.length > 0) return res.json(response);
  else
    return res.status(400).json({
      message: `Pose not found for ${req.query.name}!`,
    });
});

app.get("/categories/pose/detail", (req, res) => {
  const data = db.get("pose-detail").value();
  const response = data.find((ele) => ele.english_name === req.query.name);
  if (response) return res.json(response);
  else
    return res.status(400).json({
      message: `Pose not found for ${req.query.name}`,
    });
});

app.post("/reservations/new", (req, res) => {
  const reservation = req.body;
  if (!(reservation.name && reservation.email && reservation.phone && reservation.designation)) {
    return res.status(400).json({
      message: "Invalid data received",
    });
  } else {
    reservation.name = reservation.name
      .trim()
      .toLowerCase()
      .split(" ")
      .map((i) => i.charAt(0).toUpperCase() + i.slice(1))
      .join(" ");

    const { name, email, phone, designation } = reservation;
    db.get("reservations")
      .push({
        name,
        email,
        phone,
        designation,
        id: nanoid(),
        time: new Date().toLocaleDateString(),
      })
      .write();

    return res.json({ success: true });
  }
});

app.get("/reservations", (req, res) => {
  const data = db.get("reservations").value();
  return res.json(data || []); // Send an empty array if there are no reservations
});

app.listen(PORT, () => {
  console.log(`Backend is running on port ${PORT}`);
});
