import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../card";
import { Button } from "../button";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { GetProblem } from "@/api/problems";

export const ProblemsHome = ({ problems }: { problems: GetProblem[] }) => {
  return (
    <Card className="xl:col-span-2 w-3/5">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Problems</CardTitle>
        </div>
        <Button asChild size="sm" className="ml-auto gap-1">
          <Link to="/problems">
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
              <TableHead className="text-right">Difficulty</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {problems?.slice(0, 5).map((problem) => {
              return (
                <TableRow key={problem.title}>
                  <TableCell>
                    <div className="font-medium">{problem.title}</div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge>{problem.difficulty}</Badge>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
