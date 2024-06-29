import { Link, createFileRoute, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
// import api from "../../api/axios";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Calendar } from "@/components/ui/calendar";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@/api/auth";
import { useRecoilValue } from "recoil";
import { authAtom } from "@/state/auth";

export function CalendarDemo() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border shadow"
    />
  );
}

const LeaderboardHome = () => {
  return (
    <Card className="w-2/5">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Leaderboard</CardTitle>
        </div>
        <Button asChild size="sm" className="ml-auto gap-1">
          <Link to="/dashboard">
            View All
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="grid gap-8">
        <div className="flex items-center gap-4">
          <Avatar className="hidden h-9 w-9 sm:flex">
            <AvatarImage src="/avatars/01.png" alt="Avatar" />
            <AvatarFallback>OM</AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <p className="text-sm font-medium leading-none">Olivia Martin</p>
            <p className="text-sm text-muted-foreground">
              olivia.martin@email.com
            </p>
          </div>
          <div className="ml-auto font-medium">1999</div>
        </div>
        <div className="flex items-center gap-4">
          <Avatar className="hidden h-9 w-9 sm:flex">
            <AvatarImage src="/avatars/02.png" alt="Avatar" />
            <AvatarFallback>JL</AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <p className="text-sm font-medium leading-none">Jackson Lee</p>
            <p className="text-sm text-muted-foreground">
              jackson.lee@email.com
            </p>
          </div>
          <div className="ml-auto font-medium">399</div>
        </div>
        <div className="flex items-center gap-4">
          <Avatar className="hidden h-9 w-9 sm:flex">
            <AvatarImage src="/avatars/03.png" alt="Avatar" />
            <AvatarFallback>IN</AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <p className="text-sm font-medium leading-none">Isabella Nguyen</p>
            <p className="text-sm text-muted-foreground">
              isabella.nguyen@email.com
            </p>
          </div>
          <div className="ml-auto font-medium">299</div>
        </div>
        <div className="flex items-center gap-4">
          <Avatar className="hidden h-9 w-9 sm:flex">
            <AvatarImage src="/avatars/04.png" alt="Avatar" />
            <AvatarFallback>WK</AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <p className="text-sm font-medium leading-none">William Kim</p>
            <p className="text-sm text-muted-foreground">will@email.com</p>
          </div>
          <div className="ml-auto font-medium">99</div>
        </div>
        <div className="flex items-center gap-4">
          <Avatar className="hidden h-9 w-9 sm:flex">
            <AvatarImage src="/avatars/05.png" alt="Avatar" />
            <AvatarFallback>SD</AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <p className="text-sm font-medium leading-none">Sofia Davis</p>
            <p className="text-sm text-muted-foreground">
              sofia.davis@email.com
            </p>
          </div>
          <div className="ml-auto font-medium">39</div>
        </div>
      </CardContent>
    </Card>
  );
};

const ProblemsHome = () => {
  return (
    <Card className="xl:col-span-2 w-3/5">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Problems</CardTitle>
        </div>
        <Button asChild size="sm" className="ml-auto gap-1">
          <Link to="/dashboard">
            View All
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Problem</TableHead>
              <TableHead className="hidden xl:table-column">Type</TableHead>
              <TableHead className="hidden xl:table-column">Status</TableHead>
              <TableHead className="hidden xl:table-column">Date</TableHead>
              <TableHead className="text-right">Difficulty</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <div className="font-medium">Merge Two Sorted Arrays</div>
                <div className="hidden text-sm text-muted-foreground md:inline">
                  Topics: Arrays ...
                </div>
              </TableCell>
              <TableCell className="hidden xl:table-column">Sale</TableCell>
              <TableCell className="hidden xl:table-column">
                <Badge className="text-xs" variant="outline">
                  Approved
                </Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                2023-06-23
              </TableCell>
              <TableCell className="text-right">Medium</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <div className="font-medium">Merge Two Sorted Arrays</div>
                <div className="hidden text-sm text-muted-foreground md:inline">
                  Topics: Arrays ...
                </div>
              </TableCell>
              <TableCell className="hidden xl:table-column">Refund</TableCell>
              <TableCell className="hidden xl:table-column">
                <Badge className="text-xs" variant="outline">
                  Declined
                </Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                2023-06-24
              </TableCell>
              <TableCell className="text-right">Hard</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <div className="font-medium">Merge Two Sorted Arrays</div>
                <div className="hidden text-sm text-muted-foreground md:inline">
                  Topics: Arrays ...
                </div>
              </TableCell>
              <TableCell className="hidden xl:table-column">Refund</TableCell>
              <TableCell className="hidden xl:table-column">
                <Badge className="text-xs" variant="outline">
                  Declined
                </Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                2023-06-24
              </TableCell>
              <TableCell className="text-right">Hard</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <div className="font-medium">Merge Two Sorted Arrays</div>
                <div className="hidden text-sm text-muted-foreground md:inline">
                  Topics: Arrays ...
                </div>
              </TableCell>
              <TableCell className="hidden xl:table-column">Refund</TableCell>
              <TableCell className="hidden xl:table-column">
                <Badge className="text-xs" variant="outline">
                  Declined
                </Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                2023-06-24
              </TableCell>
              <TableCell className="text-right">Hard</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

const ProgressHome = () => {
  return (
    <Card className="w-[22%]">
      <CardHeader className="pb-2">
        <CardDescription className="text-2xl pb-8">Progress</CardDescription>
        <CardTitle className="text-7xl pb-8">25/100</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-xs text-muted-foreground"></div>
      </CardContent>
      <CardFooter className="pt-10">
        <Progress value={25} aria-label="25% increase" />
      </CardFooter>
    </Card>
  );
};

const Dashboard = () => {

  const router = useRouter();

  const auth = useRecoilValue(authAtom);

  useEffect(() => {
    if (!auth.isAuthenticated) {
      router.history.push('/sign-in');
    }
  }, [auth, router])

  const { data, isLoading } = useQuery({
    queryKey: ['get-profile'],
    queryFn: getProfile,
  })

  console.log(data);

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold">Dashboard</h1>
      <div className="flex justify-end pb-10 gap-10 w-full">
        <ProgressHome />
        <CalendarDemo />
      </div>
      <div className="flex w-full gap-10">
        <ProblemsHome />
        <LeaderboardHome />
      </div>
    </div>
  );
};

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
});
