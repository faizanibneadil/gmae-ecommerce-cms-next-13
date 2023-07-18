import { Attributes } from "@prisma/client";
import { Card, List, ListItem, Title } from "@tremor/react";
import { FC, memo } from "react";

type TAttributes = {
  id: string;
  name: string;
  value: string;
};

interface Props {
  attributes: TAttributes[] | null;
}

const AttributesList: FC<Props> = ({ attributes }) => {
  return (
    <Card className="w-full">
      <Title>Product Attributes</Title>
      <List>
        {attributes?.map((attribute) => (
          <ListItem key={attribute.id}>
            <span>{attribute.name}</span>
            <span>{attribute.value}</span>
            <span>Edit - Delete</span>
          </ListItem>
        ))}
      </List>
    </Card>
  );
};

export default memo(AttributesList);
