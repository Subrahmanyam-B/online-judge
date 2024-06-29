import fs from "fs";
import path from "path";
import { executeCpp } from "./execute";

const testCppExecution = async () => {
  const tempDir = fs.mkdtempSync(path.join(__dirname, "temp-"));
  const tempFilePath = path.join(tempDir, "test.cpp");

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

  const userInput = "3 4\n";
  const expectedOutput = "7\n";

  // Write the C++ code to a temporary file
  fs.writeFileSync(tempFilePath, cppCode);

  try {
    // Execute the C++ code
    const output = executeCpp(tempFilePath, userInput);

    // Verify the output
    console.log("Output:", output);
    console.log("Expected Output:", expectedOutput);
    console.log(`Test ${output.trim() === expectedOutput.trim() ? "Passed" : "Failed"}`);
  } catch (error) {
    console.error("Error during execution:", error.message);
  } finally {
    // Clean up the temporary files and directory
    fs.unlinkSync(tempFilePath);
    fs.rmdirSync(tempDir);
  }
};

testCppExecution();