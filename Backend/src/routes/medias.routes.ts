import express from 'express';
const router = express.Router();
import { getMedia, getUserMedia, upload } from '../controllers/media';
import verifyJwt from '../middlewares/auth';


router.get('/',verifyJwt,getMedia)
router.post('/user',verifyJwt,getUserMedia)
router.post('/upload',verifyJwt,upload)

module.exports = router