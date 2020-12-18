import { container } from 'tsyringe';
import IHashProvider from './HashProvider/models/IHashProvider';
import BcryptHashProvider from './HashProvider/implementation/BCryptHashProvider';

container.registerSingleton<IHashProvider>(
  'HashProvider', BcryptHashProvider
)
