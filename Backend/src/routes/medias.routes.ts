import express from 'express';
const router = express.Router();
import { getMedia, upload } from '../controllers/media';
import verifyJwt from '../middlewares/auth';


router.get('/',verifyJwt,getMedia)
router.post('/upload',verifyJwt,upload)

module.exports = router