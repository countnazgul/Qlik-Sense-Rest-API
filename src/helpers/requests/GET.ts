import {
  IConfigFull,
  ICertCrtConfig,
  ICertPfxConfig,
} from "../../interfaces/interfaces";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

import { checkHttpsAgent } from "../generic";

export async function MakeGetRequest(
  path: string,
  config: IConfigFull,
  xrfKey: string
): Promise<any> {
  let reqConfig: AxiosRequestConfig = {
    url: path,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Qlik-Xrfkey": xrfKey,
    },
  };

  if (config.authentication) {
    let agent = checkHttpsAgent(config.authentication as any);
    reqConfig.httpAgent = agent;
  }

  if ((config.authentication as any).user) {
    reqConfig.headers["X-Qlik-User"] = `UserDirectory=${
      (config.authentication as ICertCrtConfig).user_dir
    };UserId=${(config.authentication as ICertCrtConfig).user_name}`;
  }

  const response = await axios(reqConfig)
    .catch((e: AxiosError) => {
      throw new Error(e.message);
    })
    .then((response: AxiosResponse) => {
      return {
        status: response.status,
        statusText: response.statusText,
        data: response.data,
      };
    });
  return response;
}
