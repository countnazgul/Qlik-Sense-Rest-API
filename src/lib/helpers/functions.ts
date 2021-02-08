import axios, { AxiosRequestConfig } from "axios";
import { ICertCrtConfig, ICertPfxConfig } from "../../interfaces/interfaces";
import https from "https";

export function checkHttpsAgent(
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
