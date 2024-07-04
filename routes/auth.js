import { Router } from 'express';
import { loginUser, registerUser, getRegisterMessage, getLoginMessage } from '../controller/authcontroller.js';



const router = Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/register', getRegisterMessage);
router.get('/login', getLoginMessage);


export default router;
