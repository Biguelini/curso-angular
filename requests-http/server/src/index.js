const express = require("express");
const bodyParser = require("body-parser");
const multipart = require("connect-multiparty");

const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:4200",
  credentials: true,
  optionSuccessStatus: 200,
};

const app = express();
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const multipartMiddleware = multipart({ uploadDir: "./uploads" });
app.post("/upload", multipartMiddleware, (req, res) => {
  const files = req.files;
  console.log(files);
  res.json({ message: files });
});

app.get("/downloadExcel", (req, res) => {
  res.download("./uploads/report.xlsx");
});

app.get("/downloadPDF", (req, res) => {
  res.download("./uploads/report.pdf");
});

app.use((err, req, res, next) => res.json({ error: err.message }));

app.listen(8000, () => {
  console.log("Servidor porta 8000");
});
