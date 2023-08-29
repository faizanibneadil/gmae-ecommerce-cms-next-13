const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="max-w-6xl p-1 mx-auto">
      <div>{children}</div>
    </div>
  );
};
export default Layout;
