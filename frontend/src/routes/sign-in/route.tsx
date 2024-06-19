import { createFileRoute } from "@tanstack/react-router";

const SignIn = () => {
  return (
    <div>SignIn</div>
  )
}

export const Route = createFileRoute('/sign-in')({
  component: SignIn
})


