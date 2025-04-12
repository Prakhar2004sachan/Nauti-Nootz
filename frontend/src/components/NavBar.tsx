import { useAuth } from "../context/AuthContext";
import Button from "./Button";
import { FaRegNoteSticky } from "react-icons/fa6";

function NavBar() {
  const { user, logout } = useAuth();
  return (
    <div className="w-full flex items-center justify-between bg-purple-200 px-4 py-2 sm:py-4">
      <div className="flex items-center gap-3">
        <FaRegNoteSticky className="size-8 sm:size-10 text-purple-600" />
        <p className="sm:text-xl font-semibold text-purple-600 inline-block">
          Nauti
        </p>
      </div>
      <div className="flex gap-5 text-sm lg:text-md items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="rounded-full p-1 border sm:border-2 border-purple-600">
            <img
              src={user?.image}
              alt="user-image"
              className="rounded-full w-10 sm:w-12"
            />
          </div>
          <p className="text-md hidden sm:inline-block">{`Welcome, ${user?.name}`}</p>
        </div>
        <Button variant="primary" title="logout" onClick={logout} />
      </div>
    </div>
  );
}

export default NavBar;
