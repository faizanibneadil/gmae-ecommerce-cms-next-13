import { memo } from "react";

const Page: React.FC<{}> = memo(() => {
  return [...Array(20)].map((_, i) => (
    <div key={`transaction-${i}`} className="flex items-center justify-between">
      <div>Tran_Id</div>
      <div>Tran_Items</div>
    </div>
  ));
});

Page.displayName = "Page";
export default Page;
