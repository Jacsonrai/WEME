const express = require("express");
const controller = require("../../controllers/auth.controller");
const router = express.Router();

// GET v1/status
router.get("/status", (req, res) => res.send("OK"));
router.post("/register", controller.register);
router.post("/login", controller.login);

module.exports = router;
