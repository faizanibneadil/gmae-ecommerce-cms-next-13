import AuthButton from "@/app/_components/auth";
import { memo } from "react";

const Page: React.FC<{}> = memo(() => {
  return <AuthButton />;
});

Page.displayName = "Page";
export default Page;
