import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

export const executeCpp = (filepath: string, userInput: string): string => {
  const outPath = path.join(outputPath, `test`);
  console.log(outPath);
  console.log(filepath);

  const child = execSync(
    `g++ ${filepath} -o ${outPath} && cd ${outputPath} && ./test`,
    { input: userInput }
  );

  return child.toString();
};