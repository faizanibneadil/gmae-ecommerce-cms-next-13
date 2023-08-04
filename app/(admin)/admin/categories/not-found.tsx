import { Callout } from "@tremor/react";
import InitializeNewCategory from "./_components/initialize-new-category";
import RefreshPage from "./_components/refresh-button";

export default function NotFound() {
  return (
    <div>
      <div className="flex justify-end mb-4 space-x-2">
        <InitializeNewCategory />
        <RefreshPage />
      </div>

      <Callout className="w-full" title="Categories not found." color="rose">
        Categories are not found. Please create click on Create Category button.
      </Callout>
    </div>
  );
}
