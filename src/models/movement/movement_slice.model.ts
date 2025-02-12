import { MovementModel } from "./movement.model";
import { SliceModel } from "../base/slice.model";

export interface MovementSliceModel extends SliceModel<MovementModel> {
  list: MovementModel[];
}