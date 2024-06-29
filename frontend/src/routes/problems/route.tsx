// import { Badge } from "@/components/ui/badge";
import { getProblems } from "@/api/problems";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";

type ProblemData = {
  id: number;
  title: string;
  difficulty: string;
  // tags: string[];
  createdBy: string;
  createdAt: string;
};

const Problems = () => {

  const {data, isLoading} = useQuery({
    queryKey: ["get-problems"],
    queryFn: getProblems,
  });

  if(isLoading) return <div>Loading...</div>;


  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-10">Problems</h1>
      <div className="mx-auto w-full max-w-7xl overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Difficulty</TableHead>
              {/* <TableHead>Tags</TableHead> */}
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
          {data.map((problem : ProblemData, index : number) => (
            <TableRow key={index}>
            <TableCell>
              <div className="font-medium">{problem.title}</div>
            </TableCell>
            <TableCell>{problem.difficulty}</TableCell>
            {/* <TableCell>
              <div className="flex flex-wrap gap-1">
                <Badge>CSS</Badge>
                <Badge>Utility</Badge>
                <Badge>Framework</Badge>
              </div>
            </TableCell> */}
            <TableCell>
              <Link to={"/problem/" + problem.id}>
                <Button>
                  Solve <ExternalLink className="h-4 w-4 ml-4" />
                </Button>
              </Link>
            </TableCell>
          </TableRow>
          ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export const Route = createFileRoute("/problems")({
  component: Problems,
});
