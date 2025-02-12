import { ThemeEnum } from "@/enums/theme.enum";
import { SliceModel } from "@/models/base/slice.model";
import { ThemeModel } from "@/models/theme/theme.model";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: SliceModel<ThemeModel> = {
  entity: {
    theme: ThemeEnum.DARK,
  },
}

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setEntity: (state, action: PayloadAction<ThemeModel>) => {
      state.entity = action.payload;
    }
  }
});

export const { setEntity } = themeSlice.actions;
export const themeReducer = themeSlice.reducer;