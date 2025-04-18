import { FaRegNoteSticky } from "react-icons/fa6";
import SidebarItem from "./SidebarItem";
import { FiTwitter, FiYoutube } from "react-icons/fi";
import { GoBook } from "react-icons/go";
import Button from "./Button";
import Login from "../pages/Login";
import { useAuth } from "../context/AuthContext";
import { AiOutlineHome } from "react-icons/ai";
import { Link } from "react-router-dom";

function Sidebar() {
  const { isAuthenticated, user, logout } = useAuth();
  console.log(user, isAuthenticated);
  return (
    <div className={`h-screen w-[20rem] border-r-2 p-6 flex flex-col bg-white`}>
      {/* Header */}
      <div className="flex gap-5 items-center">
        <FaRegNoteSticky className="size-12 text-purple-600" />
        <h1 className="text-3xl font-semibold">Nauti</h1>
      </div>

      {/* Sidebar items */}
      <div className="px-4 mt-8 space-y-4">
        <SidebarItem
          title="Home"
          startIcon={<AiOutlineHome className="size-7 text-zinc-600" />}
        />
        <SidebarItem
          title="Twitter"
          startIcon={<FiTwitter className="size-6 text-zinc-600" />}
        />
        <SidebarItem
          title="Youtube"
          startIcon={<FiYoutube className="size-6 text-zinc-600" />}
        />
        <SidebarItem
          title="Documents"
          startIcon={<GoBook className="size-6 text-zinc-600" />}
        />
      </div>

      {/* Bottom Buttons */}
      <div className="mt-auto flex flex-col gap-4 pt-6">
        {!isAuthenticated ? (
          <Login />
        ) : (
          <>
            <div className="flex flex-col gap-3 items-center justify-center">
              <div className="border-2 border-purple-600 rounded-full p-2">
                <img
                  src={user?.image}
                  alt="user-image"
                  className="rounded-full"
                />
              </div>
              <p>{`Welcome, ${user?.name}`}</p>
            </div>
            <Button variant="primary" title="logout" onClick={logout} />
          </>
        )}
        <Link to={"https://github.com/Prakhar2004sachan/Nauti-Nootz"} className="bg-purple-200 rounded-xl px-4 py-2 text-center text-purple-600" target="blank">
        See github code</Link>
      </div>
    </div>
  );
}

export default Sidebar;
