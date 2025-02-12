import { MovementTypeEnum } from "@/enums/movement_type.enum";
import { MovementModel } from "@/models/movement/movement.model";
import { MovementUtil } from "@/utils/movement.util";
import { StringUtil } from "@/utils/string.util";

jest.mock('../utils/string.util.ts');

describe('MovementUtil', () => {
  const movements: MovementModel[] = [
    { id: '1', name: 'Movement 1', description: 'Desc 1', createdAt: '2025-02-01', price: 100, type: MovementTypeEnum.INPUT },
    { id: '2', name: 'Movement 2', description: 'Desc 2', createdAt: '2025-02-02', price: -200, type: MovementTypeEnum.OUTPUT },
    { id: '3', name: 'Movement 3', description: 'Desc 3', createdAt: '2025-02-03', price: 300, type: MovementTypeEnum.INPUT },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  })

  it('should calculate total for a specific type', () => {
    const filter = MovementTypeEnum.INPUT;
    const expectedTotal = '400.00';

    (StringUtil.priceFormat as jest.Mock).mockReturnValue(expectedTotal);

    const result = MovementUtil.getTotalMovements(filter, movements);

    expect(StringUtil.priceFormat).toHaveBeenCalledWith('400.00');
    expect(result).toBe(expectedTotal);
  });

  it('should calculate total for all types', () => {
    const filter = MovementTypeEnum.ALLTYPES;
    const expectedTotal = '200.00';

    (StringUtil.priceFormat as jest.Mock).mockReturnValue(expectedTotal);

    const result = MovementUtil.getTotalMovements(filter, movements);

    expect(StringUtil.priceFormat).toHaveBeenCalledWith('200.00');
    expect(result).toBe(expectedTotal);
  });

  it('should return "0.00" for empty movements array', () => {
    const filter = MovementTypeEnum.ALLTYPES;
    const expectedTotal = '0.00';
    (StringUtil.priceFormat as jest.Mock).mockReturnValue(expectedTotal);

    const result = MovementUtil.getTotalMovements(filter, []);

    expect(StringUtil.priceFormat).toHaveBeenCalledWith('0.00');
    expect(result).toBe(expectedTotal);
  });

  it('should return "0.00" for non-matching filter', () => {
    const filter = MovementTypeEnum.OUTPUT;
    const expectedTotal = '0.00';
    (StringUtil.priceFormat as jest.Mock).mockReturnValue(expectedTotal);

    const result = MovementUtil.getTotalMovements(filter, [
      { id: '1', name: 'Movement 1', description: 'Desc 1', createdAt: '2025-02-01', price: 100, type: MovementTypeEnum.INPUT },
    ]);

    expect(StringUtil.priceFormat).toHaveBeenCalledWith('0.00');
    expect(result).toBe(expectedTotal);
  });
});