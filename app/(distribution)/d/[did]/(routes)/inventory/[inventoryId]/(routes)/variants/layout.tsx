interface Props {
  params: { id: string };
  children: React.ReactNode;
}
const Layout: React.FC<Props> = ({ params, children }) => {
  return <div className="mt-2">{children}</div>;
};

export default Layout;
