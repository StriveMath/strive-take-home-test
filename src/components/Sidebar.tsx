import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";

interface SidebarProps {
  items: { id: number; name: string }[];
}

// Move through different creator(s) lessons here
export default function Sidebar({ items }: SidebarProps) {
  const renderedTitles = items?.map(({ id, name }) => {
    return (
      <li
        key={name}
        className={`text-[10px] md:text-[16px] cursor-pointer rounded-md p-4 hover:bg-slate-700
      `}
      >
        <Link
          href={`/${id}`}
          className="bg-inherit text-inherit hover:bg-inherit hover:text-inherit transition-none"
        >
          {name}
        </Link>
      </li>
    );
  });

  return (
    <aside className="drawer lg:drawer-open w-fit z-10">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-start">
        <label
          htmlFor="my-drawer-2"
          className="p-2 btn-primary drawer-button lg:hidden m-10 rounded-md"
        >
          <GiHamburgerMenu />
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          {renderedTitles}
        </ul>
      </div>
    </aside>
  );
}
