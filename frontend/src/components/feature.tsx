
import Balancer from "react-wrap-balancer";

import { Button } from "@/components/ui/button";
import { Section, Container } from "@/components/craft";
import Placeholder from "../assets/placeholder.png";
import { Link } from "@tanstack/react-router";
import { BorderBeam } from "./ui/border-beam";

const Feature = () => {
  return (
    <Section>
      <Container className="grid items-stretch">
        <h3 className="!mt-0">AlgoArena offers a comprehensive platform for developers at all levels.</h3>
        <p className="text-muted-foreground">
          <Balancer>
            Real-world interview questions, multiple programming languages supported
          </Balancer>
        </p>
        <div className="not-prose my-8 flex items-center gap-2">
          <Button className="w-fit" asChild>
            <Link to="/">Start Coding Now</Link>
          </Button>
          <Button className="w-fit" variant="link" asChild>
            <Link to="/">Explore Problems {"->"}</Link>
          </Button>
        </div>
        <div className="not-prose relative flex h-[48rem] overflow-hidden rounded-xl border">
          <img
            src={Placeholder}
            alt="placeholder"
            className="fill object-cover"
          />
          <BorderBeam />
        </div>
      </Container>
    </Section>
  );
};

export default Feature;
