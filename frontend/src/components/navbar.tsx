import { Link } from "@tanstack/react-router";
import Logo from "../assets/Logo.svg"
import Menu from "../assets/Menu.svg"
import { Button } from "./ui/button";

const navLinks = [
  { name: "AlgoArena" },
];

export function Navbar() {
  return (
    <nav className="flex w-full items-center justify-between px-[20px] py-[16px] lg:container lg:mx-auto lg:px-20">
      <div className="flex items-center">
        <img src={Logo} alt="Logo" />
        {/**/}
        {/* <div className="hidden lg:flex pl-5 gap-x-[56px]"> */}
        {/*   {navLinks.map((item, index) => ( */}
        {/*     <p className="text-[#36485C] font-bold text-xl" key={index}> */}
        {/*       {item.name} */}
        {/*     </p> */}
        {/*   ))} */}
        {/* </div> */}
      </div>

      <div className="flex gap-x-5">
        {/* <p className="hidden lg:block font-medium text-[#36485C] pr-[56px]"> */}
        {/*   Open an Account */}
        {/* </p> */}
        <Link to="/sign-up">
          <Button>Open an Account</Button>
        </Link>

        <div className="flex items-center gap-x-2">
          <Link to="/sign-in">
            <Button variant={'outline'}>
              Sign in
            </Button>
          </Link>
        </div>

        <img src={Menu} alt="Menu Button" className="lg:hidden" />
      </div>
    </nav>
  );
}
