import { memo } from "react";

const Wrapper: React.FC<{
  children: React.ReactNode;
}> = memo(({ children }) => {
  return (
    <div className="flex flex-col max-w-3xl p-2 mx-auto space-y-1">
      {children}
    </div>
  );
});
Wrapper.displayName = "Wrapper";
export default Wrapper;
