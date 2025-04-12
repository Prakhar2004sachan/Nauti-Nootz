import { NavLink } from "react-router-dom";

function SidebarItem({
  startIcon,
  title,
}: {
  startIcon: React.ReactNode;
  title: string;
}) {
  return (
    <NavLink
      to={title.toLowerCase() === "home" ? `/` : `/${title.toLowerCase()}`}
      className={({isActive}) =>
        `flex gap-10 hover:bg-purple-200 rounded-xl px-4 py-2 items-center justify-start mt-5 cursor-pointer ${
          isActive ? "border border-zinc-300 shadow-xl" : "border-none"
        }`
      }
    >
      {startIcon}
      <p className={`text-xl text-zinc-600 hover:text-zinc-800`}>{title}</p>

    </NavLink>
  );
}

export default SidebarItem;
