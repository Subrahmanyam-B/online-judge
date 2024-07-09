import { Section, Container } from "./craft";
import Logo from "../assets/Logo-hero.svg";
import { Link } from "@tanstack/react-router";

export default function Footer() {
  return (
    <footer className="not-prose border-t">
      <Section>
        <Container className="grid gap-6">
          <div className="grid gap-6">
            <Link href="/">
              <h3 className="sr-only">brijr/components</h3>
              <img
                src={Logo}
                alt="Logo"
                width={120}
                height={27.27}
                className="transition-all hover:opacity-75 dark:invert"
              ></img>
            </Link>
            {/* <p> */}
            {/*   <Balancer> */}
            {/*     brijr/components is a collection of Next.js, React, Typescript */}
            {/*     components for building landing pages and websites. */}
            {/*   </Balancer> */}
            {/* </p> */}
            <div className="mb-6 flex flex-col gap-4 text-sm text-muted-foreground underline underline-offset-4 md:mb-0 md:flex-row">
              <Link href="/privacy-policy">Privacy Policy</Link>
              <Link href="/terms-of-service">Terms of Service</Link>
              <Link href="/cookie-policy">Cookie Policy</Link>
            </div>
            <p className="text-muted-foreground">
              © <a href="https://github.com/brijr/components">AlgoArena</a>.
              All rights reserved. 2024-present.
            </p>
          </div>
        </Container>
      </Section>
    </footer>
  );
}
