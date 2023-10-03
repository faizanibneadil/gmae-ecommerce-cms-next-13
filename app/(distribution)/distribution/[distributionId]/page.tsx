import { memo } from "react";

const Page: React.FC<{
  params: { distributionId: string };
}> = memo(({ params }) => {
  return <div>{params.distributionId}</div>;
});
Page.displayName = "Page";
export default Page;
