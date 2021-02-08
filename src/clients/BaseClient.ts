import { IConfig, IConfigFull } from "../interfaces/interfaces";
import { MakeGetRequest } from "../helpers/requests/GET";
import { generateXrfkey } from "../helpers/generic";

export class QlikClient {
  configFull: IConfigFull;

  constructor(configFull: IConfigFull) {
    this.configFull = configFull;
  }

  async Get(url: string) {
    const xrfKey = generateXrfkey();

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
