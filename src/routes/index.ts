import express from "express";
import imgRouter from "./api/images";

const router = express.Router();

router.get("/", (req, res) => res.send("hello server"));

router.use(imgRouter);

export default router;
