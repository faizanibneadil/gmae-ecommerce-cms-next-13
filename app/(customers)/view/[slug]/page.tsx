import { cache, use } from "react";
import { prisma } from "@/config/db";
import { Card } from "@/components/ui/card";

const getProperties = cache(async ({ slug }: { slug: string }) => {
  const properties = await prisma.products.findUnique({
    select: {
      description: true,
      Attributes: { select: { id: true, name: true, value: true } },
    },
    where: {
      slug: slug,
    },
  });

  return properties;
});

const Page: React.FC<{ params: { slug: string } }> = ({ params }) => {
  const properties = use(getProperties({ slug: params.slug }));
  return (
    <div className="mt-2">
      <h2 className="font-semibold border-b text-md">Description.</h2>
      <div className="text-md">{properties?.description}</div>
      {!!properties?.Attributes.length && (
        <>
          <h2 className="mt-4 font-semibold text-md">Configurations.</h2>
          <Card>
            <div className="flex flex-col divide-y">
              {properties?.Attributes.map((at) => (
                <div
                  key={at.id}
                  className="flex flex-row items-center justify-between px-4 py-2"
                >
                  <div>{at.name}</div>
                  <div>{at.value}</div>
                </div>
              ))}
            </div>
          </Card>
        </>
      )}
    </div>
  );
};

export default Page;
