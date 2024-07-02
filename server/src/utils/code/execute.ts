import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

const executeWithTimeout = (command: string, timeout: number, userInput: string): string => {
  try {
    const child = execSync(command, { input: userInput, timeout: timeout * 1000 });
    return child.toString();
  } catch (error) {
    if (error.signal === "SIGTERM") {
      return "Time Limit Exceeded";
    } else {
      return `Error: ${error.message}`;
    }
  }
};

export const executeCpp = (filepath: string, userInput: string, timeout: number = 5): string => {
  const outPath = path.join(outputPath, `test`);
  const command = `g++ ${filepath} -o ${outPath} && cd ${outputPath} && ./test`;
  return executeWithTimeout(command, timeout, userInput);
};

export const executePython = (filepath: string, userInput: string, timeout: number = 5): string => {
  const command = `python3 ${filepath}`;
  return executeWithTimeout(command, timeout, userInput);
};

export const executeJava = (filepath: string, userInput: string, timeout: number = 5): string => {
  const className = path.basename(filepath, '.java');
  const outPath = path.join(outputPath, className);

  // Compile the Java file
  execSync(`javac ${filepath} -d ${outputPath}`);

  // Execute the compiled class
  const command = `java -cp ${outputPath} ${className}`;
  return executeWithTimeout(command, timeout, userInput);
};
