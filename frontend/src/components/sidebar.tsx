/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ClipboardList,
  LayoutDashboard,
  ListChecks,
  LogOutIcon,
  Trophy,
  User,
} from "lucide-react";
import Logo from "../assets/Logo.svg";
import { Command, CommandGroup, CommandItem, CommandList } from "./ui/command";
import { Button } from "./ui/button";
import { Link } from "@tanstack/react-router";

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
        {
          link: "/leaderboard",
          icon: <Trophy />,
          text: "Leaderboard",
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

  return (
    <div className="flex flex-col gap-4 w-[300px] min-w-[300px] border-r min-h-screen p-4">
      <div>
        <UserItem />
      </div>
      <div className="grow">
        <Command style={{ overflow: "visible" }}>
          <CommandList style={{ overflow: "visible" }}>
            {menuList.map((menu: any, key: number) => (
              <CommandGroup key={key} heading={menu.group}>
                {menu.items.map((option: any, optionKey: number) => (
                  <Link to={option.link}>
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
      <Button variant="outline" className="flex justify-center gap-4">
        <p>Logout </p>
        <LogOutIcon className="h-4 w-4" />
      </Button>
    </div>
  );
}
