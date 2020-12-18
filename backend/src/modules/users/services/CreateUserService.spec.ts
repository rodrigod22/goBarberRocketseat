import CreateUserService from '@modules/users/services/CreateUserService';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from './../providers/HashProvider/fakes/FakeHashProvider';

describe('CreateUser', () => {

  it('should be able to create a new user', async () => {

    const fakeUserRepository = new FakeUsersRepository()
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(fakeUserRepository, fakeHashProvider)

    const user = await createUser.execute({
      name: "rodrigo",
      email: 'rodrigo@gmail.com',
      password: '123456'
    });

    expect(user).toHaveProperty('id')

  });

  it('should not be able to create a new user with sendEmail from another', async () => {

    const fakeUserRepository = new FakeUsersRepository()
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(fakeUserRepository, fakeHashProvider)

    await createUser.execute({
      name: 'rodrigo',
      email: 'rodrigo@gmail.com',
      password: '123456'
    });

    expect(createUser.execute({
      name: 'rodrigo',
      email: 'rodrigo@gmail.com',
      password: '123456'
    })).rejects.toBeInstanceOf(AppError);
  });

});
