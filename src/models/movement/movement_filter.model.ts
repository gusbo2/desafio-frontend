import { MovementTypeEnum } from "@/enums/movement_type.enum";

export interface MovementFilterModel {
  name?: string;
  type?: MovementTypeEnum;
  createdAt?: string;
  price?: number;
}