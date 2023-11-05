"use client";
import ToolBar from "./_components/tool-bar";
import SimpleBar from "simplebar-react";

interface Props {
  children: React.ReactNode;
}

const Template: React.FC<Props> = ({ children }) => {
  return (
    <>
      <ToolBar />
      <SimpleBar style={{ height: `95vh`, width: `100%` }}>
        {children}
      </SimpleBar>
    </>
  );
};

export default Template;
