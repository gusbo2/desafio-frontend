import { MovementModel } from "@/models/movement/movement.model";
import { IBaseRepository } from "./ibase.repository";

export interface IMovementRepository extends IBaseRepository<MovementModel> { }