import { prisma } from "@/config/db";
import CreateCategoryForm from "./components/createForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/authOptions";
import { Card, Col, Grid, List, ListItem, Metric, Text } from "@tremor/react";
import DeleteButton from "./components/deleteButton";

export default async function Page() {
  const session = await getServerSession(authOptions);
  const categories = await prisma.categories.findMany({
    where: { parentCategory: null },
    include: {
      subCategory: {
        select: {
          name: true,
          image: true,
          createdAt: true,
          id: true,
          User: {
            select: {
              name: true,
            },
          },
        },
      },
      User: { select: { name: true } },
    },
  });

  return (
    <>
      <Grid numColsLg={6} className="gap-6 mt-6">
        {/* Main section */}
        <Col numColSpanLg={2}>
          <CreateCategoryForm
            userId={session?.user?.id}
            categories={categories}
          />
        </Col>

        {categories?.map((category) => (
          <Col key={category.id} numColSpanLg={2}>
            <Card decorationColor="indigo" decoration="top">
              <Metric>{category.name}</Metric>
              <List>
                {category?.subCategory.map((category) => (
                  <ListItem key={category.id}>
                    <span>{category.name}</span>
                    <span><DeleteButton CategoryId={category.id}>Delete</DeleteButton></span>
                  </ListItem>
                ))}
              </List>
            </Card>
          </Col>
        ))}
      </Grid>
    </>
  );
}
