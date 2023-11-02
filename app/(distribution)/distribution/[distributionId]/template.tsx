"use client";

import { ScrollArea } from "@/components/ui/scroll-area";

import { Suspense } from "react";
import ToolBar from "./_components/tool-bar";

interface Props {
  children: React.ReactNode;
}

const Template: React.FC<Props> = ({ children }) => {
  return (
    <Suspense fallback={<div>fallback Loading ...</div>}>
      <ToolBar />
      <ScrollArea className="w-full h-full px-4 pt-4 pb-10">
        {children}
      </ScrollArea>
    </Suspense>
  );
};

export default Template;
