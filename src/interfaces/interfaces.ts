//   user?: `${string}\\${string}`;

import { AxiosResponse } from "axios";

export interface ICertCrtConfig {
  cert: string | Buffer;
  key: string | Buffer;
  user_dir?: string;
  user_name?: string;
}

export interface ICertPfxConfig {
  pfx: string | Buffer;
  user_dir?: string;
  user_name?: string;
}

export interface IHeaderConfig {
  header: string;
  user: string;
}

export interface IJWTConfig {
  token: string;
}

export interface ISessionConfig {
  sessionId: string;
  cookieHeaderName: string;
}

export interface IConfig {
  host: string;
  port?: number;
  proxy?: string;
  notSecure?: boolean;
  headers?: string[];
  cookies?: string[];
  authentication:
    | ICertCrtConfig
    | ICertPfxConfig
    | IHeaderConfig
    | IJWTConfig
    | ISessionConfig;
}

export interface IConfigFull extends IConfig {
  baseUrl: string;
}

export interface IHttpReturn {
  status: number;
  statusText: string;
  data: AxiosResponse<any>["data"];
}
