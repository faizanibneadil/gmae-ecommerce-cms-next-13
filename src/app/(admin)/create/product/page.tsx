"use client";
import ColorsForm from "@/components/admin/forms/products/colors";
import GeneralForm from "@/components/admin/forms/products/general";
import * as Tabs from "@radix-ui/react-tabs";
import * as Collapsible from "@radix-ui/react-collapsible";
import * as Accordion from "@radix-ui/react-accordion";
import { useState } from "react";

export default function Page() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Collapsible.Root className="mt-4">
        <div className="mx-auto md:w-2/3">
          <div className="flex justify-between">
            <h2 className="p-2 text-base-content">Create New Product.</h2>
            <div>
              <Collapsible.Trigger className="p-2 text-warning">
                Advance Options.
              </Collapsible.Trigger>
            </div>
          </div>
          {/* GENERAL ACCORDION  */}
          <Accordion.Root
            className="mb-2 rounded-md"
            type="single"
            defaultValue="general"
            collapsible
          >
            <Accordion.AccordionItem value="general">
              <Accordion.AccordionTrigger className="bg-base-300 rounded-t p-[10px] w-full">
                General
              </Accordion.AccordionTrigger>
              <Accordion.AccordionContent className="rounded-b bg-base-200 p-[10px]">
                <GeneralForm />
              </Accordion.AccordionContent>
            </Accordion.AccordionItem>
          </Accordion.Root>
          {/* GENERAL ACCORDION  */}
          <Collapsible.Content>
            <Accordion.Root
              className="space-y-2 rounded-md"
              type="single"
              // defaultValue="Product Seo"
              collapsible
            >
              <Accordion.AccordionItem value="Product Seo">
                <Accordion.AccordionTrigger className="bg-base-300 rounded-t p-[10px] w-full">
                  Product Seo
                </Accordion.AccordionTrigger>
                <Accordion.AccordionContent className="rounded-b bg-base-200 p-[10px]">
                  Yes. It adheres to the WAI-ARIA design pattern.
                </Accordion.AccordionContent>
              </Accordion.AccordionItem>

              <Accordion.AccordionItem value="Promotion">
                <Accordion.AccordionTrigger className="bg-base-300 rounded-t p-[10px] w-full">
                  Promotion
                </Accordion.AccordionTrigger>
                <Accordion.AccordionContent className="rounded-b bg-base-200 p-[10px]">
                  Yes. It adheres to the WAI-ARIA design pattern.
                </Accordion.AccordionContent>
              </Accordion.AccordionItem>

              <Accordion.AccordionItem value="Settings">
                <Accordion.AccordionTrigger className="bg-base-300 rounded-t p-[10px] w-full">
                  Settings
                </Accordion.AccordionTrigger>
                <Accordion.AccordionContent className="rounded-b bg-base-200 p-[10px]">
                  Yes. It adheres to the WAI-ARIA design pattern.
                </Accordion.AccordionContent>
              </Accordion.AccordionItem>
            </Accordion.Root>
          </Collapsible.Content>
        </div>
      </Collapsible.Root>
      <Tabs.Root className="w-full" defaultValue="Generals">
        <Tabs.List className="w-full carousel">
          <Tabs.Trigger
            value="Generals"
            className="p-4 carousel-item hover:bg-base-200 data-[state=active]:bg-base-200"
          >
            Generals
          </Tabs.Trigger>
          <Tabs.Trigger
            value="Colors"
            className="p-4 carousel-item hover:bg-base-200 data-[state=active]:bg-base-200"
          >
            Colors
          </Tabs.Trigger>
          <Tabs.Trigger
            value="Sizes"
            className="p-4 carousel-item hover:bg-base-200 data-[state=active]:bg-base-200"
          >
            Sizes
          </Tabs.Trigger>
          <Tabs.Trigger
            value="Currency"
            className="p-4 carousel-item hover:bg-base-200 data-[state=active]:bg-base-200"
          >
            Currency
          </Tabs.Trigger>
          <Tabs.Trigger
            value="Promotion"
            className="p-4 carousel-item hover:bg-base-200 data-[state=active]:bg-base-200"
          >
            Promotion
          </Tabs.Trigger>
        </Tabs.List>
        {/* Tabs Content  */}
        <Tabs.Content value="Generals" className="p-4 md:p-8 bg-base-200">
          <GeneralForm />
        </Tabs.Content>
        <Tabs.Content value="Colors" className="p-4 md:p-8 bg-base-200">
          <ColorsForm />
        </Tabs.Content>
        <Tabs.Content value="Sizes" className="p-4 md:p-8 bg-base-200">
          Sizes
        </Tabs.Content>
        <Tabs.Content value="Currency" className="p-4 md:p-8 bg-base-200">
          Currency
        </Tabs.Content>
        <Tabs.Content value="Promotion" className="p-4 md:p-8 bg-base-200">
          Promotion
        </Tabs.Content>
      </Tabs.Root>
    </>
  );
}
