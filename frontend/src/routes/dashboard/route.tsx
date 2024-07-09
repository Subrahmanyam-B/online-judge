import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
// import api from "../../api/axios";
import { Card } from "@/components/ui/card";

import { Calendar } from "@/components/ui/calendar";
import { useQuery } from "@tanstack/react-query";
import { getLeaderboard, getProfile, getSolvedProblems } from "@/api/auth";
import { useRecoilValue } from "recoil";
import { authAtom } from "@/state/auth";
import { SubmissionHistory } from "@/components/ui/dashboard/submission-history";
import { ProblemProgress } from "@/components/ui/dashboard/problem-progress";
import { ProblemsHome } from "@/components/ui/dashboard/problems-home";
import { LeaderboardHome } from "@/components/ui/dashboard/leaderboard-home";
import { getSubmissionHistory } from "@/api/submissions";
import { getProblems } from "@/api/problems";

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

  const { data: chatData, isLoading: isSubmissionHistoryLoading } = useQuery({
    queryKey: ["submission-history"],
    queryFn: getSubmissionHistory,
  });

  const { data: allProblems, isLoading: areProblemsLoading } = useQuery({
    queryKey: ["get-problems"],
    queryFn: getProblems,
  });

  const { data: problemsSolved, isLoading: areSolvedProblemsLoading } =
    useQuery({
      queryKey: ["problems-solved"],
      queryFn: getSolvedProblems,
    });

  const { data: leaderBoard, isLoading: isLeaderboardLoading } = useQuery({
    queryKey: ["leaderboard"],
    queryFn: getLeaderboard,
  });

  console.log(data);

  if (
    isLoading &&
    isSubmissionHistoryLoading &&
    areSolvedProblemsLoading &&
    areProblemsLoading &&
    isLeaderboardLoading
  ) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold">Dashboard</h1>
      <div className="flex justify-end py-10 gap-10 w-full">
        <SubmissionHistory chartData={chatData} />
        <ProblemProgress
          totalCount={allProblems?.length}
          solvedCount={problemsSolved?.length}
        />

        <CalendarDemo />
      </div>
      <div className="flex w-full gap-10">
        <ProblemsHome problems={allProblems} />
        <LeaderboardHome leaderboard={leaderBoard} />
      </div>
    </div>
  );
};

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
});
