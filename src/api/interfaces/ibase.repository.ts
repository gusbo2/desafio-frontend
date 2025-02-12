export interface IBaseRepository<T> {
  create: (entity: T) => Promise<T>;
  update: (id: string, entity: T) => Promise<T>;
  find: (id: string) => Promise<T | null>;
  delete: (id: string) => Promise<boolean>;
  list: () => Promise<T[]>;
}