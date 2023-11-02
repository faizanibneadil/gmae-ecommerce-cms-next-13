import { Input } from "@/components/ui/input";

const SearchInput: React.FC<{}> = () => {
  return (
    <Input
      className="flex-1 h-8 p-1 border-none rounded-none focus:outline-none"
      placeholder="Search ..."
    />
  );
};

export default SearchInput;
