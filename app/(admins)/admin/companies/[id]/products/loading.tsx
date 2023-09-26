import { memo } from "react";

const Loading: React.FC<{}> = memo(() => {
  return <div>loading Companies products.</div>;
});
Loading.displayName = "Loading";
export default Loading;
