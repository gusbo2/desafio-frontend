import { MovementTypeEnum } from "@/enums/movement_type.enum";

interface IEnumUtil {
  getMovementTypeDescription(type: MovementTypeEnum): string;
}

export const EnumUtil: IEnumUtil = {
  getMovementTypeDescription: (type: MovementTypeEnum): string => {
    switch (type) {
      case MovementTypeEnum.ALLTYPES:
        return '';
      case MovementTypeEnum.INPUT:
        return 'Entrada';
      case MovementTypeEnum.OUTPUT:
        return 'Saída';
    }
  }
}