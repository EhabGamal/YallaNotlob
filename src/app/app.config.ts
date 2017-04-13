import { OpaqueToken } from "@angular/core";

export let APP_CONFIG = new OpaqueToken("app.config");

export interface AppConfig {
  apiEndpoint: string;
}
export const AppConfig: AppConfig = {
//export const AppConfig = {
  apiEndpoint: "https://yalabenanotlob.herokuapp.com/api/"
};
