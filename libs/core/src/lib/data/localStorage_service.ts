import { StorageService } from '../..';

export class LocalStorageService implements StorageService {
  get<T>(key: string): T {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  set<T>(key: string, value: T): void {
    window.localStorage.setItem(key, JSON.stringify(value));
  }

  remove(key: string): void {
    window.localStorage.removeItem(key);
  }
}
