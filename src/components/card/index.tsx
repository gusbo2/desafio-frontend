import './index.css';

const Card = ({ children }: { children?: React.ReactNode }) => (
  <div className="card">{children}</div>
);

const Header = ({ children }: { children?: React.ReactNode }) => (
  <div className="card-header">{children}</div>
);

const Content = ({ children }: { children?: React.ReactNode }) => (
  <div className="card-content">{children}</div>
);

const ContentItem = ({ children }: { children?: React.ReactNode }) => (
  <div className="card-content-item">{children}</div>
);

Content.Item = ContentItem;
Card.Header = Header;
Card.Content = Content;

export { Card };