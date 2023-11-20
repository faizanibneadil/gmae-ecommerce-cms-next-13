import dynamic from "next/dynamic";
import { _getDistribution } from "@/queries";

const SideBar = dynamic(() => import("./_components/sidebar"), {
  ssr: true,
  loading: () => (
    <div className="w-12 h-screen bg-gray-800 md:w-48 animate-pulse" />
  ),
});

interface Props {
  params: {
    did: string;
  };
  children: React.ReactNode;
}
const Layout: React.FC<Props> = async ({ children, params }) => {
  const distributions = await _getDistribution();
  return (
    <div className="flex">
      <SideBar distributions={distributions} />
      <main className="flex-1 h-screen overflow-hidden">{children}</main>
    </div>
  );
};
export default Layout;
