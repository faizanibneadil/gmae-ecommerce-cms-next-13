import PageHeader from "@/app/(admin)/_components/page-header";

const Page: React.FC<{
  params: { id: string };
}> = ({ params }) => {
  return (
    <div>
      <PageHeader
        backRoute={`/admin/inventory/${params?.id}`}
        enableBackButton={true}
        pageDescription="Search Engine Optimization."
        pageHeading="SEO"
      />
    </div>
  );
};
export default Page;
