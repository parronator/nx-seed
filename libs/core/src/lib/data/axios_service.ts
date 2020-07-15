import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { HttpErrorResponse, HttpService } from '../..';
import {
  CreationException,
  ServerException,
  ServerNotFoundException,
} from '@cinch-build/core';

export class AxiosService implements HttpService {
  protected readonly instance: AxiosInstance;

  constructor(baseURL = '/api/v1') {
    this.instance = axios.create({ baseURL });
  }

  async get(path: string) {
    try {
      return await this.instance.get(path);
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }

  async post<T>(path: string, payload: T, config: AxiosRequestConfig = {}) {
    return await this.instance.post(path, payload, config);
  }

  async put<T>(path: string, payload: T, config: AxiosRequestConfig = {}) {
    return await this.instance.put(path, payload, config);
  }

  async delete<T>(path: string, payload: T) {
    return await this.instance.delete(path, payload);
  }

  manageErrors(e: HttpErrorResponse) {
    switch (e.code) {
      case '404':
        throw new ServerNotFoundException();
      case '422':
        throw new CreationException();
      default:
        throw new ServerException();
    }
  }
}
