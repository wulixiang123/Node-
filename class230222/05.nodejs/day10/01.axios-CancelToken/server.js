const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.get("/testCancel", (req, res) => {
  setTimeout(() => {
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
  }, 1000);
});

app.listen(3000);
