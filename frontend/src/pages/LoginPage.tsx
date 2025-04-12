
import { useEffect } from "react";
import Login from "./Login";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function LoginPage() {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, loading, navigate]);
  return (
    <div className="w-full h-screen bg-gray-100 flex items-center justify-center flex-col">
      <p className="text-4xl">Hello, Dear User</p>
      <p className="text-zinc-500 py-2 text-lg">Login to access website</p>
      <div className="w-[20rem] mt-5">
        <Login />
      </div>
    </div>
  );
}

export default LoginPage;
