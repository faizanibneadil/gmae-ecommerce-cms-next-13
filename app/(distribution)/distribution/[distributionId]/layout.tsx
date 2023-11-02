import Wrapper from "../../_components/wrapper";
import Command from "../../_components/cmd/command";
import SideBar from "./_components/sidebar";

interface Props {
  params: {
    distributionId: string;
  };
  children: React.ReactNode;
}
const Layout: React.FC<Props> = ({ children, params }) => {
  return (
    <div className="flex">
      <SideBar />
      <main className="flex-1 h-screen overflow-hidden">{children}</main>
    </div>
    // <Wrapper>
    //   <Command />
    //   {children}
    // </Wrapper>
  );
};
export default Layout;
