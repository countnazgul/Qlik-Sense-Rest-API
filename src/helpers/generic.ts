import { AxiosRequestConfig } from "axios";
import {
  ICertCrtConfig,
  ICertPfxConfig,
  IHeaderConfig,
} from "../interfaces/interfaces";
import https from "https";

export function generateHttpsAgent(
  authentication: ICertCrtConfig | ICertPfxConfig | IHeaderConfig,
  isCert?: Boolean
): AxiosRequestConfig["httpAgent"] {
  if (isCert) {
    if ((authentication as ICertCrtConfig).cert) {
      return new https.Agent({
        rejectUnauthorized: false,
        cert: (authentication as ICertCrtConfig).cert,
        key: (authentication as ICertCrtConfig).key,
      });
    }

    if ((authentication as ICertPfxConfig).pfx) {
      return new https.Agent({
        rejectUnauthorized: false,
        pfx: (authentication as ICertPfxConfig).pfx,
      });
    }
  }
  // when no cert authentication then only ignore the cert warning
  if (!isCert) {
    return new https.Agent({
      rejectUnauthorized: false,
    });
  }

  throw new Error("No certificates found");
}

export function generateQlikUserHeader(
  config: ICertCrtConfig | ICertPfxConfig
): string {
  if (config.user_dir && config.user_name)
    return `UserDirectory=${config.user_dir};UserId=${config.user_name}`;

  if (!config.user_dir || !config.user_name)
    throw new Error("Please provide user name and directory");

  // user and user directory should always be provided by the consumer logic
  // dont want to use any default values for it. Change my mind?
  if (!config.user_dir && !config.user_name)
    throw new Error("Please provide user name and directory");
}

export function generateXrfkey(): string {
  var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  var string_length = 16;
  var value = "";
  for (var i = 0; i < string_length; i++) {
    var rNum = Math.floor(Math.random() * chars.length);
    value += chars.substring(rNum, rNum + 1);
  }
  return value;
}

export function setURLXrfKey(url: string, xrfKey: string) {
  return url.indexOf("?") > -1
    ? `${url}&xrfkey=${xrfKey}`
    : `${url}?xrfkey=${xrfKey}`;
}

// check if xrfKey is passed. if not - generate it
// export const checkXrfKey = (index: number) => (
//   target: any,
//   key: string,
//   propDesc: PropertyDescriptor
// ) => {
//   let originalFunction: Function = propDesc.value;
//   propDesc.value = function () {
//     let argValue = arguments[index];
//     let newArgs = [];

//     for (let i = 0; i < arguments.length; i++) newArgs.push(arguments[i]);

//     newArgs[index] = argValue || generateXrfkey();

//     return originalFunction.apply(this, newArgs);
//   };
//   return propDesc;
// };

export function generateUUID(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
