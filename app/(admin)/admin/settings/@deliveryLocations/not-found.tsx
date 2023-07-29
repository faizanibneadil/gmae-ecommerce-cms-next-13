import { Callout } from "@tremor/react";
import AddNewLocationButton from "./_components/add-new-location-button";

export default function NotFound() {
  return (
    <Callout title="Not Found.!" color="rose" className="rounded-none">
      Delivery Locations not found. Please create one click on add new location.
      <div className="mt-4">
        <AddNewLocationButton />
      </div>
    </Callout>
  );
}
