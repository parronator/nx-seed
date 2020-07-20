import { AxiosService, HttpService } from '@cinch-build/core';

export class RemoteService extends AxiosService implements HttpService {
  constructor(baseURL = 'http://localhost:3000/api/v1') {
    super(baseURL);
  }
}
