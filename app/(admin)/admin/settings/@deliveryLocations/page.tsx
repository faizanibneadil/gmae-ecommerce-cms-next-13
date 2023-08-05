import { notFound } from "next/navigation";
import LocationsList from "./_components/locations-list";
import { getLocation } from "./_queries";
import AddNewLocationButton from "./_components/add-new-location-button";

interface Props {
  searchParams: { [key: string]: string };
}

const Page = async ({ searchParams }: Props) => {
  const { locations } = await getLocation();
  return (
    <div className="space-y-2">
      <AddNewLocationButton />
      {!!locations?.length ? (
        <LocationsList locations={locations} />
      ) : (
        notFound()
      )}
    </div>
  );
};
export default Page;
