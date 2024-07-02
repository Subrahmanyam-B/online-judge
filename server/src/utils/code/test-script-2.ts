import { RunCpp, RunJava, RunPython } from "./ExecuteCode";

const cppCode = `
#include <iostream>
int main() {
  int a, b;
  std::cin >> a >> b;
  std::cout << a + b << std::endl;
  return 0;
}
`;

const javaCode = `
import java.util.Scanner;
public class Test {
  public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);
    int a = scanner.nextInt();
    int b = scanner.nextInt();
    System.out.println(a + b);
  }
}
`;

const pythonCode = `
a = int(input())
b = int(input())
print(a + b)
`;

const input = "2\n3";

RunCpp(cppCode, input, 10)
  .then((output) => {
    console.log("C++ Output:", output);
  })
  .catch((error) => {
    console.error("C++ Error:", error);
  });

RunJava(javaCode, input, 10)
  .then((output) => {
    console.log("Java Output:", output);
  })
  .catch((error) => {
    console.error("Java Error:", error);
  });

RunPython(pythonCode, input, 10)
  .then((output) => {
    console.log("Python Output:", output);
  })
  .catch((error) => {
    console.error("Python Error:", error);
  });
