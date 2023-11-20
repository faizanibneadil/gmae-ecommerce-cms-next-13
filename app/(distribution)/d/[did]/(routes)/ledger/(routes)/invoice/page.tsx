import ConnectBillToLedger from "./_components/add-bill";

interface Props {
  params: { did: string };
}

const Page: React.FC<Props> = () => {
  return (
    <div>
      <ConnectBillToLedger />
      Attach Invoice
    </div>
  );
};

export default Page;
