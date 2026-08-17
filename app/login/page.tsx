import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-100">

      <div className="flex min-h-[calc(100vh-80px)] bg-gray-100 pt-4 px-4">

        {/* LEFT IMAGE */}
        <div className="hidden md:flex w-1/2 justify-center items-start">
          <img
            src="/itra-left-sides.png"
            alt="Runner"
            className="mt-6 h-[95%] w-full object-cover rounded-r-[80px]"
          />
        </div>

        {/* RIGHT LOGIN */}
        <div className="flex w-full md:w-1/2 items-center justify-center">
          <div className="w-full max-w-md mt-6">
            <LoginForm />
          </div>
        </div>

      </div>
    </div>
  );
}