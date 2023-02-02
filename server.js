const express = require("express");
const app = express();

const axios = require("axios");

app.use(express.json());
const users = [
  { id: 1, name: "bloody" },
  { id: 2, name: "kheeng" },
];
app.get("/users", (req, res) => {
  res.json(users);
});

app.listen(3000, () => console.log("server started on port 3000"));
