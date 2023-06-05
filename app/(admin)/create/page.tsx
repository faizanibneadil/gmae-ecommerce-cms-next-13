import { Card, Grid, Metric, Text, Title } from "@tremor/react";
import Link from "next/link";

export default function Page() {
  return (
    <div>
      <Title>Create Actions</Title>
      <Text>Create new User, Category, Product etc.</Text>
      <Grid numColsMd={3} className="gap-6 mt-6">
        <Link href="/create/categories">
          <Card decoration="top" decorationColor="indigo" className="h-44">
            <Metric>Lets Create Category</Metric>
            <Text>
              Categories is very important for customer for filter out your
              products collections.
            </Text>
          </Card>
        </Link>
        <Link href="/create/promotions">
          <Card decoration="top" decorationColor="indigo" className="h-44">
            <Metric>Lets Create Promotion.</Metric>
            <Text>
              Promotion is very important to engage new customers. Customers
              will definitely buy some products if have Promotion.
            </Text>
          </Card>
        </Link>
        <Link href="/create/promocodes">
          <Card decoration="top" decorationColor="indigo" className="h-44">
            <Metric>Lets Create Promo Codes.</Metric>
            <Text>
              Promo Code is very important to engage new customers. Customers
              will definitely buy some products if have Promo Codes.
            </Text>
          </Card>
        </Link>
        <Link href="/create/products">
          <Card decoration="top" decorationColor="indigo" className="h-44">
            <Metric>Lets Create Some Products.</Metric>
            <Text>
              Basically products is content. The user will spend more time if
              lots of products is showcase you in your store.
            </Text>
          </Card>
        </Link>
        <Link href="/create/user">
          <Card decoration="top" decorationColor="indigo" className="h-44">
            <Metric>Lets Create Some Users.</Metric>
            <Text>
              Multiple Users can help you to manege store together. Create
              manager and some sales man or delivery man accounts for manage
              options.
            </Text>
          </Card>
        </Link>
      </Grid>
    </div>
  );
}
