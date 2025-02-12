import { EnumUtil } from "@/utils/enum.utils";
import { MovementTypeProps } from "./model";
import { MovementTypeEnum } from "@/enums/movement_type.enum";
import './index.css';

export const MovementType = ({ type }: MovementTypeProps) => {
  const getClasses = (): string => {
    let componentClass = 'type-tag';
    if (type === MovementTypeEnum.INPUT) {
      componentClass += ' type-input';
    } else {
      componentClass += ' type-output';
    }
    return componentClass;
  }

  return (
    <div className="type">
      <div className={getClasses()}></div>
      <div className="type-name">{EnumUtil.getMovementTypeDescription(type)}</div>
    </div>
  );
}