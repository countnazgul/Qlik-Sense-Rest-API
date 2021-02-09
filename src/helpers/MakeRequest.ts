import {
  IConfigFull,
  ICertCrtConfig,
  ICertPfxConfig,
  IHeaderConfig,
  IJWTConfig,
  IHttpReturn,
} from "../interfaces/interfaces";

import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

import {
  generateHttpsAgent,
  generateQlikUserHeader,
  generateXrfkey,
  setURLXrfKey,
} from "../helpers/generic";

export class MakeRequest {
  configFull: IConfigFull;
  requestConfig: AxiosRequestConfig;
  xrfKey: string;

  constructor(configFull: IConfigFull) {
    this.configFull = configFull;

    this.requestConfig = {
      url: "",
      method: "GET",
      headers: {
        "Content-Type": "",
        "X-Qlik-Xrfkey": "",
      },
    };

    // if certificates authentication
    if (
      (this.configFull.authentication as ICertCrtConfig).cert ||
      (this.configFull.authentication as ICertPfxConfig).pfx
    ) {
      this.requestConfig.httpsAgent = generateHttpsAgent(
        this.configFull.authentication as any,
        true
      );
    }

    // if header authentication
    if ((this.configFull.authentication as IHeaderConfig).header) {
      let headerName = (this.configFull.authentication as IHeaderConfig).header;
      let user = (this.configFull.authentication as IHeaderConfig).user;
      this.requestConfig.headers[headerName] = user;
      this.requestConfig.httpsAgent = generateHttpsAgent(
        this.configFull.authentication,
        false
      );
    }

    // if JWT authentication
    if ((this.configFull.authentication as IJWTConfig).token) {
      let token = (this.configFull.authentication as IJWTConfig).token;
      this.requestConfig.headers["Authorization"] = `Bearer ${token}`;
      this.requestConfig.httpsAgent = generateHttpsAgent(
        this.configFull.authentication,
        false
      );
    }

    // set Qlik user header in the required format
    if ((this.configFull.authentication as any).user_name) {
      this.requestConfig.headers["X-Qlik-User"] = generateQlikUserHeader(
        this.configFull.authentication as ICertCrtConfig
      );
    }

    this.xrfKey = generateXrfkey();
    this.requestConfig.headers["X-Qlik-Xrfkey"] = this.xrfKey;
  }

  PrepareRequestConfig(url: string, contentType: string): void {
    this.requestConfig.url = setURLXrfKey(url, this.xrfKey);
    this.requestConfig.headers["Content-Type"] = contentType;
  }

  async Get(): Promise<IHttpReturn> {
    return await axios(this.requestConfig)
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
  }

  async Delete(): Promise<IHttpReturn> {
    this.requestConfig.method = "DELETE";

    return await axios(this.requestConfig)
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
  }

  async Patch(data: object): Promise<IHttpReturn> {
    this.requestConfig.method = "PATCH";
    this.requestConfig.data = data;

    return await axios(this.requestConfig)
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
  }

  async Post(data: object | BinaryType): Promise<IHttpReturn> {
    this.requestConfig.method = "POST";
    this.requestConfig.data = data;

    return await axios(this.requestConfig)
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
  }

  async Put(data: object): Promise<IHttpReturn> {
    this.requestConfig.method = "PUT";
    this.requestConfig.data = data;

    return await axios(this.requestConfig)
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
  }
}
