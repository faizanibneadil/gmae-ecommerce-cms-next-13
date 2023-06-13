import { prisma } from "@/config/db";
import Carousel from "../components/carousel";
import Description from "../components/description";
import { Badge } from "@tremor/react";


export default async function Page({ params }: { params: { slug: string } }) {
  const product = await prisma.products.findUnique({
    where: {
      slug: params.slug,
    },
  });

  const attributes: any = product?.attributes;

  return (
    <div className="md:mx-52">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2">
          <Carousel images={product?.images} />
        </div>
        <div className="w-full mt-6 md:w-1/2 md:px-4 md:mt-0">
          <h1 className="mb-4 font-bold text-md text-slate-950">
            {product?.title}
          </h1>
          <dl className="space-y-2">
            {attributes?.map((attribute: any) => (
              <>
                <dt>{attribute?.name}</dt>
                <dd><Badge size="md">{attribute?.value}</Badge></dd>
              </>
            ))}
          </dl>
          <Description text={product?.description} />
        </div>
      </div>
    </div>
  );
}
