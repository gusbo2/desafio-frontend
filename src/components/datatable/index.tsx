import { Button } from '../button';
import './index.css';

const DataTable = ({ children }: { children?: React.ReactNode }) => (
  <div className="datatable">{children}</div>
);

const Header = ({ children }: { children?: React.ReactNode }) => (
  <div className="datatable-header">{children}</div>
);

const Body = ({ children }: { children?: React.ReactNode }) => (
  <div className="datatable-body">{children}</div>
);

DataTable.Header = Header;
DataTable.Body = Body;

export { DataTable };