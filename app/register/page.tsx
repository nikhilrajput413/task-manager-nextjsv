import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex min-h-[calc(100vh-100px)] bg-gray-100 pt-4 px-0 gap-0">

        {/* LEFT IMAGE */}
        <div className="hidden md:flex md:w-1/2 h-[calc(100vh-116px)]">
          <img
            src="/itra-left-sides.png"
            alt="Runner"
            className="h-full w-full object-cover rounded-r-[60px]"
          />
        </div>

        {/* RIGHT FORM */}
        <div className="flex w-full md:w-1/2 items-center justify-center px-4 py-8">
          <div className="w-full max-w-sm">
            <RegisterForm />
          </div>
        </div>

      </div>
    </div>
  );
}