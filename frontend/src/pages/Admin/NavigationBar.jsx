import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  MenuItem,
  IconButton,
} from "@material-tailwind/react";
import { Bars2Icon, HomeIcon, BookOpenIcon } from "@heroicons/react/24/solid";
import { BsPeople, BsPeopleFill } from "react-icons/bs";
import { HiOutlineSpeakerphone } from "react-icons/hi";

// nav list component
const navListItems = [
  {
    label: "Home",
    icon: HomeIcon,
    to: "/admin/dashboard",
  },
  {
    label: "Classes",
    icon: BookOpenIcon,
    to: "/admin/classes",
  },
  {
    label: "Students",
    icon: BsPeople,
    to: "/admin/students",
  },
  {
    label: "Teachers",
    icon: BsPeopleFill,
    to: "/admin/teachers",
  },
  {
    label: "Announcements",
    icon: HiOutlineSpeakerphone,
    to: "/admin/announcements",
  },
];

function NavList() {
  return (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      {navListItems.map(({ label, icon, to }, key) => (
        <Link key={label} to={to} className="font-medium text-gray-800">
          <MenuItem className="flex items-center gap-2 lg:rounded-full">
            {React.createElement(icon, { className: "h-[18px] w-[18px]" })}{" "}
            <span className="white">{label}</span>
          </MenuItem>
        </Link>
      ))}
    </ul>
  );
}

export default function NavigationBar() {
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const navigate = useNavigate();

  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    );
  }, []);

  const handleLogout = () => {
    // Clear all local storage items
    localStorage.clear();

    // Navigate to the homepage
    navigate("/");
  };

  return (
    <Navbar
      variant="filled"
      color="blue"
      className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4"
    >
      <div className="relative mx-auto flex items-center justify-between text-white">
        <Typography
          as="a"
          href="#"
          className="mr-4 ml-2 cursor-pointer py-1.5 font-medium"
          color="white"
        >
          Admin
        </Typography>
        <div className="hidden lg:block">
          <NavList />
        </div>
        <IconButton
          size="sm"
          color="black"
          variant="text"
          onClick={toggleIsNavOpen}
          className="ml-auto mr-2 lg:hidden"
        >
          <Bars2Icon className="h-6 w-6" />
        </IconButton>

        <Button color="white" size="sm" variant="text" onClick={handleLogout}>
          <span>Log Out</span>
        </Button>
      </div>
      <Collapse open={isNavOpen} className="overflow-scroll">
        <NavList />
      </Collapse>
    </Navbar>
  );
}
