export abstract class StorageService {
  abstract get<T>(key: string): T;

  abstract set<T>(key: string, value: T): void;

  abstract remove(key: string): void;
}
