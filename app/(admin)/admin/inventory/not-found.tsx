import { Callout } from "@tremor/react";
import InitializeNewInventory from "./_components/initialize-new-inventory";
import RefreshPage from "./_components/refresh-button";

export default function NotFound() {
  return (
    <div>
      <div className="flex justify-end mb-4 space-x-2">
        <InitializeNewInventory />
        <RefreshPage />
      </div>

      <Callout className="w-full" title="Products not found." color="rose">
        Products are not found. Please create click on Create Product button.
      </Callout>
    </div>
  );
}
