import { createFileRoute, useParams, useRouter } from "@tanstack/react-router";
import { Editor } from "@monaco-editor/react";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { useRecoilState, useRecoilValue } from "recoil";
import Markdown from "markdown-to-jsx";
import { codeAtom } from "@/state/code";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
// import { toast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import {
  getProblemById,
  getProblemSubmissions,
  runCode,
  submitCode,
} from "@/api/problems";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { authAtom } from "@/state/auth";

interface TextEditorProps {
  // language: Specifies the programming language for the editor. It must be one of the predefined options (although you can add more if you want)
  language: 1 | 2 | 3;
  problemId: string;
}

interface SubmissionResponse {
  status: string;
  testcaseResults: {
    status: string;
  }[];
}

const FormSchema = z.object({
  languageId: z.string({
    required_error: "Please select an email to display.",
  }),
  code: z.string({
    required_error: "Please enter code.",
  }),
  input: z.string().optional(),
});

const TextEditor = ({ language, problemId }: TextEditorProps) => {
  const [code, setCode] = useRecoilState(codeAtom);
  // const [languageSelect, setlanguageSelect] = useState<string>("1");
  const [output, setOutput] = useState<string>("Output");
  const [isOutputLoading, setIsOutputLoading] = useState<boolean>(false);
  const [isSubmissionLoading, setIsSubmissionLoading] =
    useState<boolean>(false);
  const [submissionResponse, setSubmissionResponse] =
    useState<SubmissionResponse>();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      languageId: "1",
      code: code,
    },
  });

  const { data: submissions, isLoading } = useQuery({
    queryKey: ["submissions"],
    queryFn: () => getProblemSubmissions(problemId),
  });
  console.log(submissions);



  const setBoilerPlateCode = (value: string) => {
    if (value === "1") {
      setCode(`#include <bits/stdc++.h>
using namespace std;

int main() {

  cout << "Hello World";

  return 0;

}
`);
      form.setValue(
        "code",
        `#include <bits/stdc++.h>
using namespace std;

int main() {

  cout << "Hello World";

  return 0;

}
`
      );
    } else if (value === "3") {
      setCode(`print('Hello World')`);
      form.setValue("code", `print('Hello World')`);
    } else if (value === "2") {
      setCode(`public class Test {
  public static void main(String[] args) {

    System.out.println("Hello World");

  }
}`);
      form.setValue(
        "code",
        `public class Test {
  public static void main(String[] args) {

    System.out.println("Hello World");

  }
}`
      );
    }
  };

  if (!isLoading) {
    if (submissions[submissions?.length - 1]?.code) {
      setCode(submissions[submissions?.length - 1].code);
      // setCode(submissions[submissions?.length - 1].languageId);
    } else {
      setBoilerPlateCode("1");
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setBoilerPlateCode("cpp"), []);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // });
    setIsSubmissionLoading(true);
    await submitCode({
      problemId: parseInt(problemId),
      code: data.code,
      languageId: data.languageId,
    }).then((response) => {
      console.log(response);
      setIsSubmissionLoading(false);
      setSubmissionResponse(response);
    });
  }

  async function onRunCode() {
    const languageId = form.getValues("languageId");
    const code = form.getValues("code");
    const input = form.getValues("input");
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">
    //         "languageId" : {languageId},
    //         "code" : {code},
    //         "input" : {input}
    //       </code>
    //     </pre>
    //   ),
    // });
    setIsOutputLoading(true);
    await runCode({ input, languageId, code }).then((response) => {
      setIsOutputLoading(false);
      setOutput(response.output);
    });
  }

  return (
    <div className="w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6"
        >
          <FormField
            control={form.control}
            name="languageId"
            render={({ field }) => {
              return (
                <FormItem className="w-[180px]">
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      setBoilerPlateCode(value);
                    }}
                    defaultValue={form.getValues("languageId")}
                  >
                    <FormControl>
                      <SelectTrigger className="">
                        <SelectValue placeholder="Select a language" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Language</SelectLabel>
                        <SelectItem value="1">C++</SelectItem>
                        <SelectItem value="2">Java</SelectItem>
                        <SelectItem value="3">Python</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormItem>
              );
            }}
          />
          <Editor
            height="78vh"
            defaultLanguage={
              language === 1
                ? "cpp"
                : language === 2
                  ? "java"
                  : language === 3
                    ? "python"
                    : ""
            }
            value={code}
            onChange={(newValue) => {
              setCode(newValue || "");
              form.setValue("code", newValue || "");
            }}
            theme="vs-dark"
            options={{
              minimap: {
                enabled: false,
              },
              formatOnType: true,
              formatOnPaste: true,
              trimAutoWhitespace: true,
            }}
          />
          <div>
            {submissionResponse && submissionResponse.status === "Accepted" && (
              <div className="text-green-600 text-2xl rounded-sm p-2">
                {submissionResponse.status}
              </div>
            )}
            {submissionResponse && submissionResponse.status !== "Accepted" && (
              <div className="text-red-600 text-2xl rounded-sm p-2">
                {submissionResponse.status}
              </div>
            )}
            <div className="flex gap-2 p-2 flex-wrap">
              {submissionResponse &&
                submissionResponse?.testcaseResults?.map((testcase, index) => (
                  <div className="">
                    {testcase.status === "Passed" ? (
                      <div className="bg-green-600 text-white rounded-sm p-2">
                        Testcase {index + 1}
                      </div>
                    ) : (
                      <div className="bg-red-600 rounded-sm p-2">
                        Testcase {index + 1}
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
          <div>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>Console</AccordionTrigger>
                <AccordionContent>
                  <div className="flex gap-8 w-full">
                    <div className="w-1/2">
                      <FormField
                        control={form.control}
                        name="input"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Textarea placeholder="Enter input" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <Card className="w-1/2 p-2 text-slate-400">
                      <Markdown>
                        {isOutputLoading ? "Loading . . . " : output}
                      </Markdown>
                    </Card>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div className="flex gap-8 w-full">
            <Button
              type="button"
              variant="outline"
              onClick={() => onRunCode()}
              className="w-1/2"
            >
              Run
            </Button>
            <Button
              type="submit"
              disabled={isSubmissionLoading}
              className="w-1/2"
            >
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

const SubmissionsTableProblemPage = ({ problemId }: { problemId: string }) => {
  const { data: submissions, isLoading } = useQuery({
    queryKey: ["submissions"],
    queryFn: () => getProblemSubmissions(problemId),
  });

  if (isLoading) return <div>Loading....</div>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Status</TableHead>
          <TableHead>Submitted at</TableHead>
          {/* <TableHead>Tags</TableHead> */}
          <TableHead>Runtime</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {submissions.map(
          (
            submission: { status: string; createdAt: string; runtime: number },
            index: number
          ) => (
            <TableRow key={index}>
              <TableCell>
                <div className="font-medium">{submission.status}</div>
              </TableCell>
              <TableCell>{submission.createdAt}</TableCell>
              <TableCell>{submission.runtime}</TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </Table>
  );
};

const ProblemDetails = ({ problemId }: { problemId: string }) => {
  const { data: problemsData, isLoading } = useQuery({
    queryKey: ["get-problems-by-id"],
    queryFn: () => getProblemById(problemId),
  });

  if (isLoading) return <div>Loading...</div>;

  console.log(problemsData);

  return (
    <Tabs defaultValue="problem" className="w-full">
      <TabsList>
        <TabsTrigger value="problem">Problem Description</TabsTrigger>
        <TabsTrigger value="submission">Submissions</TabsTrigger>
      </TabsList>
      <TabsContent value="problem">
        <div className="py-8">
          <div className="text-3xl font-bold">
            {problemsData?.problem?.title}
          </div>
          <Badge className="mt-4 text-sm">
            {problemsData?.problem?.difficulty}
          </Badge>
          <div className="mt-4 text-sm">
            <Markdown>{problemsData?.problem?.desc || ""}</Markdown>
          </div>
          <div className="mt-8">
            <h4 className="text-xl font-semibold underline">Input:</h4>
            <div className="mt-4 text-sm">
              <Markdown>{problemsData?.problem?.input || ""}</Markdown>
            </div>
          </div>
          <div className="mt-8">
            <h4 className="text-xl font-semibold underline">Output:</h4>
            <div className="mt-4 text-sm">
              <Markdown>{problemsData?.problem?.output || ""}</Markdown>
            </div>
          </div>
          <div className="mt-8">
            <h4 className="text-xl font-semibold underline">Examples:</h4>
            <div className="mt-4 text-sm">
              {problemsData?.testcases?.map((testcase, index) => (
                <div key={index}>
                  <h4 className="text-lg font-semibold">
                    Sample {index + 1} :
                  </h4>
                  <div className="pl-5 flex flex-col text-base pt-2">
                    <Markdown>{`## **Input**:  ` + testcase?.input}</Markdown>
                    <Markdown>
                      {`## **Expected Output**:  ` + testcase?.expectedOutput}
                    </Markdown>
                    <Markdown>
                      {`## **Explanation**: ` + testcase?.explanation}
                    </Markdown>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="submission">
        <SubmissionsTableProblemPage problemId={problemId} />
      </TabsContent>
    </Tabs>
  );
};

const ProblemPage = () => {
  const router = useRouter();

  const auth = useRecoilValue(authAtom);

  useEffect(() => {
    if (!auth.isAuthenticated) {
      router.history.push("/sign-in");
    }
  }, [auth, router]);

  const params = useParams({ from: "/problem/$problemId" });
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="w-full rounded-lg border"
    >
      <ResizablePanel defaultSize={50}>
        <div className="flex items-center justify-center p-6">
          <ProblemDetails problemId={params.problemId} />
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={50}>
        <div className="flex items-center justify-center p-6">
          <TextEditor language={1} problemId={params.problemId} />
        </div>
      </ResizablePanel>
      <ResizableHandle />
    </ResizablePanelGroup>
  );
};

export const Route = createFileRoute("/problem/$problemId")({
  component: ProblemPage,
});
