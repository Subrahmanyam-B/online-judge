import { register } from "@/api/auth";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AuthPayload, ValidateSignature } from "@/lib/auth";
import { authAtom } from "@/state/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { z } from "zod";

const formSchema = z.object({
  firstName: z
    .string()
    .min(2, {
      message: "First name must be at least 2 characters",
    })
    .max(30, {
      message: "First name must be at most 30 characters",
    }),
  lastName: z
    .string()
    .min(2, {
      message: "Last name must be at least 2 characters",
    })
    .max(30, {
      message: "Last name must be at most 30 characters",
    }),
  displayName: z
    .string()
    .min(2, {
      message: "Display name must be at least 2 characters",
    })
    .max(30, {
      message: "Display name must be at most 30 characters",
    }),
  email: z.string().email({ message: "Enter a valid email" }),
  password: z.string().min(8).max(30),
  confirmPassword: z.string().min(8).max(30),
});

const SignUpForm = () => {
  const router = useRouter();

  const [auth, setAuth] = useRecoilState(authAtom);

  useEffect(() => {
    if (auth.isAuthenticated) {
      router.history.push('/dashboard');
    }
  }, [auth, router])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      register(
        values.firstName,
        values.lastName,
        values.displayName,
        values.email,
        values.password
      )        .then((response) => {
        if (response.accessToken) {
          return ValidateSignature();
        }
        throw new Error("SignUp failed");
      })
      .then((payload: AuthPayload | false) => {
        if (payload) {
          setAuth({ isAuthenticated: true, user: payload })
          router.history.push("/dashboard");
        }
      });
      
      router.history.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="First Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Last Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="displayName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Display Name" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="password"
                  autoComplete="new-password"
                  placeholder="Confirm Password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <Button type="submit" className='w-full'>Submit</Button> */}
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

const SignUp = () => {
  return (
    <div className="w-full flex h-screen">
      <div className="w-1/2 bg-teal-500">Image</div>
      <div className="w-1/2 my-auto">
        <div className="flex-col px-24 lg:px-40 xl:px-50 2xl:px-64">
          <div className="text-center font-bold text-3xl p-4 py-6">
            Register
          </div>
          <div className="">
            <SignUpForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export const Route = createFileRoute("/sign-up")({
  component: SignUp,
});
