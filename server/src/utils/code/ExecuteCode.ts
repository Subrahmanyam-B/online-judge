import fs from "fs";
import path from "path";
import { executeCpp, executePython, executeJava } from "./execute";
import { Testcase } from "../../db/schema";

const DEFAULT_TIMEOUT = 5; // Default timeout in seconds

export const executionCpp = async (cppCode: string, testcases: Testcase[], timeout: number = DEFAULT_TIMEOUT) => {
  const tempDir = fs.mkdtempSync(path.join(__dirname, "temp-"));
  const tempFilePath = path.join(tempDir, "test.cpp");

  // Write the C++ code to a temporary file
  fs.writeFileSync(tempFilePath, cppCode);

  try {
    for (const [index, { input, expectedOutput }] of testcases.entries()) {
      try {
        // Execute the C++ code
        const output = await executeCpp(tempFilePath, input, timeout);

        // Verify the output
        console.log(`Test Case ${index + 1}`);
        console.log("Input:", input);
        console.log("Output:", output);
        console.log("Expected Output:", expectedOutput);
        console.log(`Test ${output.trim() === expectedOutput.trim() ? "Passed" : "Failed"}`);
        console.log('-----------------------');
      } catch (error) {
        console.error(`Error during execution for Test Case ${index + 1}:`, error.message);
      }
    }
  } finally {
    // Clean up the temporary files and directory
    fs.unlinkSync(tempFilePath);
    fs.rmdirSync(tempDir);
  }
};

export const executionJava = async (javaCode: string, testcases: Testcase[], timeout: number = DEFAULT_TIMEOUT) => {
  const tempDir = fs.mkdtempSync(path.join(__dirname, "temp-"));
  const tempFilePath = path.join(tempDir, "Test.java");

  // Write the Java code to a temporary file
  fs.writeFileSync(tempFilePath, javaCode);

  try {
    for (const [index, { input, expectedOutput }] of testcases.entries()) {
      try {
        // Execute the Java code
        const output = await executeJava(tempFilePath, input, timeout);

        // Verify the output
        console.log(`Test Case ${index + 1}`);
        console.log("Input:", input);
        console.log("Output:", output);
        console.log("Expected Output:", expectedOutput);
        console.log(`Test ${output.trim() === expectedOutput.trim() ? "Passed" : "Failed"}`);
        console.log('-----------------------');
      } catch (error) {
        console.error(`Error during execution for Test Case ${index + 1}:`, error.message);
      }
    }
  } finally {
    // Clean up the temporary files and directory
    fs.unlinkSync(tempFilePath);
    fs.rmdirSync(tempDir);
  }
};

export const executionPython = async (pythonCode: string, testcases: Testcase[], timeout: number = DEFAULT_TIMEOUT) => {
  const tempDir = fs.mkdtempSync(path.join(__dirname, "temp-"));
  const tempFilePath = path.join(tempDir, "test.py");

  // Write the Python code to a temporary file
  fs.writeFileSync(tempFilePath, pythonCode);

  try {
    for (const [index, { input, expectedOutput }] of testcases.entries()) {
      try {
        // Execute the Python code
        const output = await executePython(tempFilePath, input, timeout);

        // Verify the output
        console.log(`Test Case ${index + 1}`);
        console.log("Input:", input);
        console.log("Output:", output);
        console.log("Expected Output:", expectedOutput);
        console.log(`Test ${output.trim() === expectedOutput.trim() ? "Passed" : "Failed"}`);
        console.log('-----------------------');
      } catch (error) {
        console.error(`Error during execution for Test Case ${index + 1}:`, error.message);
      }
    }
  } finally {
    // Clean up the temporary files and directory
    fs.unlinkSync(tempFilePath);
    fs.rmdirSync(tempDir);
  }
};

export const RunCpp = async (cppCode: string, input: string, timeout: number = DEFAULT_TIMEOUT): Promise<{ status: number, output: string }> => {
  const tempDir = fs.mkdtempSync(path.join(__dirname, "temp-"));
  const tempFilePath = path.join(tempDir, "test.cpp");

  // Write the C++ code to a temporary file
  fs.writeFileSync(tempFilePath, cppCode);

  try {
    // Execute the C++ code
    const output = await executeCpp(tempFilePath, input, timeout);
    return { status: 200, output };
  } catch (error) {
    return { status: 400, output: error.message };
  } finally {
    // Clean up the temporary files and directory
    fs.unlinkSync(tempFilePath);
    fs.rmdirSync(tempDir);
  }
};

export const RunJava = async (javaCode: string, input: string, timeout: number = DEFAULT_TIMEOUT): Promise<{ status: number, output: string }> => {
  const tempDir = fs.mkdtempSync(path.join(__dirname, "temp-"));
  const tempFilePath = path.join(tempDir, "Test.java");

  // Write the Java code to a temporary file
  fs.writeFileSync(tempFilePath, javaCode);

  try {
    // Execute the Java code
    const output = await executeJava(tempFilePath, input, timeout);
    return { status: 200, output };
  } catch (error) {
    return { status: 400, output: error.message };
  } finally {
    // Clean up the temporary files and directory
    fs.unlinkSync(tempFilePath);
    fs.rmdirSync(tempDir);
  }
};

export const RunPython = async (pythonCode: string, input: string, timeout: number = DEFAULT_TIMEOUT): Promise<{ status: number, output: string }> => {
  const tempDir = fs.mkdtempSync(path.join(__dirname, "temp-"));
  const tempFilePath = path.join(tempDir, "test.py");

  // Write the Python code to a temporary file
  fs.writeFileSync(tempFilePath, pythonCode);

  try {
    // Execute the Python code
    const output = await executePython(tempFilePath, input, timeout);
    return { status: 200, output };
  } catch (error) {
    return { status: 400, output: error.message };
  } finally {
    // Clean up the temporary files and directory
    fs.unlinkSync(tempFilePath);
    fs.rmdirSync(tempDir);
  }
};
