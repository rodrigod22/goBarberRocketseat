import { getRepository, Repository } from 'typeorm';

import ICreateUsersDTO from '@modules/users/dtos/ICreateUserDTO';
import IUsersRepository from './../../../repositories/IUsersRepository';
import User from './../entities/User';



class UserRepository implements IUsersRepository {

  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User)
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);
    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email }
    });
    return user;
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date: date }
    })
    return findAppointment;
  }

  public async create({ name, email, password }: ICreateUsersDTO): Promise<User> {

    const user = this.ormRepository.create({
      name,
      email,
      password
    });
    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user)
  }
}

export default UserRepository;
