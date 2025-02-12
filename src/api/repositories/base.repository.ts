import { RequestModel } from "@/models/base/request.model";
import { IBaseRepository } from "../interfaces/ibase.repository";
import { HttpMethodEnum } from "@/enums/http_method.enum";
import axios, { Axios, AxiosResponse } from "axios";

export class BaseRepository<T> implements IBaseRepository<T> {
  private api: Axios;
  protected requestModel: RequestModel;

  constructor(path: string) {
    this.api = axios.create({
      baseURL: 'http://localhost:4000/',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    this.requestModel = {
      path: path,
      method: HttpMethodEnum.GET
    }
  }

  public async create(entity: T): Promise<T> {
    const response =
      await this.sendRequest<T>({ ...this.requestModel, data: JSON.stringify(entity), method: HttpMethodEnum.POST });
    return response;
  }

  public async update(id: string, entity: T): Promise<T> {
    const response =
      await this.sendRequest<T>({ ...this.requestModel, path: `${this.requestModel.path}/${id}`, data: JSON.stringify(entity), method: HttpMethodEnum.PUT });
    return response;
  }

  public async find(id: string): Promise<T> {
    const response = await this.sendRequest<T>({ ...this.requestModel, path: `${this.requestModel.path}/${id}` });
    return response;
  }

  public async delete(id: string): Promise<boolean> {
    await this.sendRequest<T>({ ...this.requestModel, path: `${this.requestModel.path}/${id}`, method: HttpMethodEnum.DELETE });
    return true;
  }

  public async list(): Promise<T[]> {
    let path = `${this.requestModel.path}`;
    const response = await this.sendRequest<T[]>({ ...this.requestModel, path });
    return response;
  }

  protected async sendRequest<T>(model: RequestModel): Promise<T> {
    const response = await this.sendRequestBase<T>(model);
    return response.data;
  }

  private async sendRequestBase<T>({ method, path, data }: RequestModel): Promise<AxiosResponse<T, any>> {
    switch (method) {
      case HttpMethodEnum.GET:
        return await this.api.get(path);
      case HttpMethodEnum.PUT:
        return await this.api.put(path, data);
      case HttpMethodEnum.POST:
        return await this.api.post(path, data);
      case HttpMethodEnum.DELETE:
        return await this.api.delete(path);
    }
  }
}