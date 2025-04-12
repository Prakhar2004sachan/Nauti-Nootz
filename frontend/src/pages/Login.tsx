import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import { googleAuth } from "../api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


type GoogleAuthCodeResponse = {
  code: string;
};

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const responseGoogle = async (authResult: GoogleAuthCodeResponse) => {
    console.log("📦 Google login response:", authResult);
    try {
      if (authResult?.code) {
        const result = await googleAuth(authResult.code);
        // const { email, name, image } = result.data.user;
        const token = result.data.token;
        console.log(token);
        await login(token);
        navigate("/");
      } else {
        throw new Error("No authorization code received from Google.");
      }
    } catch (e) {
      console.log("Error while Google Login...", e);
    }
  };
  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    flow: "auth-code",
  });
  return (
    <>
      <button
        className="w-full flex items-center justify-center gap-4 border border-zinc-300 rounded-xl py-2"
        onClick={googleLogin}
      >
        <FcGoogle className="size-6" />
        Login with Google
      </button>
    </>
  );
}

export default Login;
