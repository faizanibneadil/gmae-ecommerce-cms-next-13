"use client";

import {
  Button,
  Flex,
  Icon,
  List,
  ListItem,
  Text,
  TextInput,
} from "@tremor/react";
import { Field } from "formik";
import { Plus, Trash } from "lucide-react";
import { CornerLeftUp } from "lucide-react";
import { CornerLeftDown } from "lucide-react";

const MyInput = ({ field, form, ...props }: any) => {
  return <TextInput {...field} {...props} />;
};

export default function AttributesForm({ attributes, actions }: any) {
  return (
    <div>
      <List className="mt-4" color="orange">
        {attributes.map((attribute: any, idx: number) => (
          <ListItem key={attribute.id}>
            <Flex
              justifyContent="start"
              className="space-y-2 truncate"
              flexDirection="col"
            >
              <Field
                name={`attributes[${idx}].name`}
                component={MyInput}
                icon={CornerLeftDown}
                placeholder="Attribute Name Ex: Color, Size etc ..."
              />
              <Field
                name={`attributes[${idx}].value`}
                component={MyInput}
                icon={CornerLeftUp}
                placeholder="Attribute value Ex: Blue, Medium etc ..."
              />
            </Flex>
            <Text>
              <Button
                type="button"
                variant="secondary"
                className="p-0 m-0 ml-2"
                onClick={() => actions.remove(idx)}
              >
                <Icon icon={Trash} variant="outlined" tooltip="Delete" />
              </Button>
            </Text>
          </ListItem>
        ))}
      </List>
      <Button
        type="button"
        variant="secondary"
        icon={Plus}
        className="w-full"
        onClick={() =>
          actions.push({
            id: Date.now(),
            name: "",
            value: "",
          })
        }
      >
        Add Attribute
      </Button>
    </div>
  );
}
