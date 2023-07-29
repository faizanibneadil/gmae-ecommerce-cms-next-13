import { memo } from "react";
import { LocationTypes } from "../_queries";
import LocationListItem from "./location-list-item";
import { notFound } from "next/navigation";

type TLocations = LocationTypes["locations"];

interface Props {
  locations: TLocations;
}

const LocationsList = ({ locations }: Props) => {
  return (
    <div className="pb-2 space-y-1">
      {locations?.map((location) => (
        <LocationListItem key={location.id} location={location} />
      ))}
    </div>
  );
};
export default memo(LocationsList);
