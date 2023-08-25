import PageHeader from "@/app/(admin)/_components/page-header";

const Page: React.FC<{
  params: { id: string };
}> = ({ params }) => {
  return (
    <div>
      <PageHeader
        backRoute={`/admin/inventory/${params?.id}`}
        enableBackButton={true}
        pageDescription="Add product Attributes."
        pageHeading="Attributes"
      />
    </div>
  );
};
export default Page;
