import { AxiosService, HttpService } from '@cinch-build/core';

import {
  onErrorResponse,
  onRequest,
} from '../../../../../../libs/auth/src/lib/data/datasources/auth_remote_callbacks';

export class RemoteService extends AxiosService implements HttpService {
  constructor(baseURL = '/api/v1') {
    super(baseURL);

    this.instance.interceptors.request.use(onRequest, Promise.reject);

    this.instance.interceptors.response.use(
      (response) => response,
      onErrorResponse
    );
  }
}
