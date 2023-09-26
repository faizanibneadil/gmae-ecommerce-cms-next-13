import { memo } from "react";

const NotFound: React.FC<{}> = memo(() => {
  return (
    <div className="flex w-full items-center justify-center">
      Item Not Found
    </div>
  );
});

NotFound.displayName = "NotFound";
export default NotFound;
