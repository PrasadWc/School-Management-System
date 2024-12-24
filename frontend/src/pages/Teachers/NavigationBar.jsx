import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  MenuItem,
  IconButton,
} from "@material-tailwind/react";
import {
  CodeBracketSquareIcon,
  Bars2Icon,
  HomeIcon,
  BookOpenIcon,
} from "@heroicons/react/24/solid";
import { BsPeople, BsPeopleFill } from "react-icons/bs";

// nav list component
const navListItems = [
  {
    label: "Home",
    icon: HomeIcon,
    to: "/teacher/dashboard",
  },
  {
    label: "Assignments",
    icon: BookOpenIcon,
    to: "/teacher/assignments",
  },
  {
    label: "Students",
    icon: BsPeopleFill,
    to: "/teacher/students",
  },
];

function NavList() {
  return (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      {navListItems.map(({ label, icon, to }, key) => (
        <Link key={label} to={to} className="font-medium text-white">
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
    // Clear all local storage and session storage
    localStorage.clear();
    sessionStorage.clear();

    // Optionally, clear cookies if needed
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });

    // Navigate to home page
    navigate("/");
  };

  return (
    <Navbar
      variant="gradient"
      color="blue-gray"
      className="mx-auto max-w-full p-2 lg:rounded-none lg:pl-6"
    >
      <div className="relative mx-auto flex items-center justify-between text-white">
        <Typography
          as="a"
          href="#"
          className="mr-4 ml-2 cursor-pointer py-1.5 font-medium"
        >
          Teacher
        </Typography>
        <div className="hidden lg:block">
          <NavList />
        </div>
        <IconButton
          size="sm"
          color="white"
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
      <MobileNav open={isNavOpen} className="overflow-scroll">
        <NavList />
      </MobileNav>
    </Navbar>
  );
}
