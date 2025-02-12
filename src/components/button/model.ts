import { MouseEventHandler } from "react";

export interface ButtonProps {
  children?: React.ReactNode;
  className?: string,
  handleClick: MouseEventHandler<HTMLButtonElement>;
}

export interface ActionButtonProps {
  children?: React.ReactNode;
  className?: string;
}