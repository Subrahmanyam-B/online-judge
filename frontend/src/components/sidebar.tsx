/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ClipboardList,
  LayoutDashboard,
  ListChecks,
  LogOutIcon,
  Moon,
  Settings,
  Sun,
  User,
} from "lucide-react";
import Logo from "../assets/Logo.svg";
import { Command, CommandGroup, CommandItem, CommandList } from "./ui/command";
import { Button } from "./ui/button";
import { Link } from "@tanstack/react-router";
import { useRecoilState } from "recoil";
import { authAtom } from "@/state/auth";
import { removeAccessToken, removeRefreshToken } from "@/lib/utils";
import { useTheme } from "./theme-provider";

function UserItem() {
  const navLinks = [{ name: "AlgoArena" }];
  return (
    <div className="flex items-center justify-between gap-2 rounded-[8px] p-2">
      <div className="flex items-center">
        <img src={Logo} alt="Logo" />

        <div className="hidden lg:flex pl-5 gap-x-[56px]">
          {navLinks.map((item, index) => (
            <p className="text-white font-bold text-xl" key={index}>
              {item.name}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Sidebar() {
  const [auth, setAuth] = useRecoilState(authAtom);

  async function logout() {
    removeAccessToken();
    removeRefreshToken();
    setAuth({ isAuthenticated: false, user: null });
  }

  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const menuList = [
    {
      group: "General",
      items: [
        {
          link: "/dashboard",
          icon: <LayoutDashboard />,
          text: "Dashboard",
        },
        {
          link: "/problems",
          icon: <ClipboardList />,
          text: "Problems",
        },
        {
          link: "/submissions",
          icon: <ListChecks />,
          text: "Submissions",
        },
      ],
    },
    {
      group: "Settings",
      items: [
        {
          link: "/profile",
          icon: <User />,
          text: "Profile Settings",
        },
      ],
    },
  ];

  const adminList = [
    {
      group: "Admin Settings",
      items: [
        {
          link: "/admin",
          icon: <Settings />,
          text: "Manage",
        },
      ],
    },
  ];

  return (
    <div className="sticky top-0 h-screen  flex flex-col gap-4 w-[300px] min-w-[300px] border-r min-h-screen p-4">
      <div>
        <UserItem />
      </div>
      <div className="grow">
        <Command style={{ overflow: "visible" }}>
          <CommandList style={{ overflow: "visible" }}>
            {auth.user?.role === "admin" &&
              adminList.map((menu: any, key: number) => (
                <CommandGroup key={key} heading={menu.group}>
                  {menu.items.map((option: any, optionKey: number) => (
                    <Link to={option.link} key={optionKey}>
                      <CommandItem
                        key={optionKey}
                        className="flex gap-2 cursor-pointer"
                      >
                        {option.icon}
                        {option.text}
                      </CommandItem>
                    </Link>
                  ))}
                </CommandGroup>
              ))}
            {menuList.map((menu: any, key: number) => (
              <CommandGroup key={key} heading={menu.group}>
                {menu.items.map((option: any, optionKey: number) => (
                  <Link to={option.link} key={optionKey}>
                    <CommandItem
                      key={optionKey}
                      className="flex gap-2 cursor-pointer"
                    >
                      {option.icon}
                      {option.text}
                    </CommandItem>
                  </Link>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </div>
      <div className="flex gap-4">
        <Button
          variant="outline"
          className="flex flex-1 justify-center gap-4"
          onClick={logout}
        >
          <p>Logout </p>
          <LogOutIcon className="h-4 w-4" />
        </Button>
        <Button variant="outline" onClick={toggleTheme}>
          {theme === "light" ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
}
