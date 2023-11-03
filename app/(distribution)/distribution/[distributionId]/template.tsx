"use client";
import ToolBar from "./_components/tool-bar";

interface Props {
  children: React.ReactNode;
}

const Template: React.FC<Props> = ({ children }) => {
  return (
    <div>
      <ToolBar />
      <div className="w-full h-[calc(100vh-33px)] overflow-x-auto overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default Template;
