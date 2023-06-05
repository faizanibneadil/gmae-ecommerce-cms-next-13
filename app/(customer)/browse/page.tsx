import { prisma } from "@/config/db";
import CategoryCard from "../components/categoryCard";
import { Card, Text, Title } from "@tremor/react";
import Image from "next/image";

export default async function Page() {
  const categories = await prisma.categories.findMany();
  return (
    <div className="w-full p-2 ">
      <div className="grid grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-6">
        {/* {categories?.map(c => <CategoryCard key={c.id} category={c} />)} */}
        {categories?.map((c) => (
          <Card
            className="px-0 pt-0"
            key={c.id}
            decoration="top"
            decorationColor="indigo"
          >
            <Image
              width={400}
              height={400}
              src={`${c.image}`}
              alt={`${c.name}`}
              className="rounded-t-"
            />
            <Title className="text-center">{c.name}</Title>
          </Card>
        ))}
      </div>
    </div>
  );
}
