import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
// import api from "../../api/axios";
import { Card } from "@/components/ui/card";

import { Calendar } from "@/components/ui/calendar";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@/api/auth";
import { useRecoilValue } from "recoil";
import { authAtom } from "@/state/auth";
import { SubmissionHistory } from "@/components/ui/dashboard/submission-history";
import { ProblemProgress } from "@/components/ui/dashboard/problem-progress";
import { ProblemsHome } from "@/components/ui/dashboard/problems-home";
import { LeaderboardHome } from "@/components/ui/dashboard/leaderboard-home";

export function CalendarDemo() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <Card className="flex items-center px-4">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border shadow"
      />
    </Card>
  );
}

const Dashboard = () => {
  const router = useRouter();

  const auth = useRecoilValue(authAtom);

  useEffect(() => {
    if (!auth.isAuthenticated) {
      router.history.push("/sign-in");
    }
  }, [auth, router]);

  const { data, isLoading } = useQuery({
    queryKey: ["get-profile"],
    queryFn: getProfile,
  });

  console.log(data);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold">Dashboard</h1>
      <div className="flex justify-end py-10 gap-10 w-full">
        <SubmissionHistory />
        <ProblemProgress />

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
