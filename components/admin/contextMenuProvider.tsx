"use client";
import * as ContextMenu from "@radix-ui/react-context-menu";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import {
  ChevronRightIcon,
  DashboardIcon,
  HamburgerMenuIcon,
  ArchiveIcon,
  LoopIcon
} from "@radix-ui/react-icons";

export default function ContextMenuProvider({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger>{children}</ContextMenu.Trigger>
      <ContextMenu.Portal>
        <ContextMenu.Content alignOffset={5} className="w-40 p-2 text-black rounded bg-warning hover:border-none">
          <ContextMenu.Item>
            <div className="flex items-center justify-between space-x-2">
              <div className="flex items-center space-x-2">
                <div>
                  <LoopIcon className="w-4 h-4" />
                </div>
                <div>Refresh</div>
              </div>
            </div>
          </ContextMenu.Item>
          <ContextMenu.Item>
            <div className="flex items-center justify-between space-x-2">
              <div className="flex items-center space-x-2">
                <div>
                  <LoopIcon className="w-4 h-4" />
                </div>
                <div>Reload</div>
              </div>
            </div>
          </ContextMenu.Item>
          <ContextMenu.Item>
            <div className="flex items-center justify-between space-x-2">
              <div className="flex items-center space-x-2">
                <div>
                  <DashboardIcon />
                </div>
                <div>Dashboard</div>
              </div>
            </div>
          </ContextMenu.Item>
          <ContextMenu.Item>
            <ContextMenu.Sub>
              <ContextMenu.SubTrigger>
                <div className="flex items-center justify-between space-x-2">
                  <div className="flex items-center space-x-2">
                    <div>
                      <HamburgerMenuIcon />
                    </div>
                    <div>Categories</div>
                  </div>
                  <div>
                    <ChevronRightIcon />
                  </div>
                </div>
              </ContextMenu.SubTrigger>
              <ContextMenu.Portal>
                <ContextMenu.SubContent sideOffset={2} alignOffset={-5} className="w-40 p-2 text-black rounded bg-warning hover:border-none">
                  <ContextMenu.Item>New Category</ContextMenu.Item>
                  <ContextMenu.Item>Goto Category</ContextMenu.Item>
                </ContextMenu.SubContent>
              </ContextMenu.Portal>
            </ContextMenu.Sub>
          </ContextMenu.Item>
          <ContextMenu.Item>
            <ContextMenu.Sub>
              <ContextMenu.SubTrigger>
                <div className="flex items-center justify-between space-x-2">
                  <div className="flex items-center space-x-2">
                    <div>
                      <ArchiveIcon />
                    </div>
                    <div>Products</div>
                  </div>
                  <div>
                    <ChevronRightIcon />
                  </div>
                </div>
              </ContextMenu.SubTrigger>
              <ContextMenu.Portal>
                <ContextMenu.SubContent className="w-40 p-2 text-black rounded bg-warning hover:border-none">
                  <ContextMenu.Item>New Product</ContextMenu.Item>
                  <ContextMenu.Item>Goto Products</ContextMenu.Item>
                </ContextMenu.SubContent>
              </ContextMenu.Portal>
            </ContextMenu.Sub>
          </ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  );
}
