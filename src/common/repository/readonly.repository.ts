export interface IReadOnlyRepository {
  one<T>(id: string): Promise<T>;
  all<T>(params?: {
    offset?: number;
    limit?: number;
    sort?: any;
  }): Promise<T[]>;
  find<T>(
    criteria: object,
    params?: { offset?: number; limit?: number; sort?: any },
  ): Promise<T[]>;
}
