import { IConfig, IConfigFull } from "../interfaces/interfaces";
import { MakeGetRequest } from "./requests/GET";

abstract class QlikClient {
  configFull: IConfigFull;

  constructor(configFull: IConfigFull) {
    this.configFull = configFull;
  }

  async Get(url: string, xrfKey: string) {
    let response = await MakeGetRequest(
      `${url}?xrfkey=${xrfKey}`,
      this.configFull,
      xrfKey
    );
    return response;
  }
  Post() {}
  Put() {}
  Delete() {}
  Patch() {}
}

export class QlikRepositoryClient extends QlikClient {
  constructor(config: IConfig) {
    let proxy = config.proxy ? `/${config.proxy}` : "";
    let protocol = config.notSecure ? "http" : "https";
    let port = config.port ? `:${config.port}` : "";

    let configFull: IConfigFull = {
      ...config,
      baseUrl: `${protocol}://${config.host}${port}${proxy}/qrs`,
    };

    super(configFull);
  }

  Get(path: string) {
    return super.Get(this.getFinalUrl(path), generateXrfkey());
  }

  Post() {
    super.Post();
  }

  Put() {
    super.Put();
  }

  Delete() {
    super.Delete();
  }

  Patch() {
    super.Patch();
  }

  private getFinalUrl(path: string) {
    return `${this.configFull.baseUrl}/${path}`;
  }
}

export class QlikProxyClient extends QlikClient {}

export class QlikEngineClient extends QlikClient {}

export class QlikGenericRestClient extends QlikClient {}

export class QlikSaaSClient {
  constructor() {}

  toBeAdded() {
    return true;
  }
}

function generateXrfkey(): string {
  var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  var string_length = 16;
  var value = "";
  for (var i = 0; i < string_length; i++) {
    var rNum = Math.floor(Math.random() * chars.length);
    value += chars.substring(rNum, rNum + 1);
  }
  return value;
}
