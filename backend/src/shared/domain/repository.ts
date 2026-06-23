import type { EntityVersion, Page, PageRequest } from "./primitives.js";

export interface SaveOptions {
  readonly expectedVersion?: EntityVersion;
}

export interface Repository<T, Id> {
  findById(id: Id): Promise<T | null>;
  save(entity: T, options?: SaveOptions): Promise<T>;
}

export interface PagedRepository<T, Filter> {
  search(filter: Filter, page: PageRequest): Promise<Page<T>>;
}
