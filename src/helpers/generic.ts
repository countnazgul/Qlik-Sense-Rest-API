import { AxiosRequestConfig } from "axios";
import {
  // ICertCrtConfig,
  // ICertPfxConfig,
  IHeaderConfig,
  IJWTConfig,
  ISessionConfig,
  ITicketConfig,
  ICertUser,
} from "../interfaces/interfaces";
import https from "https";

// export function generateHttpsAgent(
//   authentication:
//     | ICertCrtConfig
//     | ICertPfxConfig
//     | IHeaderConfig
//     | IJWTConfig
//     | ISessionConfig
//     | ITicketConfig,
//   isCert?: Boolean
// ): AxiosRequestConfig["httpAgent"] {
//   if (isCert) {
//     if ((authentication as ICertCrtConfig).cert) {
//       return new https.Agent({
//         rejectUnauthorized: false,
//         cert: (authentication as ICertCrtConfig).cert,
//         key: (authentication as ICertCrtConfig).key,
//       });
//     }

//     if ((authentication as ICertPfxConfig).pfx) {
//       return new https.Agent({
//         rejectUnauthorized: false,
//         pfx: (authentication as ICertPfxConfig).pfx,
//       });
//     }
//   }
//   // when no cert authentication then only ignore the cert warning
//   if (!isCert) {
//     return new https.Agent({
//       rejectUnauthorized: false,
//     });
//   }

//   throw new Error("No certificates found");
// }

export function generateQlikUserHeader(config: ICertUser): string {
  if (config.user_dir && config.user_name)
    return `UserDirectory=${config.user_dir};UserId=${config.user_name}`;

  if (!config.user_dir || !config.user_name)
    throw new Error("Please provide user name and user directory");

  // user and user directory should always be provided by the consumer logic
  // dont want to use any default values for it. Change my mind?
  if (!config.user_dir && !config.user_name)
    throw new Error("Please provide user name and user directory");
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

export function setQlikTicket(url: string, qlikTicket: string) {
  if (qlikTicket)
    return url.indexOf("?") > -1
      ? `${url}&qlikTicket=${qlikTicket}`
      : `${url}?qlikTicket=${qlikTicket}`;

  return url;
}

export function generateUUID(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
