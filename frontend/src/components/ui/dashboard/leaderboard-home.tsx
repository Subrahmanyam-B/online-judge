import { Link } from "@tanstack/react-router";
import { Button } from "../button";
import { Card, CardContent, CardHeader, CardTitle } from "../card";
import { ArrowUpRight } from "lucide-react";
import { Avatar, AvatarFallback } from "../avatar";

type LeaderBoardItem = {
  displayName: string;
  totalPoints: number;
};

export const LeaderboardHome = ({
  leaderboard,
}: {
  leaderboard: LeaderBoardItem[];
}) => {
  return (
    <Card className="w-2/5 ">
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
        {leaderboard?.slice(0, 5).map((item) => {
          return (
            <div key={item.displayName} className="flex items-center gap-4">
              <Avatar className="hidden h-9 w-9 sm:flex">
                <AvatarFallback>
                  {item.displayName.slice(0, 1).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">
                  {item.displayName}
                </p>
              </div>
              <div className="ml-auto font-medium">{item.totalPoints}</div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
