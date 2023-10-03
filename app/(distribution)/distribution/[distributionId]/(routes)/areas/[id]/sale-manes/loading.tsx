import { memo } from "react";

const Loading: React.FC<{}> = memo(() => {
  return <div>Loading Shops ...</div>;
});

Loading.displayName = "Loading";
export default Loading;
