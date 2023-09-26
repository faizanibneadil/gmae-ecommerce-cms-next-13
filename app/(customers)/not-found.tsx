import { memo } from "react";

const NotFound: React.FC<{}> = memo(() => {
  return <div>Products Not Found ...</div>;
});

NotFound.displayName = "NotFound";
export default NotFound;
