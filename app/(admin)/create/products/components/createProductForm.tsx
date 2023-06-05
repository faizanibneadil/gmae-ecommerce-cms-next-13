"use client";
import * as React from "react";
import TextareaAutosize from "react-textarea-autosize";
import {
  Button,
  Card,
  Col,
  Dropdown,
  DropdownItem,
  Flex,
  Grid,
  Text,
  Title,
} from "@tremor/react";
import { UploadCloud } from "lucide-react";
import {
  AccordionList,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@tremor/react";

export default function CreateProductForm() {
  return (
    <div>
      <Flex alignItems="center" justifyContent="between">
        <div>
          <Title>Create Product</Title>
          <Text>Create new product.</Text>
        </div>
        <Button variant="primary">Save</Button>
      </Flex>

      <Grid numColsLg={6} className="gap-6 mt-6">
        {/* Main section */}
        <Col numColSpanLg={4} className="space-y-2">
          <Card
            decoration="top"
            decorationColor="indigo"
            className=" prose-stone"
          >
            <TextareaAutosize
              autoFocus
              id="title"
              placeholder="Product title ..."
              className="w-full overflow-hidden text-2xl font-semibold bg-transparent appearance-none resize-none focus:outline-none"
            />
          </Card>
          <Card
            decoration="top"
            decorationColor="indigo"
            className=" prose-stone"
          >
            <div id="editor" className="" >Description</div>
          </Card>
          <AccordionList>
            <Accordion>
              <AccordionHeader>Seo</AccordionHeader>
              <AccordionBody>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Phasellus tempor lorem non est congue blandit. Praesent non
                lorem sodales, suscipit est sed, hendrerit dolor.
              </AccordionBody>
            </Accordion>
            <Accordion>
              <AccordionHeader>Settings</AccordionHeader>
              <AccordionBody>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Phasellus tempor lorem non est congue blandit. Praesent non
                lorem sodales, suscipit est sed, hendrerit dolor.
              </AccordionBody>
            </Accordion>
          </AccordionList>
        </Col>

        {/* KPI sidebar */}
        <Col numColSpanLg={2}>
          <div className="space-y-2">
            <Card
              decoration="top"
              decorationColor="indigo"
              className=" prose-stone"
            >
              <TextareaAutosize
                autoFocus
                id="title"
                placeholder="Product short description ..."
                className="w-full overflow-hidden bg-transparent appearance-none resize-none text-md focus:outline-none"
              />
            </Card>
            <Card
              decoration="top"
              decorationColor="indigo"
              className=" prose-stone"
            >
              <Text>Select Category.</Text>
              <Dropdown>
                <DropdownItem value="5" text={"Five"} />
                <DropdownItem value="3" text={"Three"} />
                <DropdownItem value="1" text={"One"} />
              </Dropdown>
            </Card>
            <Card
              decoration="left"
              decorationColor="fuchsia"
              className="text-center text-slate-400"
            >
              <Flex>
                <UploadCloud className="w-5 h-5" /> Upload Image
              </Flex>
            </Card>
          </div>
        </Col>
      </Grid>
    </div>
  );
}
