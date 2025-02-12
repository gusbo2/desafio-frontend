"use client";

import { Moon, Sun } from '@geist-ui/icons'
import { useAppDispatch, useAppSelector } from "@/database/hooks";
import { Button } from "../button";
import { setEntity } from "@/database/slices/theme.slice";
import { ThemeEnum } from "@/enums/theme.enum";
import { useEffect } from 'react';
import './index.css';

export const ThemeSelector = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(state => state.theme.entity);

  const changeTheme = (): void => {
    dispatch(setEntity({ theme: theme.theme === ThemeEnum.DARK ? ThemeEnum.WHITE : ThemeEnum.DARK }));
  }

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme.theme === ThemeEnum.DARK) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className="theme-selector">
      <Button className='justify-center' handleClick={changeTheme}>
        <Button.Icon>
          {theme.theme === ThemeEnum.WHITE ? <Sun size={20} /> : <Moon size={20} color='white' />}
        </Button.Icon>
      </Button>
    </div>
  );
}