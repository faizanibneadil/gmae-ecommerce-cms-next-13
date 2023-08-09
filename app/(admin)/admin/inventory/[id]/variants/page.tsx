import { cache, use } from "react";
import SearchForm from "./_components/search-form";
import { prisma } from "@/config/db";
import { Table, TableBody, TableCell, TableRow } from "@tremor/react";
import ConnectVariant from "./_components/connect-button";

interface Props {
  searchParams: { [key: string]: string };
  params: { id: string };
}

const getProducts = cache(async (searchString: string, id: string) => {
  const products = await prisma.products.findMany({
    select: {
      id: true,
      title: true,
    },
    where: {
      title: { search: searchString.split(" ").join(" | ") },
    },
  });
  return products;
});
const Page: React.FC<Props> = ({ searchParams, params }) => {
  const products = use(getProducts(searchParams?.query, params.id));
  return (
    <div>
      <SearchForm />
      <div className="mt-2">
        <Table className="mt-5">
          <TableBody>
            {products?.map((item) => {
              return (
                <TableRow key={item.id}>
                  <TableCell className="p-1.5">{item.title}</TableCell>
                  <TableCell className="p-1.5">
                    <ConnectVariant
                      props={{ productId: params.id, variantId: item.id }}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Page;
