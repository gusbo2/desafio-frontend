import './index.css';
import { TotalDescriptionProps } from './model';

const Total = ({ children }: { children: React.ReactNode }) => (
  <div className="total">{children}</div>
);

const Description = ({ children, className }: TotalDescriptionProps) => (
  <div className="total-description">
    <div className={`total-description-tag ${className || ''}`}></div>
    {children}
  </div>
);

Total.Description = Description;

export { Total };