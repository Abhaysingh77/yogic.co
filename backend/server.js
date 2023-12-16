const express = require("express");
const cors = require("cors");
const db='';
import("lowdb").then((lowDb)=>{
  db = lowDb(new FileSync("db.json"));
}).catch((err)=>{
  console.log(err)
})

const FileSync = require("lowdb/adapters/FileSync");
const bodyParser = require("body-parser");
const { nanoid} = require("nanoid");
var dayjs = require("dayjs");
const utc=require('dayjs/plugin/utc')
const timezone=require('dayjs/plugin/timezone')
const app = express();

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Kolkata")

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 8000;

app.get("/categories", (req, res) => {
  const data = db.get("categories").value();
  console.log(data)
  return res.json(data);
});

app.get("/categories/detail", (req, res) => {
  const data = db.get("categories-detail").value();
  let response = data.find(ele => {
    return ele.id == req.query.id;
  });
  if (response) return res.json(response);
  else
    return res.status(400).send({
      message: `Not found for ${req.query.id}!`,
    });
});

app.get("/categories/poses", (req, res) => {
  const data = db.get("pose-detail").value();
  let response = data.filter((item) => {
    return item.category_name === req.query.name
  });

  if (response) return res.json(response);
  else
    return res.status(400).send({
      message: `Pose not found for ${req.query.id}!`,
    });
});

app.get("/categories/pose/detail", (req, res) => {
  const data = db.get("pose-detail").value();
  let response = data.find(ele => {
    return ele.english_name === req.query.name;
  })
  if (response) return res.json(response);
  else
    return res.status(400).send({
      message: `Pose not found for ${req.query.id}`
    })
});


app.post("/reservations/new", (req, res) => {
  const reservation = req.body;
  if (!(reservation.name && reservation.email && reservation.phone && reservation.designation)) {
    return res.status(400).send({
      message: `Invalid data received`,
    });
  } else {
    reservation.name = reservation.name
      .trim()
      .toLowerCase()
      .split(" ")
      .map((i) => i.charAt(0).toUpperCase() + i.slice(1))
      .join(" ");

    const { name, email, phone,designation } = reservation;
    db.get("reservations")
      .push({
        name,
        email,
        phone,
        designation,
        id: nanoid(),
        time:new Date().toLocaleDateString()
      }).write();

    return res.json({ success: true });
  }
});

app.get("/reservations", (req, res) => {
  const data = db.get("reservations").value();
  if (data) return res.json(data);
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`Backend is running on port ${process.env.PORT || PORT}`);
});