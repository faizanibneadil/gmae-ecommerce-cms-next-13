interface Props {
  children: React.ReactNode;
  params: { distributionId: string; inventoryId: string };
}

const Layout: React.FC<Props> = ({ children }) => {
  return children;
};

export default Layout;
