import { memo } from "react";
import Menu from "./menu";

const Wrapper: React.FC<{
  children: React.ReactNode;
}> = memo(({ children }) => {
  return (
    <div>
      <Menu />
      <div className="border-t">
        <div className="h-full max-w-3xl p-1 mx-auto">{children}</div>
      </div>
    </div>
  );
});
Wrapper.displayName = "Wrapper";
export default Wrapper;
