import { Router } from 'express';
import HomeController from './src/controllers/homeController.js';
import LoginController from './src/controllers/loginController.js';
import CreateAccountController from './src/controllers/createAccountController.js';
import AddContactController from './src/controllers/addContactController.js';
import middleware from './src/middlewares/middleware.js';

const router = Router();

router.get('/', middleware.loginRequired, middleware.loadData, HomeController.index);

router.get('/login/index', LoginController.index);
router.post('/login/login', LoginController.login);
router.get('/login/logout', LoginController.logout);

router.get('/createAccount/index', CreateAccountController.index);
router.post('/createAccount/create', CreateAccountController.create);

router.get('/addContact/index', middleware.loginRequired, AddContactController.index);
router.post('/addContact/add', middleware.loginRequired, AddContactController.add);

export default router;