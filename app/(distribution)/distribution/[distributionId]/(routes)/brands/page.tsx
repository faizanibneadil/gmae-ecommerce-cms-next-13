interface Props {
  searchParams: { query: string };
}

const Page: React.FC<Props> = ({ searchParams }) => {
  return searchParams?.query ? (
    <div>You search: {searchParams.query}</div>
  ) : (
    <div>Coming Soon ...</div>
  );
};

export default Page;
