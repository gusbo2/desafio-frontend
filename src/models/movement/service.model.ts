import { OrderEnum } from "@/enums/order.enum";
import { MovementModel } from "./movement.model";
import { MovementFilterModel } from "./movement_filter.model";

export interface DeleteParameters extends BaseParameters {
  id: string;
  callback: (id: string, message: string) => void;
}

export interface ListParameters extends BaseParameters {
  filter: MovementFilterModel;
  order: OrderEnum;
  callback: (data: MovementModel[]) => void;
}

export interface SaveParameters extends BaseParameters {
  model: MovementModel;
  callback: (data: MovementModel) => void;
}

export interface FindParameters extends BaseParameters {
  id: string;
  callback: (data?: MovementModel) => void;
}

export interface BaseParameters {
  error: (message: string) => void;
}