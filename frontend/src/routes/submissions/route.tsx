import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { createFileRoute } from "@tanstack/react-router";

const Submissions = () => {
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-10">Submissions</h1>
      <div className="mx-auto w-full max-w-7xl overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Problem</TableHead>
              <TableHead>Result</TableHead>
              <TableHead>Runtime</TableHead>
              <TableHead>Language</TableHead>
              <TableHead>SubmittedAt</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <div className="font-medium">Tailwind CSS Documentation</div>
              </TableCell>
              <TableCell>Accepted</TableCell>
              <TableCell>
               <div className="font-medium">2000ms</div>
              </TableCell>
              <TableCell>
<div className="font-medium">C++</div>
              </TableCell>
              <TableCell>
<div className="font-medium">2 days ago</div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export const Route = createFileRoute("/submissions")({
  component: Submissions,
});
