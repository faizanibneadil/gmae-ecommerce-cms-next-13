"use client";
import { SearchIcon } from "@/app/_components/icons";
import { Button, Icon, TextInput } from "@tremor/react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import Spin from "@/app/_components/loading-spinner";

const SearchForm: React.FC<{}> = () => {
  const { replace, refresh } = useRouter();
  const params = useParams();
  const [searching, startSearching] = useTransition();
  const action = (formData: FormData) => {
    return startSearching(() => {
      const query = formData.get("query");
      replace(`/admin/inventory/${params?.id}/variants?query=${query}`);
      refresh();
    });
  };
  return (
    <form action={action} className="flex space-x-1">
      <TextInput name="query" placeholder="Search product ..." />
      <Button type="submit" variant="light">
        <Icon icon={searching ? Spin : SearchIcon} variant="shadow" />
      </Button>
    </form>
  );
};

export default SearchForm;
