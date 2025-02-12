"use client";

import { Button, Input } from "@/components";
import { useAppDispatch, useAppSelector } from "@/database/hooks";
import { clearState, setEntity } from "@/database/slices/movement.slice";
import { MovementTypeEnum } from "@/enums/movement_type.enum";
import { RouteEnum } from "@/enums/route.enum";
import { MovementModel } from "@/models/movement/movement.model";
import { IMovementService } from "@/services/interfaces/imovement.service";
import { MovementService } from "@/services/services/movement.service";
import { StringUtil } from "@/utils/string.util";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { v4 as uuid } from 'uuid';

export default function Home() {
  const route = useRouter();
  const dispatch = useAppDispatch();
  const movement = useAppSelector(state => state.movement.entity);
  const _service: IMovementService = new MovementService();

  const [value, setValue] = useState(movement.price.toFixed(2));

  const setName = (event: ChangeEvent<HTMLInputElement>): void => {
    dispatch(setEntity({ ...movement, name: event.target.value }));
  }

  const setCreatedAt = (event: ChangeEvent<HTMLInputElement>): void => {
    dispatch(setEntity({ ...movement, createdAt: event.target.value || '' }));
  }

  const setPrice = (event: ChangeEvent<HTMLInputElement>): void => {
    const value = StringUtil.stringToPriceKeepingCommas(event.target.value);
    const price = StringUtil.stringToPrice(value);
    setValue(value);
    dispatch(setEntity({ ...movement, price: price, type: price > 0 ? MovementTypeEnum.INPUT : MovementTypeEnum.OUTPUT }));
  }

  const setDescription = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    dispatch(setEntity({ ...movement, description: event.target.value }));
  }

  const save = async () => {
    if (movement.id !== '') {
      await _service.update({ model: movement, callback: callbackSave, error: callbackError });
    } else {
      await _service.create({ model: { ...movement, id: uuid() }, callback: callbackSave, error: callbackError });
    }
  }

  const callbackSave = (model?: MovementModel) => {
    if (model) {
      dispatch(clearState());
      route.push(RouteEnum.HOME);
    }
  }

  const callbackError = (message: string) => alert(message);

  return (
    <main className="content">
      <div className="row">
        <div className="col-span-4 sm:col-span-8 md:col-span-6">
          <Input>
            <Input.Label>Nome</Input.Label>
            <Input.Content>
              <input type="text" value={movement.name} onChange={setName} />
            </Input.Content>
          </Input>
        </div>
        <div className="col-span-2 sm:col-span-4 md:col-span-3">
          <Input>
            <Input.Label>Data</Input.Label>
            <Input.Content>
              <input type="date" value={movement.createdAt} onChange={setCreatedAt} />
            </Input.Content>
          </Input>
        </div>
        <div className="col-span-2 sm:col-span-4 md:col-span-3">
          <Input>
            <Input.Label>Valor</Input.Label>
            <Input.Content>
              <input className="text-right" type="text" value={value} onChange={setPrice} />
            </Input.Content>
          </Input>
        </div>
      </div>
      <div className="row">
        <div className="col-span-4 sm:col-span-8 md:col-span-12">
          <Input>
            <Input.Label>Descrição</Input.Label>
            <Input.Content>
              <textarea value={movement.description} onChange={setDescription} />
            </Input.Content>
          </Input>
        </div>
      </div>
      <div className="row">
        <div className="col-span-1 md:col-span-3"></div>
        <div className="col-span-2 sm:col-span-3">
          <Button handleClick={route.back}>
            <Button.Action className="secondary">
              <h1>Cancelar</h1>
            </Button.Action>
          </Button>
        </div>
        <div className="col-span-1 sm:hidden"></div>
        <div className="col-span-1 sm:hidden"></div>
        <div className="col-span-2 sm:col-span-3">
          <Button handleClick={save}>
            <Button.Action className="primary">
              <h1>Salvar</h1>
            </Button.Action>
          </Button>
        </div>
      </div>
    </main>
  );
}