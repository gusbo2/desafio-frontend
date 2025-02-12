import { MovementTypeEnum } from "@/enums/movement_type.enum";

export interface MovementModel {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  price: number;
  type: MovementTypeEnum;
}