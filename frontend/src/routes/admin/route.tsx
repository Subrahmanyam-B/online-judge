import { createProblem } from "@/api/problems";
import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Command, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { toast } from "@/components/ui/use-toast";
import { authAtom } from "@/state/auth";
import { manageSidebarAtom } from "@/state/manage-sidebar";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { LayoutDashboard } from "lucide-react";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { z } from "zod";


const UpdateProblemCard = () => {
  return (
    <div>UpdateProblemCard</div>
  )
}

const DeleteProblemCard = () => {
  return (
    <div>DeleteProblemCard</div>
  )
}



const CreateProblemCard = () => {
  const testCaseSchema = z.object({
    input: z.string(),
    expectedOutput: z.string(),
    isSample: z.boolean(),
    explanation: z.string(),
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
        })
      }
    })
  }

  return (
    <Card className="max-w-[50rem]">
      <CardHeader className="text-xl font-semibold">Create Problem</CardHeader>
      <CardContent className="p-4">
        <AutoForm formSchema={createProblemInputSchema} onSubmit={onSubmit} fieldConfig={{

          desc: {
            fieldType: "textarea",
          }
        }}>
          <AutoFormSubmit >Submit</AutoFormSubmit>
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
          text: "Update Problem",
        },
        {
          tab: "delete",
          icon: <LayoutDashboard />,
          text: "Delete Problem",
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
              {auth.user?.role === 'admin' && problemManageList.map((menu: any, key: number) => (
                <CommandGroup key={key} heading={menu.group}>
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
          {currentTab === 'create' &&
            <CreateProblemCard />
          }
          {
            currentTab === 'update' &&
            <UpdateProblemCard />
          }
          {
            currentTab === 'delete' &&
            <DeleteProblemCard />
          }
        </div>
      </div>
    </div>
  );
};

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});


//   function validationTest(){
//     try {
//         const exampleInput = {
//             title: "Sample Problem",
//             difficulty: "easy",
//             desc: "This is a sample problem description.",
//             input: "Input description here.",
//             output: "Output description here.",
//             constraints: "Constraints description here.",
//             timeLimit: 1.5,
//             testcases: [
//               {
//                 input: "test input 1",
//                 expectedOutput: "expected output 1",
//                 isSample: true,
//                 explanation: "Explanation for test case 1"
//               },
//               {
//                 input: "test input 2",
//                 expectedOutput: "expected output 2",
//                 isSample: false,
//                 explanation: "Explanation for test case 2"
//               },
//             ],
//           };
//         createProblemInputSchema.parse(exampleInput);
//         console.log("Validation successful!");
//       } catch (e) {
//         console.error("Validation failed:", e);
//       }
//   }
