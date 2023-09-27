import express from "express";
const router = express.Router();
import { claim, getMedia, getUserMedia, upload } from "../controllers/media";
import verifyJwt from "../middlewares/auth";

router.get("/", verifyJwt, getMedia);
router.get("/all", verifyJwt, getUserMedia);
router.post("/upload", upload);
router.post("/claim", verifyJwt, claim);

module.exports = router;
