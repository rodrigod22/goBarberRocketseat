import { container } from 'tsyringe';
import IStorageProvider from './StorageProviders/models/IStorageProvider';
import DiskStorageProvider from './StorageProviders/implementation/DiskStorageProvider';

container.registerSingleton<IStorageProvider>(
  "StorageProvider",
  DiskStorageProvider
)
