const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const allowedFiles = new Map([
  [
    "bem-vindo.txt",
    path.join(__dirname, "..", "..", "uploads", "bem-vindo.txt"),
  ],
]);

router.get("/:filename", (req, res) => {
  const filePath = allowedFiles.get(req.params.filename);

  if (!filePath) {
    return res.status(404).json({ error: "Arquivo não encontrado" });
  }

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(404).json({ error: "Arquivo não encontrado" });
    }

    res.type("text/plain").send(data);
  });
});

module.exports = router;