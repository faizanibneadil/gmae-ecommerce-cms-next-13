import { memo } from "react";

const Loading: React.FC<{}> = memo(() => {
  return <div>Loading Order ...</div>;
});

Loading.displayName = "Loading";
export default Loading;
