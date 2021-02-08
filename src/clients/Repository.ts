import { IConfig, IConfigFull } from "../interfaces/interfaces";
import { QlikClient } from "./BaseClient";

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
    return super.Get(this.getFinalUrl(path));
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
