const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="max-w-4xl mx-auto">{children}</div>;
};

export default Layout;
