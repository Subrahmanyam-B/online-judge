import { createFileRoute, useRouter } from "@tanstack/react-router";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  QueryObserverResult,
  RefetchOptions,
  useQuery,
} from "@tanstack/react-query";
import { getProfile, updateProfile } from "@/api/auth";
import { toast } from "@/components/ui/use-toast";
import { useRecoilValue } from "recoil";
import { authAtom } from "@/state/auth";
import { useEffect } from "react";

const formSchema = z.object({
  firstName: z.string().min(1).max(255),
  lastName: z.string().min(1).max(255),
  email: z.string().email().min(1).max(255),
  displayName: z.string().min(1).max(255),
});

type ProfileData = {
  firstName: string;
  lastName: string;
  email: string;
  displayName: string;
};

function ProfileSettings() {
  const router = useRouter();

  const auth = useRecoilValue(authAtom);

  useEffect(() => {
    if (!auth.isAuthenticated) {
      router.history.push("/sign-in");
    }
  }, [auth, router]);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["get-profile"],
    queryFn: getProfile,
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-10">
      <div className="px-4 space-y-6 sm:px-6">
        <header className="space-y-2">
          <div className="flex items-center space-x-3">
            <Avatar className="h-[5rem] w-[5rem]">
              <AvatarFallback className="text-2xl">
                {data.firstName.charAt(0) + data.lastName.charAt(0)}
              </AvatarFallback>
            </Avatar>{" "}
            <div className="space-y-1">
              <h1 className="text-2xl font-bold">
                {data.firstName + " " + data.lastName}{" "}
              </h1>
            </div>
          </div>
        </header>
        <div className="space-y-8">
          <Card>
            <CardHeader>General Info</CardHeader>
            <CardContent className="">
              <MyForm data={data} refetch={refetch} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div>Change Password</div>
              <div>
                For your security, please do not share your password with
                others.
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input type="password" id="current-password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input type="password" id="new-password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input type="password" id="confirm-password" />
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="pt-6">
          <Button>Save</Button>
        </div>
      </div>
    </div>
  );
}

export function MyForm({
  data,
  refetch,
}: {
  data: ProfileData;
  refetch: (
    options?: RefetchOptions | undefined
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ) => Promise<QueryObserverResult<any, Error>>;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: data?.firstName,
      lastName: data?.lastName,
      email: data?.email,
      displayName: data?.displayName,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await updateProfile(values);
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully.",
      variant: "default",
    });
    refetch();
  }

  return (
    <Form {...form}>
      <form
        noValidate
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <div className="flex gap-10 w-full">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="username" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Placeholder" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Email" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="displayName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Display Name</FormLabel>
              <FormControl>
                <Input placeholder="Placeholder" {...field} />
              </FormControl>
              <FormDescription>Description</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export const Route = createFileRoute("/profile")({
  component: ProfileSettings,
});
