import { AxiosRequestConfig } from "axios";
import { BaseHttpService } from "../../../../utils/baseHttpService";

export class CallbackHttpService extends BaseHttpService {
  protected async injectToken(config: AxiosRequestConfig) : Promise<AxiosRequestConfig> {
    try {
        //TODO: SIGNATURE
        return config;
    } catch (error: any) {
      throw new Error(error);
    }
  };
}

export const CallbackHttpWrapper = new CallbackHttpService(null);
