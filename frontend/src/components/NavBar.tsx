
import { LuBrain } from "react-icons/lu";
import { useAuth } from "../context/AuthContext";
import Button from "./Button";

function NavBar() {
  const { user, logout } = useAuth();
  return (
    <div className="w-full flex items-center justify-between bg-purple-200 px-8 py-4">
      <div className="flex items-center gap-3">
        <LuBrain className="size-10 text-purple-600" />
        <p className="text-xl font-semibold text-purple-600 hidden sm:inline-block">
          Second Brain
        </p>
      </div>
      <div className="flex gap-5">
        <div className="flex items-center gap-3">
          <img
            src={user?.image}
            alt="user-image"
            className="rounded-full w-12"
          />
          <p className="text-md hidden sm:inline-block">{`Welcome, ${user?.name}`}</p>
        </div>
        <Button variant="primary" title="logout" onClick={logout} />
      </div>
    </div>
  );
}

export default NavBar;
