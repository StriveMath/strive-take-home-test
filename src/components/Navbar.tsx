import { FC } from "react";

interface NavbarProps {
  children: React.ReactNode;
}

const Navbar: FC<NavbarProps> = ({ children }) => {
  return (
    <nav className="w-full flex justify-center py-6 bg-base-100">
      <header className="flex items-center gap-4">{children}</header>
    </nav>
  );
};

export default Navbar;
