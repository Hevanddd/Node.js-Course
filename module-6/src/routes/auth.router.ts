import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("To be done in module 9");
});

export default router;
