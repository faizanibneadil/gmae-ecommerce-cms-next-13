import { memo } from "react";

const Loading: React.FC<{}> = memo(() => {
  return <div>Loading Shop ...</div>;
});

Loading.displayName = "Loading";
export default Loading;
