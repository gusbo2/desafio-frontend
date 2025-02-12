import './index.css';

const Input = ({ children }: { children?: React.ReactNode }) => (
  <div className="input">{children}</div>
);

const Label = ({ children }: { children?: React.ReactNode }) => (
  <label className="input-label">{children}</label>
);

const Content = ({ children }: { children?: React.ReactNode }) => (
  <div className="input-content">{children}</div>
);

Input.Label = Label;
Input.Content = Content;

export { Input };