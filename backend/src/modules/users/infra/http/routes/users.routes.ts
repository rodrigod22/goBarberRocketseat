import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import ensureAuthenticate from '@modules/users/infra/http/middlewares/ensureAuthenticate';
import UsersController from './../controllers/UsersController';
import UserAvatarController from './../controllers/UserAvatarController';

const usersRouter = Router();

const upload = multer(uploadConfig);

const usersController = new UsersController()
const avatarController = new UserAvatarController()

usersRouter.post('/', usersController.create)

usersRouter.patch('/avatar', ensureAuthenticate, upload.single('avatar'),
  avatarController.update);

export default usersRouter;
