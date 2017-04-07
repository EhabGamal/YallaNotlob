/**
 * Created by ehab on 4/7/17.
 */
import { OpaqueToken } from "@angular/core";

export let APP_CONFIG = new OpaqueToken("app.config");

export interface IAppConfig {
  apiEndpoint: string;
}

export const AppConfig: IAppConfig = {
  apiEndpoint: "https://yalabenanotlob.herokuapp.com/"
};
