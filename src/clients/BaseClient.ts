import { IConfigFull, IHttpReturn } from "../interfaces/interfaces";
import { MakeRequest } from "../helpers/MakeRequest";

export class QlikClient {
  configFull: IConfigFull;

  constructor(configFull: IConfigFull) {
    this.configFull = configFull;
  }

  async Get(url: string, contentType: string): Promise<IHttpReturn> {
    let request = new MakeRequest(this.configFull);
    request.PrepareRequestConfig(url, contentType);
    return await request.Get();
  }

  async Delete(url: string, contentType: string): Promise<IHttpReturn> {
    let request = new MakeRequest(this.configFull);
    request.PrepareRequestConfig(url, contentType);
    return await request.Delete();
  }

  async Patch(
    url: string,
    data: Object,
    contentType = "application/json"
  ): Promise<IHttpReturn> {
    let request = new MakeRequest(this.configFull);
    request.PrepareRequestConfig(url, contentType);
    return await request.Post(data);
  }

  async Post(
    url: string,
    data: Object,
    contentType = "application/json"
  ): Promise<IHttpReturn> {
    let request = new MakeRequest(this.configFull);
    request.PrepareRequestConfig(url, contentType);
    return await request.Post(data);
  }

  async Put(
    url: string,
    data: Object,
    contentType = "application/json"
  ): Promise<IHttpReturn> {
    let request = new MakeRequest(this.configFull);
    request.PrepareRequestConfig(url, contentType);
    return await request.Put(data);
  }
}
