

// Third-party library imports
import Balancer from "react-wrap-balancer";

// Local component imports
import { Section, Container } from "@/components/craft";
import { Button } from "@/components/ui/button";

// Asset imports
import Logo from "../assets/Logo-hero.svg";
import { Link } from "@tanstack/react-router";
import { ArrowRightIcon } from "lucide-react";
import Meteors from "./ui/meteors";

const Hero = () => {
  return (
    <Section className="relative">

      <div className="-translate-y-[20rem]  absolute -translate-x-[50rem]">
        <Meteors number={50} />
      </div>
      <Container className="flex flex-col items-center text-center">

        <img
          src={Logo}
          width={372}
          height={172}
          alt="Company Logo"
          className="not-prose mb-6 dark:invert md:mb-8"
        />
        <h1 className="!mb-0">
          <Balancer>
            Master algorithms, ace interviews, and elevate your coding skills.
          </Balancer>
        </h1>
        {/* <h3 className="text-muted-foreground"> */}
        {/*   <Balancer> */}
        {/*     Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris */}
        {/*     nisi ut aliquip ex ea commodo consequat. */}
        {/*   </Balancer> */}
        {/* </h3> */}
        <div className="not-prose mt-6 flex gap-2 md:mt-12">
          <Link to="/sign-up">
            <Button variant="shine" Icon={ArrowRightIcon} iconPlacement="right">
              Register
            </Button>
          </Link>
          <Link to="/sign-in">
            <Button variant="expandIcon" Icon={ArrowRightIcon} iconPlacement="right">
              Login
            </Button>
          </Link>
        </div>
      </Container>
    </Section>
  );
};

export default Hero;
