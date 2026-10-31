const express = require("express");
const { execFile } = require("child_process");
const { isIP } = require("net");

const router = express.Router();

router.get("/ping", (req, res) => {
  const { host } = req.query;

  if (typeof host !== "string" || isIP(host) === 0) {
    return res.status(400).json({ error: "Informe um IP válido" });
  }

  execFile(
    "ping",
    ["-c", "2", host],
    { timeout: 5000, maxBuffer: 64 * 1024 },
    (error, stdout) => {
      if (error) {
        return res.status(502).json({ error: "Falha ao executar ping" });
      }

      res.json({ host, output: stdout });
    }
  );
});

module.exports = router;