import { LocalStorageService } from '@cinch-build/core';
import { Token } from '../../domain/entities/token';

const tokenKey = 'access_token';

export abstract class AuthLocalDatasource {
  abstract setToken(tokenObj: Token): void;

  abstract getAccessToken(): string;

  abstract getRefreshToken(): string;

  abstract clearToken(): void;
}

export class AuthLocalDatasourceImpl extends LocalStorageService
  implements AuthLocalDatasource {
  setToken(tokenObj: Token) {
    this.set(tokenKey, tokenObj);
  }

  getAccessToken(): string {
    const token: Token = this.get(tokenKey);
    if (token) {
      return token.access_token;
    }
    return '';
  }

  getRefreshToken(): string {
    const token: Token = this.get(tokenKey);
    if (token) {
      return token.refresh_token;
    }
    return '';
  }

  clearToken() {
    this.remove(tokenKey);
  }
}
