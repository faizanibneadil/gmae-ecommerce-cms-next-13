import { prisma } from "@/config/db";
import { Table, TableBody, TableCell, TableRow } from "@tremor/react";
import { cache, use } from "react";
import DisconnectVariant from "./disconnect-button";

interface Props {
  props: { productId: string };
}

const getVariants = cache(async (id: string) => {
  const variants = await prisma.products.findMany({
    select: { variants: { select: { id: true, title: true } } },
    where: { id },
  });
  return variants;
});

const VariantsLists: React.FC<Props> = ({ props }) => {
  const variants = use(getVariants(props.productId));
  return (
    <Table className="mt-5">
      <TableBody>
        {variants.map((variant) =>
          variant.variants.map((v) => (
            <TableRow key={v.id}>
              <TableCell className="p-1.5">{v.title}</TableCell>
              <TableCell className="p-1.5">
                <DisconnectVariant
                  props={{ productId: props.productId, variantId: v.id }}
                />
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};
export default VariantsLists;
