import { MovementTypeEnum } from "@/enums/movement_type.enum";
import { MovementModel } from "@/models/movement/movement.model";
import { MovementSliceModel } from "@/models/movement/movement_slice.model";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: MovementSliceModel = {
  list: [],
  entity: {
    id: "",
    name: "",
    description: "",
    createdAt: "",
    price: 0,
    type: MovementTypeEnum.ALLTYPES,
  }
}

const movementSlice = createSlice({
  name: "movements",
  initialState,
  reducers: {
    setList: (state, action: PayloadAction<MovementModel[]>) => {
      action.payload.forEach(item => state.list.push(item));
    },
    setEntity: (state, action: PayloadAction<MovementModel>) => {
      state.entity = action.payload;
    },
    clearState: (state) => {
      state.list = [];
      state.entity = initialState.entity;
    },
    deleteEntity: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter(item => item.id !== action.payload);
    },
    editEntity: (state, action: PayloadAction<MovementModel>) => {
      state.list = state.list.map(item => {
        if (item.id !== action.payload.id) {
          return item;
        }
        return action.payload;
      });
    }
  }
});

export const { clearState, setEntity, setList, deleteEntity, editEntity } = movementSlice.actions;
export const movementReducer = movementSlice.reducer;