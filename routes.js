import { Router } from 'express';
import HomeController from './src/controllers/homeController.js';
import LoginController from './src/controllers/loginController.js';
import CreateAccountController from './src/controllers/createAccountController.js';
import AddContactController from './src/controllers/addContactController.js';
import middleware from './src/middlewares/middleware.js';
import UpdateContactController from './src/controllers/updateContactController.js';

const router = Router();

router.get('/', middleware.loginRequired, HomeController.index);
router.get('/delete', middleware.loginRequired, HomeController.delete);

router.get('/login/index', LoginController.index);
router.post('/login/login', LoginController.login);
router.get('/login/logout', LoginController.logout);

router.get('/createAccount/index', CreateAccountController.index);
router.post('/createAccount/create', CreateAccountController.create);

router.get('/addContact/index', middleware.loginRequired, AddContactController.index);
router.post('/addContact/add', middleware.loginRequired, AddContactController.add);

router.get('/update/index', middleware.loginRequired, UpdateContactController.index);
router.post('/update/update',middleware.loginRequired, UpdateContactController.update);

export default router;