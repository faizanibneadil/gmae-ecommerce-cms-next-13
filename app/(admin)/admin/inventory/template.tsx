"use client";

import { useParams } from "next/navigation";
import InitializeNewInventory from "./_components/initialize-new-inventory";
import RefreshPage from "./_components/refresh-button";
import {
  Activity,
  AreaChart,
  ImagePlus,
  ListTree,
  PackagePlus,
  PackageSearch,
} from "lucide-react";
import Link from "next/link";
import { Icon } from "@tremor/react";

interface Props {
  children: React.ReactNode;
}

const Template: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const params = useParams();
  return params?.id ? (
    <div>
      <div className="fixed top-0 bottom-0 right-0 z-50 flex flex-col items-center justify-center h-full p-1 space-y-2 bg-white border-l md:px-3">
        <Link href={`/admin/inventory/${params?.id}/images`}>
          <Icon tooltip="Add or remove images" icon={ImagePlus} />
        </Link>
        <Link href={`/admin/inventory/${params?.id}/variants`}>
          <Icon tooltip="Add Variants" icon={PackagePlus} />
        </Link>
        <Link href={`/admin/inventory/${params?.id}/attributes`}>
          <Icon tooltip="add properties" icon={ListTree} />
        </Link>
        <Link href={`/admin/inventory/${params?.id}/seo`}>
          <Icon tooltip="Search Engine Optimization" icon={PackageSearch} />
        </Link>
        <Link href={`/admin/inventory/${params?.id}/reports`}>
          <Icon tooltip="Analytics" icon={AreaChart} />
        </Link>
      </div>
      {children}
    </div>
  ) : (
    <div>
      <div className="fixed top-0 bottom-0 right-0 z-50 flex flex-col items-center justify-center h-full p-1 space-y-2 bg-white border-l md:px-3">
        <InitializeNewInventory />
        <RefreshPage />
      </div>
      {children}
    </div>
  );
};

export default Template;
