"use client";

import useCart from "@/store/cart-store";
import { SearchSelect, SearchSelectItem, Text } from "@tremor/react";
import { memo } from "react";

interface Props {
  props: {
    locations: {
      id: string;
      location: string | null;
      rate: number | null;
    }[];
  };
}

const Locations: React.FC<Props> = memo(({ props }) => {
  const setLocation = useCart((state) => state.setLocation);
  const location = useCart((state) => state.location);
  return (
    <div className="mt-1">
      <Text>Choose Location.</Text>
      <SearchSelect
        value={location.toString()}
        onValueChange={(value) => setLocation(value)}
      >
        {props.locations.map((location) => (
          <SearchSelectItem key={location.id} value={`${location.rate}`}>
            {location?.location}
          </SearchSelectItem>
        ))}
      </SearchSelect>
    </div>
  );
});
Locations.displayName = "Locations";
export default Locations;
