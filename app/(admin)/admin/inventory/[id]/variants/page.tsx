import PageHeader from "@/app/(admin)/_components/page-header";
import Variants from "./_components/variants";
import SearchVariants from "./_components/search-variants";

const Page: React.FC<{
  params: { id: string };
}> = ({ params }) => {
  return (
    <div>
      <PageHeader
        backRoute={`/admin/inventory/${params?.id}`}
        enableBackButton={true}
        pageDescription="Add product variants."
        pageHeading="Variants"
      />
      <div className="max-w-4xl mx-auto mt-2 space-y-4">
        <SearchVariants />
        <Variants />
      </div>
    </div>
  );
};

export default Page;
