import { HttpMethodEnum } from "@/enums/http_method.enum";

export interface RequestModel {
  path: string;
  data?: string;
  method: HttpMethodEnum;
}