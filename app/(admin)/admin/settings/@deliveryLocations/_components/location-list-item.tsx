"use client";
import { TextInput, Button } from "@tremor/react";
import { LocationTypes } from "../_queries";
import { memo, useTransition } from "react";
import {
  deleteDeliveryLocation,
  updateDeliveryLocationAction,
} from "@/_actions";

type TLocation = LocationTypes["locations"][number];
interface Props {
  location: TLocation;
}

const LocationListItem = ({ location }: Props) => {
  const [isUpdating, startUpdate] = useTransition();
  const [isDeleting, startDelete] = useTransition();

  const action = (formData: FormData) => {
    startUpdate(() => updateDeliveryLocationAction(formData));
  };

  const deleteLocation = ({ locationId }: { locationId: string }) => {
    startDelete(() => deleteDeliveryLocation({ locationId }));
  };

  return (
    <form
      action={action}
      className="grid grid-cols-1 gap-2 md:grid-cols-12"
      key={location.id}
    >
      <input type="hidden" value={location.id} name="locationId" />
      <TextInput
        name="location"
        placeholder="Location Ex: Gulberg, Block 18"
        className="rounded-none md:col-span-5"
        defaultValue={location?.location?.toString()}
      />
      <TextInput
        name="LocationRate"
        placeholder="Charges Ex: 57,350,200"
        className="rounded-none md:col-span-5"
        defaultValue={location?.rate?.toString()}
      />
      <div className="flex space-x-2 md:col-span-2">
        <Button
          loading={isUpdating}
          disabled={isUpdating}
          type="submit"
          size="xs"
          className="rounded-none"
        >
          {isUpdating ? `...` : `Update`}
        </Button>
        <Button
          loading={isDeleting}
          disabled={isDeleting}
          onClick={() => deleteLocation({ locationId: location.id })}
          type="button"
          size="xs"
          color="rose"
          className="rounded-none"
        >
          {isDeleting ? `...` : `Delete`}
        </Button>
      </div>
    </form>
  );
};

export default memo(LocationListItem);
