import fs from "fs";
import path from "path";
import { executeCpp } from "./execute"; // Ensure executeCpp handles asynchronous execution properly

const executionCpp = async (cppCode, testcases) => {
  const tempDir = fs.mkdtempSync(path.join(__dirname, "temp-"));
  const tempFilePath = path.join(tempDir, "test.cpp");

  // Write the C++ code to a temporary file
  fs.writeFileSync(tempFilePath, cppCode);

  try {
    for (const [index, { input, expectedOutput }] of testcases.entries()) {
      try {
        // Execute the C++ code
        const output = await executeCpp(tempFilePath, input);

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

// Example usage with C++ code and test cases
const cppCode = `
#include <iostream>
using namespace std;

int main() {
    int a, b;
    cin >> a >> b;
    cout << a + b << endl;
    return 0;
}
`;

const testcases = [
  { input: "3 4\n", expectedOutput: "7\n" },
  { input: "10 20\n", expectedOutput: "30\n" },
  { input: "0 0\n", expectedOutput: "0\n" },
];

executionCpp(cppCode, testcases);
