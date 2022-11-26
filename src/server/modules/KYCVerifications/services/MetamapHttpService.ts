import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import LocalStorageService from "../../../../utils/localStorage";
import * as environment from "../../../../config";

enum StatusCode {
  Unauthorized = 401,
  Forbidden = 403,
  TooManyRequests = 429,
  InternalServerError = 500,
}

const headers: Readonly<Record<string, string | boolean>> = {
    "Accept": "application/json",
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Credentials": true,
    "X-Requested-With": "XMLHttpRequest",
};

export class Http {
  private instance: AxiosInstance | null = null;
  private get http(): AxiosInstance {
    return this.instance != null ? this.instance : this.initHttp();
  }

  isTokenExpired = (token:string|null) => (!token || Date.now() >= JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString()).exp * 1000);

  private async injectToken(config: AxiosRequestConfig) : Promise<AxiosRequestConfig> {
    try {

        let token = LocalStorageService.getItem("accessToken");
        if(!token || Date.now() >= JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString()).exp * 1000) {

            const authResponse = await axios.post(`${environment.metamap.base_url}/oauth`, { 'grant_type' : 'client_credentials'}, {
                auth: {
                    username: environment.metamap.username,
                    password: environment.metamap.userpass,
                },
                headers: { "Content-Type": "application/x-www-form-urlencoded" }
            });

            token = authResponse.data.access_token;
            LocalStorageService.setItem("accessToken", token);
        }

        config.headers = { Authorization: `Bearer ${token}` };
        return config;
    } catch (error: any) {
      throw new Error(error);
    }
  };

  initHttp() {

    const http = axios.create({
      baseURL: environment.metamap.base_url,
      headers,
      withCredentials: true,
    });

    http.interceptors.request.use(this.injectToken, (error) => Promise.reject(error));

    http.interceptors.response.use(
      (response) => response,
      (error) => {
        const { response } = error;
        return this.handleError(response);
      }
    );

    this.instance = http;
    return http;
  }

  request<T = any, R = AxiosResponse<T>>(config: AxiosRequestConfig): Promise<R> {
    return this.http.request(config);
  }

  get<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return this.http.get<T, R>(url, config);
  }

  post<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.http.post<T, R>(url, data, config);
  }

  put<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.http.put<T, R>(url, data, config);
  }

  delete<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return this.http.delete<T, R>(url, config);
  }

  // Handle global app errors
  // We can handle generic app errors depending on the status code
  private handleError(error: any) {
    const { status } = error;

    switch (status) {
      case StatusCode.InternalServerError: {
        // Handle InternalServerError
        break;
      }
      case StatusCode.Forbidden: {
        // Handle Forbidden
        break;
      }
      case StatusCode.Unauthorized: {
        // Handle Unauthorized
        break;
      }
      case StatusCode.TooManyRequests: {
        // Handle TooManyRequests
        break;
      }
    }

    return Promise.reject(error);
  }
}

export const MetamapHttpWrapper = new Http();
