import { createFileRoute, useParams } from "@tanstack/react-router";
import { Editor } from "@monaco-editor/react";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { useRecoilState } from "recoil";
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
import { toast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { getProblemById } from "@/api/problems";
import { Badge } from "@/components/ui/badge";
import { useEffect } from "react";

interface TextEditorProps {
  // language: Specifies the programming language for the editor. It must be one of the predefined options (although you can add more if you want)
  language: "python" | "java" | "cpp";
}

const FormSchema = z.object({
  language: z.string({
    required_error: "Please select an email to display.",
  }),
  code: z.string({
    required_error: "Please enter code.",
  }),
  input: z.string().optional(),
});

const TextEditor = ({ language }: TextEditorProps) => {
  const [code, setCode] = useRecoilState(codeAtom);

  const setBoilerPlateCode = (value: string) => {
    if (value === "cpp") {
      setCode(`#include <bits/stdc++.h>
using namespace std;

int main() {

  cout << "Hello World";

  return 0;

}
`);
    } else if (value === "python") {
      setCode(`print('Hello World')`);
    } else if (value === "java") {
      setCode(`public class Main {
  public static void main(String[] args) {

    System.out.println("Hello World");

  }
}`);
    }
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      language: "cpp",
    }
  });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(()=> setBoilerPlateCode("cpp"), [])

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  function onRunCode() {
    const language = form.getValues("language");
    const code = form.getValues("code");
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">
            {JSON.stringify({ language, code }, null, 2)}
          </code>
        </pre>
      ),
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
            name="language"
            render={({ field }) => {
              return (
                <FormItem className="w-[180px]">
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      setBoilerPlateCode(value);
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="">
                        <SelectValue placeholder="Select a language" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Language</SelectLabel>
                        <SelectItem value="cpp">C++</SelectItem>
                        <SelectItem value="python">Python</SelectItem>
                        <SelectItem value="java">Java</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormItem>
              );
            }}
          />
          <Editor
            height="78vh"
            defaultLanguage={language}
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
                    <Card className="w-1/2 p-2 text-slate-400">Output</Card>
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
            <Button type="submit" className="w-1/2">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

const ProblemDetails = () => {
  const params = useParams({ from: "/problem/$problemId" });

  const { data: problemsData, isLoading } = useQuery({
    queryKey: ["get-problems-by-id"],
    queryFn: () => getProblemById(params.problemId),
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
          <div className="text-3xl font-bold">{problemsData?.title}</div>
          <Badge className="mt-4 text-sm">{problemsData?.difficulty}</Badge>
          <div className="mt-4 text-sm">
            <Markdown>{problemsData?.desc || ""}</Markdown>
          </div>
          <div className="mt-8">
            <h4 className="text-xl font-semibold underline">Input:</h4>
            <div className="mt-4 text-sm">
              <Markdown>{problemsData?.input || ""}</Markdown>
            </div>
          </div>
          <div className="mt-8">
            <h4 className="text-xl font-semibold underline">Output:</h4>
            <div className="mt-4 text-sm">
              <Markdown>{problemsData?.output || ""}</Markdown>
            </div>
          </div>
          <div className="mt-8">
            <h4 className="text-xl font-semibold underline">Examples:</h4>
            <div className="mt-4 text-sm">
              {problemsData?.testcase.map((testcase, index) => (
                <div key={index}>
                  <h4 className="text-lg font-semibold">Sample {index +1} :</h4>
                  <div className="pl-5 flex flex-col text-base pt-2">
                  <Markdown>{`## **Input**:  `+ testcase?.input}</Markdown>
                  <Markdown>{`## **Expected Output**:  `+ testcase?.expectedOutput}</Markdown>
                  <Markdown>{`## **Explanation**: `+ testcase?.explanation}</Markdown>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="submission">No Data Available</TabsContent>
    </Tabs>
  );
};

const ProblemPage = () => {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="w-full rounded-lg border"
    >
      <ResizablePanel defaultSize={50}>
        <div className="flex items-center justify-center p-6">
          <ProblemDetails />
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={50}>
        <div className="flex items-center justify-center p-6">
          <TextEditor language="cpp" />
        </div>
      </ResizablePanel>
      <ResizableHandle />
    </ResizablePanelGroup>
  );
};

export const Route = createFileRoute("/problem/$problemId")({
  component: ProblemPage,
});
