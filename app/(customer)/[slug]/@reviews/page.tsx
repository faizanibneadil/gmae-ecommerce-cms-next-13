import React from "react";

interface Props {
  params: { slug: string };
  searchParams: { [key: string]: string };
}

const Page = (props: Props) => {
  return <div>Reviews Page</div>;
};

export default Page;
