import { memo } from "react";

const Loading: React.FC<{
  children: React.ReactNode;
}> = memo(({ children }) => {
  return <div>{children}</div>;
});
Loading.displayName = "Loading";
export default Loading;
