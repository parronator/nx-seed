import axios from 'axios';

export const onRequest = (config) => {
  const token = this.localStorageWrapper.getAccessToken();
  if (token) {
    config.headers[
      'Authorization'
    ] = `${token.token_type} ${token.access_token}`;
  }
  return config;
};

export const onErrorResponse = (error) => {
  const originalRequest = error.config;
  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;

    const refreshToken = encodeURIComponent(
      this.localStorageWrapper.getRefreshToken()
    );
    const data = `refresh_token=${refreshToken}&grant_type=refresh_token`;

    return axios
      .post('/oauth/token', data, {
        auth: { username: 'acme', password: 'acmesecret' },
        baseURL: '/api',
      })
      .then((res) => {
        if (res.status === 200) {
          this.localStorageWrapper.setToken(res.data);
          const token = this.localStorageWrapper.getAccessToken();
          originalRequest.headers[
            'Authorization'
          ] = `${token.token_type} ${token.access_token}`;
          return axios(originalRequest);
        }
      })
      .catch(() => {
        this.localStorageWrapper.clearToken();
        window.location.assign('/signin');
      });
  } else if (error.response.status === 403) {
    this.localStorageWrapper.clearToken();
    window.location.assign('/signin');
  }
  throw error;
};
