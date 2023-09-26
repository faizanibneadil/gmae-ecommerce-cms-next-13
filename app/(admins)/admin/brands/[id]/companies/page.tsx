import { memo } from "react";

const Page: React.FC<{}> = memo(() => {
  return (
    <div>
      This page will display companies and you can attach with this brand in
      future.
    </div>
  );
});
Page.displayName = "Page";
export default Page;
