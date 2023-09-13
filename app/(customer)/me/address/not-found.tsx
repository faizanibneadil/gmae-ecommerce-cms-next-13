import AddNewAddress from "./_components/Init-address";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <AddNewAddress />
      <p>Address Not Found.</p>
    </div>
  );
};

export default NotFound;
