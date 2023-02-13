const http = require("http");
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

const filmsOpctionsraw = fs.readFileSync("./films.json", "utf-8");
const filmsOptions = JSON.parse(filmsOpctionsraw);
app.get("/scoops/", (req, res, next) => {
  res.json(filmsOptions);
});
app.post("/scoops/:id", (req, res, next) => {
  const params = req.params.id;
  const newData = filmsOptions.filter((e) =>
    e.episode_id === Number(params) ? e.name.push(req.body) : e.name
  );
  fs.writeFileSync("./films.json", JSON.stringify(newData), "utf-8");
  console.log(filmsOptions);
  res.status(200).json({ msg: "jest ok" });
});

app.use((req, res, next) => {
  res.status(404).send("<h1>No Found</h1>");
});
const server = http.createServer(app);

server.listen(8888, () => {
  console.log("serwer odpalony");
});
