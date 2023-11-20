import { memo } from "react";

const Loading: React.FC<{}> = memo(() => {
  return <div>Loading New Customer form ...</div>;
});

Loading.displayName = "Loading";
export default Loading;
