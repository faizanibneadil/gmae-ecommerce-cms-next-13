"use client";
import ColorsForm from "@/components/admin/forms/products/colors";
import GeneralForm from "@/components/admin/forms/products/general";
import * as Tabs from "@radix-ui/react-tabs";
import Link from "next/link";

export default function Page() {
  return (
    <div className="grid gap-4 p-4 md:grid-cols-4">
      <Link
        href="/create/colors"
        className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Lets Create Some Colors.
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Create colors collection for each product because the colors is ery
          important to place an order.
        </p>
      </Link>

      <Link
        href="/create/promotions"
        className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Lets Create Promotion.
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Promotion is very important to engage new customers. Customers will
          definitely buy some products if have Promotion.
        </p>
      </Link>

      <Link
        href="/create/categories"
        className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Lets Create Some Categories.
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Categories is very important for customer for filter out your products
          collections.
        </p>
      </Link>

      <Link
        href="/create/promocodes"
        className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Lets Create Promo Codes.
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Promo Code is very important to engage new customers. Customers will
          definitely buy some products if have Promo Codes.
        </p>
      </Link>

      <Link
        href="/create/products"
        className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Lets Create Some Products.
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Basically products is content. The user will spend more time if lots
          of products is showcase you in your store.
        </p>
      </Link>

      <Link
        href="/create/user"
        className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Lets Create Some Users.
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Multiple Users can help you to manege store together.
        </p>
      </Link>
    </div>
  );
}
