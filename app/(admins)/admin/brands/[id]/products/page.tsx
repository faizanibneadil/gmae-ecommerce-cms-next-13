import { memo } from "react";

const Page: React.FC<{}> = memo(() => {
  return (
    <div>
      This page will display brands products ad you can directly link and un
      link with this brand in future.
    </div>
  );
});
Page.displayName = "Page";
export default Page;
