import { Document } from 'mongoose';
import { IReadOnlyRepository } from './readonly.repository';

export interface IRepository extends IReadOnlyRepository {
  createOrUpdate<T extends Document>(entity: T): Promise<T>;
  delete<T extends Document>(entity: T): Promise<void>;
}
