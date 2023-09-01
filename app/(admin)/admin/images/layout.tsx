type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  return <div className="max-w-6xl p-1 mx-auto">{children}</div>;
};

export default Layout;
