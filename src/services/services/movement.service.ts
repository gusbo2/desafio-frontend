import { IMovementRepository } from "@/api/interfaces/imovement.repository";
import { IMovementService } from "../interfaces/imovement.service";
import { MovementRepository } from "@/api/repositories/movement.repository";
import { DeleteParameters, FindParameters, ListParameters, SaveParameters } from "@/models/movement/service.model";
import { MovementModel } from "@/models/movement/movement.model";
import { MovementFilterModel } from "@/models/movement/movement_filter.model";
import { OrderEnum } from "@/enums/order.enum";

export class MovementService implements IMovementService {
  private readonly _repository: IMovementRepository;

  constructor() {
    this._repository = new MovementRepository();
  }

  public async create({ model, callback, error }: SaveParameters): Promise<void> {
    try {
      const validation = this.validate(model);
      if (validation.isvalid) {
        const response = await this._repository.create(model);
        callback(response);
      } else {
        error(validation.message);
      }
    } catch {
      error('Não foi possivel criar a movimentação!');
    }
  }

  public async update({ model, callback, error }: SaveParameters): Promise<void> {
    try {
      const validation = this.validate(model);
      if (validation.isvalid) {
        const response = await this._repository.update(model.id, model);
        callback(response);
      } else {
        error(validation.message);
      }
    } catch {
      error('Não foi possivel atualizar a movimentação!');
    }
  }

  public async find({ id, callback, error }: FindParameters): Promise<void> {
    try {
      const response = await this._repository.find(id);
      if (response) {
        callback(response);
      } else {
        error('Não foi possivel localizar a movimentação!');
      }
    } catch {
      error('Não foi possivel localizar a movimentação!');
    }
  }

  public async delete({ id, error, callback }: DeleteParameters): Promise<void> {
    try {
      const response = await this._repository.delete(id);
      if (response) {
        callback(id, 'Movimentação removida com sucesso!');
      } else {
        error('Não foi possivel remover a movimentação!');
      }
    } catch {
      error('Não foi possivel remover a movimentação!');
    }
  }

  public async list({ filter, order, callback, error }: ListParameters): Promise<void> {
    try {
      let response = await this._repository.list();
      if (response) {
        response = this.filterMovements(filter, response);
        response = this.orderMovements(order, response);
        callback(response);
      } else {
        error('Não foi possivel listar as movimentações!');
      }
    } catch {
      error('Não foi possivel listar as movimentações!');
    }
  }

  private validate(model: MovementModel): { isvalid: boolean, message: string } {
    console.log(model);

    if (!model.createdAt || model.createdAt === '') {
      return { isvalid: false, message: 'Data inválida!' };
    }
    if (!model.name) {
      return { isvalid: false, message: 'O nome é obrigatório!' };
    }
    if (model.price == 0) {
      return { isvalid: false, message: 'O valor é obrigatório!' };
    }
    return { isvalid: true, message: '' };
  }

  private filterMovements = (filter: MovementFilterModel, movements: MovementModel[]): MovementModel[] => {
    if (filter.createdAt) {
      movements = movements.filter(item => item.createdAt === filter.createdAt);
    }
    if (filter.name) {
      movements = movements.filter(item => item.name.toLowerCase().includes(filter.name!.toLowerCase()));
    }
    if (filter.price) {
      movements = movements.filter(item => item.price == filter.price);
    }
    if (filter.type) {
      movements = movements.filter(item => item.type == filter.type);
    }

    return movements;
  }

  private orderMovements = (order: OrderEnum, movements: MovementModel[]): MovementModel[] => {
    switch (order) {
      case OrderEnum.NAME_ASC:
        return movements.sort((a, b) => a.name.localeCompare(b.name));
      case OrderEnum.NAME_DSC:
        return movements.sort((a, b) => b.name.localeCompare(a.name));
      case OrderEnum.CREATEDAT_ASC:
        return movements.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      case OrderEnum.CREATEDAT_DSC:
        return movements.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      case OrderEnum.VALUE_ASC:
        return movements.sort((a, b) => b.price - a.price);
      case OrderEnum.VALUE_DSC:
        return movements.sort((a, b) => a.price - b.price);
    }
  }
}