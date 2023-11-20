interface Props {
  children: React.ReactNode;
  params: { did: string; inventoryId: string };
}

const Layout: React.FC<Props> = ({ children }) => {
  return children;
};

export default Layout;
