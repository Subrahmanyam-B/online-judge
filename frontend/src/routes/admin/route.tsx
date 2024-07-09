/* eslint-disable @typescript-eslint/no-explicit-any */
import { createProblem, getProblems, updateProblem } from "@/api/problems";
import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { toast } from "@/components/ui/use-toast";
import { authAtom } from "@/state/auth";
import { manageSidebarAtom } from "@/state/manage-sidebar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import {
  EllipsisVertical,
  FilePenIcon,
  LayoutDashboard,
  TrashIcon,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { z } from "zod";

type ProblemData = {
  id: number;
  title: string;
  difficulty: string;
  desc: string;
  input: string;
  output: string;
  constraints: string;
  timeLimit: number;
  testcases: {
    input: string;
    expectedOutput: string;
    isSample: boolean;
    explanation: string;
  }[];
};

const UpdateProblemForm = ({
  problem,
  setIsFormOpen,
}: {
  problem: ProblemData;
  setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const testCaseSchema = z.object({
    input: z.string(),
    expectedOutput: z.string(),
    isSample: z.boolean(),
    explanation: z.string(),
  });

  // Define the schema for the CreateProblemInput
  const updateProblemInputSchema = z.object({
    title: z.string().optional(),
    difficulty: z.enum(["easy", "medium", "hard"]).optional(), // Assuming difficulty is one of these three values
    desc: z.string().optional(),
    input: z.string().optional(),
    output: z.string().optional(),
    constraints: z.string().optional(),
    timeLimit: z.number().optional(),
    testcases: z.array(testCaseSchema).optional(),
  });

  async function onSubmit(values: z.infer<typeof updateProblemInputSchema>) {
    await updateProblem(String(problem.id), values).then((response) => {
      console.log(response);
      if (response) {
        toast({
          title: "Problem Updated",
          description: "Your problem has been created successfully.",
          variant: "default",
        });
      }
    });
  }

  return (
    <Card className="max-w-[50rem] w-full">
      <CardHeader className="text-xl font-semibold flex flex-row justify-between">
        <div>Update Problem</div>
        <Button
          onClick={() => setIsFormOpen(false)}
          className="px-3"
          variant="outline"
        >
          <X className="w-4 h-4" />
        </Button>
      </CardHeader>
      <CardContent className="p-4">
        <AutoForm
          formSchema={updateProblemInputSchema}
          onSubmit={onSubmit}
          fieldConfig={{
            desc: {
              fieldType: "textarea",
              inputProps: {
                value: problem.desc,
                defaultValue: problem.desc,
              },
            },
            title: {
              inputProps: {
                value: problem.title,
                defaultValue: problem.title,
              },
            },
            difficulty: {
              inputProps: {
                value: problem.difficulty,
                defaultValue: problem.difficulty,
              },
            },
            input: {
              inputProps: {
                value: problem.input,
                defaultValue: problem.input,
              },
            },
            output: {
              inputProps: {
                value: problem.output,
                defaultValue: problem.output,
              },
            },
            constraints: {
              inputProps: {
                value: problem.constraints,
                defaultValue: problem.constraints,
              },
            },
            timeLimit: {
              inputProps: {
                value: problem.timeLimit,
                defaultValue: problem.timeLimit,
              },
            },
          }}
        >
          <AutoFormSubmit>Submit</AutoFormSubmit>
        </AutoForm>
        {/* <Button onClick={validationTest}>Test</Button> */}
      </CardContent>
    </Card>
  );
};

const UpdateProblemCard = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["get-problems"],
    queryFn: getProblems,
  });
  console.log(data);

  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [currentProblem, setProblem] = useState<ProblemData>();

  if (isLoading) return <div>Loading...</div>;

  return (
    <Card>
      <Card className="flex p-4 justify-center w-full">
        {isFormOpen && currentProblem && (
          <UpdateProblemForm
            problem={currentProblem}
            setIsFormOpen={setIsFormOpen}
          />
        )}
      </Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Difficulty</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((problem: ProblemData, index: number) => (
            <TableRow key={index}>
              <TableCell>
                <div className="font-medium">{problem.title}</div>
              </TableCell>
              <TableCell>{problem.difficulty}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="px-3" variant="outline">
                      <EllipsisVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => {
                        setIsFormOpen(true);
                        setProblem(problem);
                      }}
                    >
                      <FilePenIcon className="mr-2 h-4 w-4" />
                      <span>Update</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <TrashIcon className="mr-2 h-4 w-4" />
                      <span>Delete</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

const DeleteProblemCard = () => {
  return <div>DeleteProblemCard</div>;
};

const CreateProblemCard = () => {
  const testCaseSchema = z.object({
    input: z.string(),
    expectedOutput: z.string(),
    isSample: z.boolean().optional(),
    explanation: z.string().optional(),
  });

  // Define the schema for the CreateProblemInput
  const createProblemInputSchema = z.object({
    title: z.string(),
    difficulty: z.enum(["easy", "medium", "hard"]), // Assuming difficulty is one of these three values
    desc: z.string(),
    input: z.string(),
    output: z.string(),
    constraints: z.string(),
    timeLimit: z.number(),
    testcases: z.array(testCaseSchema),
  });

  async function onSubmit(values: z.infer<typeof createProblemInputSchema>) {
    await createProblem(values).then((response) => {
      if (response) {
        toast({
          title: "Problem Created",
          description: "Your problem has been created successfully.",
          variant: "default",
        });
      }
    });
  }

  return (
    <Card className="max-w-[50rem]">
      <CardHeader className="text-xl font-semibold">Create Problem</CardHeader>
      <CardContent className="p-4">
        <AutoForm
          formSchema={createProblemInputSchema}
          onSubmit={onSubmit}
          fieldConfig={{
            desc: {
              fieldType: "textarea",
            },
          }}
        >
          <AutoFormSubmit>Submit</AutoFormSubmit>
        </AutoForm>
        {/* <Button onClick={validationTest}>Test</Button> */}
      </CardContent>
    </Card>
  );
};

const AdminPage = () => {
  const router = useRouter();
  const auth = useRecoilValue(authAtom);
  const [currentTab, setCurrentTab] = useRecoilState(manageSidebarAtom);

  const problemManageList = [
    {
      group: "Problems",
      items: [
        {
          tab: "create",
          icon: <LayoutDashboard />,
          text: "Create Problem",
        },
        {
          tab: "update",
          icon: <LayoutDashboard />,
          text: "Update or Delete Problem",
        },
      ],
    },
    // {
    //   group: "Settings",
    //   items: [
    //     {
    //       link: "/profile",
    //       icon: <User />,
    //       text: "Profile Settings",
    //     },
    //   ],
    // },
  ];

  useEffect(() => {
    if (!auth.isAuthenticated && auth.user?.role === "admin") {
      router.history.push("/sign-in");
    }
  }, [auth, router]);

  return (
    <div className="p-10">
      <div className="text-3xl font-bold mb-10">Manage</div>
      <div className="flex gap-4 w-full">
        <Card className="p-8 w-1/5">
          <Command style={{ overflow: "visible" }}>
            <CommandList style={{ overflow: "visible" }}>
              {auth.user?.role === "admin" &&
                problemManageList.map((menu: any, key: number) => (
                  <CommandGroup key={key} heading={menu.group}>
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {menu.items.map((option: any, optionKey: number) => (
                      <CommandItem
                        key={optionKey}
                        className="flex gap-2 cursor-pointer"
                        // onClick={()=>setCurrentTab(option.tab)}
                        onPointerDown={() => setCurrentTab(option.tab)}
                      >
                        {option.icon}
                        {option.text}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                ))}
            </CommandList>
          </Command>
        </Card>
        <div className="w-3/5">
          {currentTab === "create" && <CreateProblemCard />}
          {currentTab === "update" && <UpdateProblemCard />}
          {currentTab === "delete" && <DeleteProblemCard />}
        </div>
      </div>
    </div>
  );
};

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});
