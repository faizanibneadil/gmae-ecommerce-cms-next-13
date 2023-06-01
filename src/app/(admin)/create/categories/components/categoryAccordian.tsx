"use client";
import * as Accordion from "@radix-ui/react-accordion";
import { Categories } from "@prisma/client";
import Image from "next/image";
import DeleteButton from "./deleteButton";
import { TrashIcon } from "lucide-react";

export default function CategoriesAccordian({
  categories,
}: {
  categories: (Categories & {
    User: {
      name: string | null;
    } | null;
    subCategory: {
      User: {
        name: string | null;
      } | null;
      id: string;
      name: string | null;
      image: string | null;
      createdAt: Date;
    }[];
  })[];
}) {
  return (
    <Accordion.Root type="single" collapsible className="space-y-2">
      {categories?.map((category) => (
        <Accordion.Item value={category.id}>
          <Accordion.Header>
            <Accordion.Trigger asChild className="w-full p-2 rounded-full bg-base-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Image
                    width={100}
                    height={100}
                    className="w-12 h-12 rounded-full"
                    src={`${category?.image}`}
                    alt="Neil image"
                  />
                  <h3>{category.name}</h3>
                </div>
                <DeleteButton CategoryId={category.id}>
                  <TrashIcon className="w-4 h-4" />
                </DeleteButton>
              </div>
            </Accordion.Trigger>
          </Accordion.Header>
          {category?.subCategory.length > 0 && (
            <Accordion.Content className="p-4 mt-2 rounded-2xl bg-base-300">
              <ol className="mt-3 divide-y divider-gray-200 dark:divide-gray-700">
                {category?.subCategory?.map((subCat) => (
                  <li key={subCat.id} className="py-3 pl-4 sm:py-4">
                    <div className="flex items-center space-x-4">
                      <div className="self-start flex-shrink-0">
                        <Image
                          width={100}
                          height={100}
                          className="w-8 h-8 rounded-full"
                          src={`${subCat?.image}`}
                          alt="Neil image"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                          {subCat.name}
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                          Created by: <b>{subCat?.User?.name}</b> Created At:{" "}
                          <b>{new Date(subCat?.createdAt).toLocaleString()}</b>
                        </p>
                      </div>
                      <DeleteButton CategoryId={subCat.id}>
                        <TrashIcon className="w-4 h-4" />
                      </DeleteButton>
                    </div>
                  </li>
                ))}
              </ol>
            </Accordion.Content>
          )}
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
