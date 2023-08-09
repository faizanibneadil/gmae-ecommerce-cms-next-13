"use client";

import { PlusIcon } from "@/app/_components/icons";
import {
  Button,
  Icon,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Title,
} from "@tremor/react";
import AttributeItemForm from "./attribute-item-form";
import { useTransition } from "react";
import { initAttribute } from "@/_actions";
import Spin from "@/app/_components/loading-spinner";
import { useRouter } from "next/navigation";

type TAttribute = {
  id: string;
  name: string | null;
  value: string | null;
  productId: string | null;
};

interface Props {
  props: {
    productId: string;
    attributes: TAttribute[];
  };
}

const AttributesForm: React.FC<Props> = ({ props }) => {
  const { refresh } = useRouter();
  const [initializing, init] = useTransition();
  const action = () => {
    return init(() => {
      initAttribute({ productId: props.productId });
      refresh();
    });
  };
  return (
    <div className="mt-4">
      <div className="flex items-center justify-between">
        <Title>Attributes</Title>
        <Button onClick={action} variant="light">
          <Icon icon={initializing ? Spin : PlusIcon} variant="shadow" />
        </Button>
      </div>
      <Table>
        <TableBody>
          {props?.attributes?.map((attribute) => (
            <TableRow key={attribute.id}>
              <TableCell className="p-0.5">
                <AttributeItemForm
                  key={attribute.id}
                  props={{ productId: props.productId, attribute }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
export default AttributesForm;
