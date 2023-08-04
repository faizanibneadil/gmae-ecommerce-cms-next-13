import AuthButton from "@/app/_components/auth";

export default function Page() {
  return (
    <div className="mx-auto max-w-max">
      <div className="mt-20 mb-20 text-center">
        <p className="mb-4">Login first to see how many product you like ❤️.</p>
        <AuthButton />
      </div>
    </div>
  );
}
