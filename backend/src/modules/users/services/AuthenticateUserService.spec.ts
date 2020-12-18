import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import CreateUserService from '@modules/users/services/CreateUserService';
import FakeHashProvider from './../providers/HashProvider/fakes/FakeHashProvider';

describe('AuthenticateUser', () => {

  it('should be able to authenticate', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(fakeUserRepository, fakeHashProvider);
    const authenticateUser = new AuthenticateUserService(fakeUserRepository, fakeHashProvider);

    await createUser.execute({
      name: "Rodrigo2",
      email: 'rodrigo@gmail.com',
      password: '123456'
    });

    const response = await authenticateUser.execute({
      email: 'rodrigo@gmail.com',
      password: '123456'
    });

    expect(response).toHaveProperty('token');

  });

  it('should not be able to authenticate with non existing user', async () => {

    const fakeUserRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();


    const authenticateUser = new AuthenticateUserService(fakeUserRepository, fakeHashProvider);

    expect(authenticateUser.execute({
      email: 'rodrigo@gmail.com',
      password: '123456'
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {

    const fakeUserRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(fakeUserRepository, fakeHashProvider);
    const authenticateUser = new AuthenticateUserService(fakeUserRepository, fakeHashProvider);

    await createUser.execute({
      name: "Rodrigo2",
      email: 'rodrigo@gmail.com',
      password: '123456'
    });


    expect(authenticateUser.execute({
      email: 'rodrigo@gmail.com',
      password: 'wrong-password'
    })).rejects.toBeInstanceOf(AppError);
  });


});
