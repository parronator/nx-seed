/* eslint-disable @typescript-eslint/no-explicit-any*/
import { AxiosRequestConfig } from 'axios';

export interface HttpResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: any;
  config: any;
  request?: any;
}

export interface HttpErrorResponse<T = any> {
  config: any;
  code?: string;
  request?: any;
  response?: HttpResponse<T>;
  toJSON: () => object;
}

export abstract class HttpService {
  abstract get(path: string): Promise<HttpResponse>;

  abstract post<T>(
    path: string,
    payload: T,
    config?: AxiosRequestConfig
  ): Promise<HttpResponse>;

  abstract put<T>(
    path: string,
    payload: T,
    config: AxiosRequestConfig
  ): Promise<HttpResponse>;

  abstract delete<T>(path: string, payload: T): Promise<HttpResponse>;

  abstract manageErrors(e: HttpErrorResponse): void;
}
