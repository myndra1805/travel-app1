const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const { Comment } = require("./models");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));

app.post("/comments", async (req, res) => {
  try {
    const { name, message } = req.body;
    await Comment.create({
      name,
      message,
    });
    return res.send({
      message: "Berhasil menyimpan data",
      error: 200,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Server error",
      error: 500,
    });
  }
});

app.get("/comments", async (req, res) => {
  try {
    const results = await Comment.findAll({
      order: [["id", "DESC"]],
    });
    return res.send({
      message: "Berhasil menampilkan data",
      status: 200,
      data: results,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Server error",
      error: 500,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
