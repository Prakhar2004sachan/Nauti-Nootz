
import { useNavigate } from "react-router";

function PageNotFound() {
  const router = useNavigate();
  return (
    <div className="w-full h-screen flex flex-col gap-10 items-center justify-center ">
      <p className="text-4xl font-semibold">Page Not Found</p>
      <p
        className="px-8 py-4 hover:border-zinc-700 rounded-full border border-zinc-300 cursor-pointer transition-all duration-300 shadow-xl"
        onClick={() => router("/")}
      >
        Go to Home
      </p>
    </div>
  );
}

export default PageNotFound;
