//   user?: `${string}\\${string}`;

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

export interface IConfig {
  host: string;
  port?: string;
  proxy?: string;
  notSecure?: boolean;
  headers?: string[];
  cookies?: string[];
  authentication: ICertCrtConfig | ICertPfxConfig | IHeaderConfig;
}

export interface IConfigFull extends IConfig {
  baseUrl: string;
}
