import { ActionButtonProps, ButtonProps } from "./model";
import './index.css';

const Button = ({ handleClick, children, className }: ButtonProps) => (
  <button className={`button ${className || ''}`} onClick={handleClick}>{children}</button>
);

const Action = ({ children, className }: ActionButtonProps) => (
  <div className={`button-action ${className || ''}`}>{children}</div>
);

const Icon = ({ children }: { children?: React.ReactNode }) => (
  <div className="button-icon">{children}</div>
);

Button.Action = Action;
Button.Icon = Icon;

export { Button };