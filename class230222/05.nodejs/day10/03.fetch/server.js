const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/testFetch", (req, res) => {
  res.json({
    code: 200,
    message: "",
    success: true,
    data: [
      {
        id: 1,
        name: "jack",
      },
    ],
  });
});

app.post("/testFetch", (req, res) => {
  console.log(req.body);
  res.json({
    code: 200,
    message: "",
    success: true,
    data: [
      {
        id: 1,
        name: "jack",
      },
    ],
  });
});

app.listen(3000);
