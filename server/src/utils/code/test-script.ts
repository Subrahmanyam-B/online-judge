import fs from 'fs';
import path from 'path';
import { executionCpp, executionJava, executionPython } from './ExecuteCode';
import { Testcase } from '../../db/schema';

// Sample C++ code
const cppCode = `
#include <iostream>

int main() {
    int a, b;
    std::cin >> a >> b;
    std::cout << a + b << std::endl;
    while(true){
    continue;
    }
    return 0;
}
`;

// Sample Java code
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

// Sample Python code
const pythonCode = `
a = int(input())
b = int(input())
print(a + b)
`;

// Sample test cases
const testcases: Testcase[] = [
    {
        input: '2\n3', expectedOutput: '5',
        id: 0,
        problemId: 0,
        isSample: false,
        explanation: ''
    },
    {
        input: '5\n7', expectedOutput: '12',
        id: 0,
        problemId: 0,
        isSample: false,
        explanation: ''
    },
    {
        input: '10\n20', expectedOutput: '30',
        id: 0,
        problemId: 0,
        isSample: false,
        explanation: ''
    },
];

executionCpp(cppCode, testcases, 5); // 5 seconds timeout
executionJava(javaCode, testcases, 10); // 10 seconds timeout
executionPython(pythonCode, testcases, 3); // 3 seconds timeout
