import { MovementTypeEnum } from "@/enums/movement_type.enum";
import { MovementModel } from "@/models/movement/movement.model";
import { StringUtil } from "./string.util";

interface IMovementUtil {
  getTotalMovements: (filter: MovementTypeEnum, movements: MovementModel[]) => string;
}

export const MovementUtil: IMovementUtil = {
  getTotalMovements: (filter: MovementTypeEnum, movements: MovementModel[]): string => {
    let total: number = 0;
    if (filter !== MovementTypeEnum.ALLTYPES) {
      movements.filter(item => item.type === filter).forEach(item => total += item.price);
    } else {
      movements.forEach(item => total += item.price);
    }
    return StringUtil.priceFormat(total.toFixed(2));
  }
}