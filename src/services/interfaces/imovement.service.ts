import { DeleteParameters, FindParameters, ListParameters, SaveParameters } from "@/models/movement/service.model";

export interface IMovementService {
  create: ({ model, callback, error }: SaveParameters) => Promise<void>;
  update: ({ model, callback, error }: SaveParameters) => Promise<void>;
  find: ({ id, callback, error }: FindParameters) => Promise<void>;
  delete: ({ id, error, callback }: DeleteParameters) => Promise<void>;
  list: ({ order, filter, callback, error }: ListParameters) => Promise<void>;
}