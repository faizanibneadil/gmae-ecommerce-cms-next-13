const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex">
      <div className="w-full mr-0.5">
        <div className="md:mr-[4.2rem] mr-[2.3rem]">{children}</div>
      </div>
    </div>
  );
};
export default Layout;
