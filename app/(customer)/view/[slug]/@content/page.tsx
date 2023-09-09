import { prisma } from "@/config/db";
import { cache, memo, use } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/authOptions";

const getProperties = cache(async ({ slug }: { slug: string }) => {
  const properties = await prisma.products.findUnique({
    select: {
      title: true,
      description: true,
    },
    where: {
      slug: slug,
    },
  });

  return properties;
});

const Page: React.FC<{
  params: { slug: string };
}> = memo(({ params }) => {
  const session = use(getServerSession(authOptions));

  const properties = use(getProperties({ slug: params?.slug }));
  return (
    <>
      <h1 className="text-xl font-semibold leading-tight">
        {properties?.title}
      </h1>
      <p className="text-md">{properties?.description}</p>
    </>
  );
});

Page.displayName = "Page";
export default Page;
