import {
  IConfigFull,
  ICertCrtConfig,
  ICertPfxConfig,
  IHeaderConfig,
  IJWTConfig,
  ISessionConfig,
  ITicketConfig,
  IHttpReturn,
} from "../interfaces/interfaces";

import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  ResponseType,
} from "axios";

import {
  generateHttpsAgent,
  generateQlikUserHeader,
  generateXrfkey,
  setURLXrfKey,
  setQlikTicket,
} from "../helpers/generic";

export class MakeRequest {
  configFull: IConfigFull;
  requestConfig: AxiosRequestConfig;
  xrfKey: string;
  qlikTicket: string;

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

    this.SetCertificates();
    this.SetHeader();
    this.SetJWT();
    this.SetSession();
    this.SetUserHeader();
    this.SetTicket();

    this.xrfKey = generateXrfkey();
    this.requestConfig.headers["X-Qlik-Xrfkey"] = this.xrfKey;
  }

  PrepareRequestConfig(
    url: string,
    contentType: string,
    responseType?: ResponseType
  ): void {
    this.requestConfig.url = setQlikTicket(url, this.qlikTicket);
    this.requestConfig.url = setURLXrfKey(this.requestConfig.url, this.xrfKey);
    this.requestConfig.headers["Content-Type"] = contentType;
    if (responseType) this.requestConfig.responseType = responseType;
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

  async Post(data: object | BinaryType | string | Blob): Promise<IHttpReturn> {
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

  async Put(data: object | BinaryType | string | Blob): Promise<IHttpReturn> {
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

  private SetCertificates() {
    // if certificates authentication
    if (
      (this.configFull.authentication as ICertCrtConfig).cert ||
      (this.configFull.authentication as ICertPfxConfig).pfx
    ) {
      this.requestConfig.httpsAgent = generateHttpsAgent(
        this.configFull.authentication as ICertCrtConfig | ICertPfxConfig,
        true
      );
    }
  }

  private SetHeader() {
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
  }

  private SetJWT() {
    // if JWT authentication
    if ((this.configFull.authentication as IJWTConfig).token) {
      let token = (this.configFull.authentication as IJWTConfig).token;
      this.requestConfig.headers["Authorization"] = `Bearer ${token}`;
      this.requestConfig.httpsAgent = generateHttpsAgent(
        this.configFull.authentication,
        false
      );
    }
  }

  private SetSession() {
    // if session authentication
    if ((this.configFull.authentication as ISessionConfig).sessionId) {
      let sessionId = (this.configFull.authentication as ISessionConfig)
        .sessionId;
      let cookieHeaderName = (this.configFull.authentication as ISessionConfig)
        .cookieHeaderName;
      (this.requestConfig.headers[
        "Cookie"
      ] = `${cookieHeaderName}=${sessionId}`),
        (this.requestConfig.httpsAgent = generateHttpsAgent(
          this.configFull.authentication,
          false
        ));
    }
  }

  private SetUserHeader() {
    // set Qlik user header in the required format
    if ((this.configFull.authentication as any).user_name) {
      this.requestConfig.headers["X-Qlik-User"] = generateQlikUserHeader(
        this.configFull.authentication as ICertCrtConfig
      );
    }
  }

  private SetTicket() {
    // set Qlik ticket
    if ((this.configFull.authentication as ITicketConfig).ticket) {
      let ticket: string = (this.configFull.authentication as ITicketConfig)
        .ticket;
      this.qlikTicket = ticket;

      this.requestConfig.httpsAgent = generateHttpsAgent(
        this.configFull.authentication as ITicketConfig,
        false
      );
    }
  }
}
