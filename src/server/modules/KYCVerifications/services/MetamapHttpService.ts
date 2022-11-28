import axios, { AxiosRequestConfig } from "axios";
import LocalStorageService from "../../../../utils/localStorage";
import * as environment from "../../../../config";
import { BaseHttpService } from "../../../../utils/baseHttpService";


export class MetamapHttpService extends BaseHttpService {
  protected async injectToken(config: AxiosRequestConfig) : Promise<AxiosRequestConfig> {
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
}

export const MetamapHttpWrapper = new MetamapHttpService(environment.metamap.base_url);
