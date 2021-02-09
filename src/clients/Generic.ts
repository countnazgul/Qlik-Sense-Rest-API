import { IConfig, IConfigFull, IHttpReturn } from "../interfaces/interfaces";
import { QlikClient } from "./BaseClient";

export class QlikGenericRestClient extends QlikClient {
  constructor(config: IConfig) {
    let proxy = config.proxy ? `/${config.proxy}` : "";
    let protocol = config.notSecure ? "http" : "https";
    let port = config.port ? `:${config.port}` : "";

    let configFull: IConfigFull = {
      ...config,
      baseUrl: `${protocol}://${config.host}${port}${proxy}`,
    };

    super(configFull);
  }

  Get(path: string, contentType = "application/json"): Promise<IHttpReturn> {
    return super.Get(`${this.configFull.baseUrl}/${path}`, contentType);
  }

  Delete(path: string, contentType = "application/json") {
    return super.Delete(`${this.configFull.baseUrl}/${path}`, contentType);
  }

  Patch(
    path: string,
    data: object,
    contentType = "application/json"
  ): Promise<IHttpReturn> {
    return super.Post(`${this.configFull.baseUrl}/${path}`, data, contentType);
  }

  Post(
    path: string,
    data: object,
    contentType = "application/json"
  ): Promise<IHttpReturn> {
    return super.Post(`${this.configFull.baseUrl}/${path}`, data, contentType);
  }

  Put(
    path: string,
    data: object,
    contentType = "application/json"
  ): Promise<IHttpReturn> {
    return super.Put(`${this.configFull.baseUrl}/${path}`, data, contentType);
  }
}
