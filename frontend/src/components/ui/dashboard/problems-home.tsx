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

export const ProblemsHome = () => {
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
