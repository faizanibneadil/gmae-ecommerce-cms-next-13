import AuthButton from "@/app/components/auth";

export default function Page() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mt-20 mb-20 text-center">
        <p>Login first to see how many product you like ❤️.</p>
        <AuthButton />
      </div>
    </div>
  );
}
