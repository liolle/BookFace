import express from 'express';
const router = express.Router();
import { getProfile,changeTag, getPublicProfile, changeAvatar } from '../controllers/profile';
import verifyJwt from '../middlewares/auth';


router.get('/:u_tag',getPublicProfile)
router.get('/',verifyJwt,getProfile)
router.post('/tag/update',verifyJwt,changeTag)
router.post('/avatar/update',verifyJwt,changeAvatar)

module.exports = router