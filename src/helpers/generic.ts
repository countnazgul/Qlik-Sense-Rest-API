import axios, { AxiosRequestConfig } from "axios";
import { ICertCrtConfig, ICertPfxConfig } from "../interfaces/interfaces";
import https from "https";

export function generateHttpsAgent(
  authentication: ICertCrtConfig | ICertPfxConfig
): AxiosRequestConfig["httpAgent"] {
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

  throw new Error("No certificates found");
}

export function generateQlikUserHeader(
  config: ICertCrtConfig | ICertPfxConfig
): string {
  return `UserDirectory=${config.user_dir};UserId=${config.user_name}`;
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
  // @ts-ignore
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}
