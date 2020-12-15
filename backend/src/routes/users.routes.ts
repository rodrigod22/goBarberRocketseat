import { Router } from 'express';

import multer from 'multer';

import uploadConfig from '../config/upload';

import CreateUserService from './../service/CreateUserService';
import ensureAuthenticate from './../middlewares/ensureAuthenticate';
import UpdateUserAvatarService from './../service/UpdateUserAvatarService';


const usersRouter = Router();

const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {

  try {

    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    delete user.password;

    return response.json(user);

  } catch (err) {
    return response.status(400).json({ error: err.message })
  }

});


usersRouter.patch('/avatar', ensureAuthenticate, upload.single('avatar'),
  async (request, response) => {

    const updateUserAvatar = new UpdateUserAvatarService();
    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    delete user.password;

    return response.json(user)

  });

export default usersRouter;
