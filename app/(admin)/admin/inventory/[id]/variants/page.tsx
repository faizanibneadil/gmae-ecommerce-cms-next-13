import Variants from "./_components/variants";
import SearchVariants from "./_components/search-variants";

const Page: React.FC<{
  params: { id: string };
}> = ({ params }) => {
  return (
    <div>
      <SearchVariants />
      <Variants />
    </div>
  );
};

export default Page;
