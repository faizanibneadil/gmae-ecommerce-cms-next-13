import { memo } from "react";

const Loading: React.FC<{}> = memo(() => {
  return <div>Loading User Profile ...</div>;
});

Loading.displayName = "Loading";
export default Loading;
