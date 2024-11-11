import { Injectable, Logger } from '@nestjs/common';
import { AnyKeys, AnyObject, Document, Model, SortOrder } from 'mongoose';
import { IRepository } from './repository';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class DatabaseRepository<T> implements IRepository {
  private readonly logger = new Logger(DatabaseRepository.name);
  constructor(@InjectModel('') private readonly model: Model<T>) {}

  async one<T>(id: string): Promise<T | null> {
    const query = this.model.findOne<T>({ id });
    const result = await query.exec();

    return result as T;
  }

  async all<T>(params?: {
    offset?: number;
    limit?: number;
    sort?: { sortField: string; sortOrder: string | SortOrder };
  }): Promise<T[]> {
    const query = this.model
      .find<T>({})
      .sort(
        params?.sort
          ? { [params.sort.sortField]: params.sort.sortOrder as SortOrder }
          : {},
      )
      .skip(params?.offset ?? 0)
      .limit(params?.limit ?? 0);

    const result = await query.exec();
    return result as T[];
  }

  async find<T>(
    criteria: any = {},
    params?: {
      useLean?: boolean;
      offset?: number;
      limit?: number;
      sort?: { sortField: string; sortOrder: string | SortOrder };
    },
  ): Promise<T[]> {
    const query = this.model
      .find<T>(criteria)
      .sort(
        params?.sort
          ? { [params.sort.sortField]: params.sort.sortOrder as SortOrder }
          : {},
      )
      .skip(params?.offset ?? 0)
      .limit(params?.limit ?? 0);

    const result = await query.exec();
    return result as T[];
  }

  async findOne<T>(criteria: object = {}): Promise<T> {
    const query = this.model.findOne<T>(criteria);
    const result = await query.exec();

    return result as T;
  }

  async createOrUpdate<T extends Document>(entity: T): Promise<T> {
    const { _id, ...updateFields } = entity;

    const result = await this.model.findOneAndUpdate(
      { _id: _id || new this.model()._id },
      {
        $set: updateFields as AnyKeys<T> & AnyObject,
      },
      {
        upsert: true,
        new: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      },
    );

    return result as T;
  }

  async delete<T extends Document>(entity: T): Promise<void> {
    await this.model.findOneAndDelete({ _id: entity.id });
  }

  async deleteAll(): Promise<void> {
    await this.model.deleteMany({});
  }
}
