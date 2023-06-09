import express from 'express';
const router = express.Router();
import { login, auth } from '../controllers/login';
import verifyJwt from '../middlewares/auth';

router.post('/',login)
router.post('/auth',verifyJwt,auth)


module.exports = router