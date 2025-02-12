"use client";

import { Button, FloatButton, Input, MovementType, Total } from "@/components";
import { DataTable } from "@/components/datatable";
import { useAppDispatch, useAppSelector } from "@/database/hooks";
import { clearState, deleteEntity, setEntity, setList } from "@/database/slices/movement.slice";
import { FilterTypeEnum } from "@/enums/filter_type.enum";
import { MovementTypeEnum } from "@/enums/movement_type.enum";
import { OrderEnum } from "@/enums/order.enum";
import { RouteEnum } from "@/enums/route.enum";
import { MovementModel } from "@/models/movement/movement.model";
import { MovementFilterModel } from "@/models/movement/movement_filter.model";
import { IMovementService } from "@/services/interfaces/imovement.service";
import { MovementService } from "@/services/services/movement.service";
import { MovementUtil } from "@/utils/movement.util";
import { StringUtil } from "@/utils/string.util";
import { ChevronDown, ChevronUp, ChevronUpDown, Edit, Plus, Trash2 } from "@geist-ui/icons";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

export default function Home() {
  const route = useRouter();
  const dispatch = useAppDispatch();
  const movements = useAppSelector(state => state.movement.list);
  const _service: IMovementService = new MovementService();

  const [filterType, setFilterType] = useState(FilterTypeEnum.NAME);
  const [nameOrPrice, setNameOrPrice] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [movementType, setMovementType] = useState(MovementTypeEnum.ALLTYPES);
  const [order, setOrder] = useState(OrderEnum.NAME_ASC);

  useEffect(() => {
    getMovements();
  }, [nameOrPrice, createdAt, movementType, order]);

  const changeFilterType = (event: ChangeEvent<HTMLSelectElement>) => {
    const type = Number(event.target.value) as FilterTypeEnum;
    setFilterType(type);
    setNameOrPrice('');
  }

  const changeNameOrPrice = (event: ChangeEvent<HTMLInputElement>) => {
    if (filterType === FilterTypeEnum.VALUE) {
      const value = StringUtil.stringToPriceKeepingCommas(event.target.value);
      setNameOrPrice(value);
    } else {
      setNameOrPrice(event.target.value);
    }
  }

  const changeCreatedAt = (event: ChangeEvent<HTMLInputElement>) => {
    setCreatedAt(event.target.value);
  }

  const changeMovementType = (event: ChangeEvent<HTMLSelectElement>) => {
    const type: MovementTypeEnum = Number(event.target.value) as MovementTypeEnum;
    setMovementType(type);
  }

  const getMovements = async (): Promise<void> => {
    const filter: MovementFilterModel = {
      name: filterType == FilterTypeEnum.NAME ? nameOrPrice : undefined,
      type: movementType !== MovementTypeEnum.ALLTYPES ? movementType : undefined,
      createdAt: createdAt || undefined,
      price: filterType == FilterTypeEnum.VALUE ? StringUtil.stringToPrice(nameOrPrice) : undefined,
    };
    await _service.list({ order, filter, callback: callbackList, error: callbackError });
  }

  const newMovement = (): void => {
    dispatch(clearState());
    route.push(RouteEnum.MOVIMENT);
  }

  const editMovement = async (id: string): Promise<void> => {
    await _service.find({ id, callback: callbackFind, error: callbackError });
  }

  const deleteMovement = async (id: string): Promise<void> =>
    await _service.delete({ id, error: callbackError, callback: callbackDelete });

  const callbackFind = (data?: MovementModel): void => {
    if (data) {
      dispatch(setEntity(data));
      route.push(RouteEnum.MOVIMENT);
    }
  }

  const callbackList = (data: MovementModel[]): void => {
    dispatch(clearState());
    dispatch(setList(data));
  }

  const callbackDelete = (id: string, message: string): void => {
    dispatch(deleteEntity(id));
    alert(message);
  }

  const callbackError = (message: string) => alert(message);

  const getHeaderIcons = (orderAsc: OrderEnum, orderDsc: OrderEnum): React.ReactNode => {
    if (order === orderAsc) {
      return <ChevronUp size={20} />;
    } else if (order === orderDsc) {
      return <ChevronDown size={20} />;
    } else {
      return <ChevronUpDown size={20} />;
    }
  }

  const changeOrderAndIcons = (orderAsc: OrderEnum, orderDsc: OrderEnum): void => {
    if (order === orderAsc) {
      setOrder(orderDsc);
    } else {
      setOrder(orderAsc);
    }
  }

  return (
    <main className="content">
      <FloatButton>
        <Button handleClick={newMovement}>
          <Button.Icon>
            <Plus size={40} />
          </Button.Icon>
        </Button>
      </FloatButton>
      <div className="row">
        <div className="col-span-1">
          <Input>
            <Input.Content>
              <select value={filterType} onChange={changeFilterType}>
                <option value={FilterTypeEnum.NAME}>Nome</option>
                <option value={FilterTypeEnum.VALUE}>Preço</option>
              </select>
            </Input.Content>
          </Input>
        </div>
        <div className="col-span-7">
          <Input>
            <Input.Content>
              <input
                type="text"
                className={filterType == FilterTypeEnum.VALUE ? "text-right" : ""}
                value={nameOrPrice}
                onChange={changeNameOrPrice}
              />
            </Input.Content>
          </Input>
        </div>
        <div className="col-span-2">
          <Input>
            <Input.Content>
              <input
                type="date"
                value={createdAt}
                onChange={changeCreatedAt}
              />
            </Input.Content>
          </Input>
        </div>
        <div className="col-span-2">
          <Input>
            <Input.Content>
              <select value={movementType} onChange={changeMovementType}>
                <option value={MovementTypeEnum.ALLTYPES}>Entradas e Saídas</option>
                <option value={MovementTypeEnum.INPUT}>Entradas</option>
                <option value={MovementTypeEnum.OUTPUT}>Saídas</option>
              </select>
            </Input.Content>
          </Input>
        </div>
      </div>
      <div className="row border border-b-textSecondary-light"></div>
      <div className="row">
        <div className="col-span-4">
          <Total>
            <Total.Description className="total-input">
              <h1 className="font-sans text-lg">Entradas</h1>
            </Total.Description>
            <h1>{MovementUtil.getTotalMovements(MovementTypeEnum.INPUT, movements)}</h1>
          </Total>
        </div>
        <div className="col-span-4">
          <Total>
            <Total.Description className="total-output">
              <h1 className="font-sans text-lg">Saídas</h1>
            </Total.Description>
            <h1>{MovementUtil.getTotalMovements(MovementTypeEnum.OUTPUT, movements)}</h1>
          </Total>
        </div>
        <div className="col-span-4">
          <Total>
            <Total.Description className="total-input-output">
              <h1 className="font-sans text-lg">Total</h1>
            </Total.Description>
            <h1>{MovementUtil.getTotalMovements(MovementTypeEnum.ALLTYPES, movements)}</h1>
          </Total>
        </div>
      </div>
      <div className="row border border-b-textSecondary-light"></div>
      <div className="row">
        <div className="col-span-12">
          <DataTable>
            <DataTable.Header>
              <div className="col-span-5">
                <Button handleClick={() => changeOrderAndIcons(OrderEnum.NAME_ASC, OrderEnum.NAME_DSC)}>
                  <Button.Icon>
                    {getHeaderIcons(OrderEnum.NAME_ASC, OrderEnum.NAME_DSC)}
                  </Button.Icon>
                  <div className="mx-1">Nome</div>
                </Button>
              </div>
              <div className="col-span-2">
                <Button className="justify-center" handleClick={() => changeOrderAndIcons(OrderEnum.CREATEDAT_ASC, OrderEnum.CREATEDAT_DSC)}>
                  <Button.Icon>
                    {getHeaderIcons(OrderEnum.CREATEDAT_ASC, OrderEnum.CREATEDAT_DSC)}
                  </Button.Icon>
                  <div className="mx-1">Data</div>
                </Button>
              </div>
              <div className="col-span-2 text-center">Tipo</div>
              <div className="col-span-2">
                <Button className="justify-end" handleClick={() => changeOrderAndIcons(OrderEnum.VALUE_ASC, OrderEnum.VALUE_DSC)}>
                  <Button.Icon>
                    {getHeaderIcons(OrderEnum.VALUE_ASC, OrderEnum.VALUE_DSC)}
                  </Button.Icon>
                  <div className="mx-1">Valor</div>
                </Button>
              </div>
              <div className="col-span-1 text-center">Ações</div>
            </DataTable.Header>
            <DataTable.Body>
              {movements.map((item, index) => (
                <div className="row" key={index}>
                  <div className="col-span-5"><p>{item.name}</p></div>
                  <div className="col-span-2 text-center"><p>{StringUtil.formatDate(item.createdAt)}</p></div>
                  <div className="col-span-2 flex justify-center"><MovementType type={item.type} /></div>
                  <div className="col-span-2 text-right"><p>{StringUtil.priceFormat(item.price.toFixed(2))}</p></div>
                  <div className="flex items-center justify-around col-span-1 mx-2">
                    <Button handleClick={() => editMovement(item.id)}>
                      <Button.Icon>
                        <div className="text-primary-dark">
                          <Edit width={20} />
                        </div>
                      </Button.Icon>
                    </Button>
                    <Button handleClick={() => deleteMovement(item.id)}>
                      <Button.Icon>
                        <div className="text-red-600">
                          <Trash2 width={20} />
                        </div>
                      </Button.Icon>
                    </Button>
                  </div>
                </div>
              ))}
            </DataTable.Body>
          </DataTable>
        </div>
      </div>
    </main>
  );
}
