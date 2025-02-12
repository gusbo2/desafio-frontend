import { MovementModel } from "@/models/movement/movement.model";
import { BaseRepository } from "./base.repository";
import { IMovementRepository } from "../interfaces/imovement.repository";

export class MovementRepository extends BaseRepository<MovementModel> implements IMovementRepository {
  constructor() {
    super('movements');
  }
}