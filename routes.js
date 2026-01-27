import { Router } from 'express';
import HomeController from './src/controllers/homeController.js';
import LoginController from './src/controllers/loginController.js';
import CreateAccountController from './src/controllers/createAccountController.js';

const router = Router();

router.get('/', HomeController.index);

router.get('/login/index', LoginController.index);
router.post('/login/login', LoginController.login);

router.get('/createAccount/index', CreateAccountController.index);
router.post('/createAccount/create', CreateAccountController.create);

export default router;