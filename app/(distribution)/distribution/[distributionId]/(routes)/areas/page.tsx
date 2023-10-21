import { memo, use } from "react";
import { _getAreas } from "@/queries";
import AreaCard from "./_components/area-card";

interface Props {
  params: { distributionId: string };
}

const Page: React.FC<Props> = memo(({ params }) => {
  const areas = use(_getAreas(params.distributionId));
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
      {areas?.map((area) => (
        <AreaCard key={area.id} {...area} />
      ))}
    </div>
  );
});
Page.displayName = "Page";
export default Page;
