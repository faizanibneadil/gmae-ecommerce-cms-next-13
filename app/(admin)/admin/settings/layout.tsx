import {
  AccordionList,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@tremor/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  deliveryLocations: ReactNode;
}

const Layout = ({ children, deliveryLocations }: Props) => (
  <AccordionList className="max-w-4xl mx-auto">
    <Accordion defaultOpen>
      <AccordionHeader>Delivery Locations</AccordionHeader>
      <AccordionBody className="p-0">{deliveryLocations}</AccordionBody>
    </Accordion>
    <Accordion>
      <AccordionHeader>More Settings.</AccordionHeader>
      <AccordionBody>{children}</AccordionBody>
    </Accordion>
  </AccordionList>
);

export default Layout;
