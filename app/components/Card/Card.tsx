type CardProps = {
  className?: string;
  children?: React.ReactNode;
};

const Card: React.FC<CardProps> = ({ className = "", children }) => (
  <div className={`rounded-xl shadow-3xl p-5 ${className}`}>{children}</div>
);

export default Card;
