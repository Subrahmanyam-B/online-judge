import { login } from "@/api/auth";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { AuthPayload, ValidateSignature } from "@/lib/auth";
import { authAtom } from "@/state/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email({ message: "Enter a valid email" }),
  password: z.string().min(8).max(30),
});

const SignInForm = () => {
  const router = useRouter();

  const [auth, setAuth] = useRecoilState(authAtom);

  useEffect(() => {
    if (auth.isAuthenticated) {
      router.history.push("/dashboard");
    }
  }, [auth, router]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    login(values.email, values.password)
      .then((response) => {
        if (response.accessToken) {
          return ValidateSignature();
        }
        throw new Error("Login failed");
      })
      .then((payload: AuthPayload | false) => {
        if (payload) {
          setAuth({ isAuthenticated: true, user: payload });
          router.history.push("/dashboard");
        }
      })
      .catch((err) => {
        toast({
          title: "Login Failed",
          description: "Error with logging in. Please try again.",
          variant: "destructive",
        });
      });
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 ">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="email"
                  autoComplete="username"
                  placeholder="Email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="password"
                  autoComplete="new-password"
                  placeholder="Password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="p-1"></div>
        <button type="submit" className="cssbuttons-io-button">
          <div className="text-center w-full">Submit</div>
          <div className="icon">
            <svg
              height="24"
              width="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 0h24v24H0z" fill="none"></path>
              <path
                d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
        </button>
      </form>
    </Form>
  );
};

const SignIn = () => {
  return (
    <div className="w-full flex h-screen">
      <div className="w-1/2 bg-teal-500">Image</div>
      <div className="w-1/2 my-auto">
        <div className="flex-col px-24 lg:px-40 xl:px-50 2xl:px-64">
          <div className="text-center font-bold text-3xl p-4 py-6">
            Welcome Back 👋
          </div>
          <div className="">
            <SignInForm />
          </div>
        </div>
      </div>
    </div>
  );
};

// const Loader = () => {
//   const auth = useRecoilValue(authAtom);

//   if(auth.email){
//     redirect({
//       to: "/dashboard",
//     })
//   }

//   return (
//     <>
//     <div>Loading</div>
//     </>
//   )
// }

export const Route = createFileRoute("/sign-in")({
  component: SignIn,
  // loader: Loader
});
