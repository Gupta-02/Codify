import React from 'react';
import CodeBlock from '../../../components/CodeBlock';

const FunctionTypes = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Function Types</h1>

        <p className="text-gray-700 dark:text-gray-300 mb-4">
          TypeScript lets you type function parameters, return values, and callable variables for safer APIs and better IntelliSense.
        </p>

        <CodeBlock
          code={`// Parameter and return types
function add(a: number, b: number): number {
  return a + b;
}

// Arrow function
const multiply = (a: number, b: number): number => a * b;

// Function type variable
let op: (x: number, y: number) => number;
op = add;
op = multiply;`}
        />

        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">Callbacks</h2>

        <CodeBlock
          code={`function mapNumbers(numbers: number[], fn: (n: number) => number): number[] {
  return numbers.map(fn);
}

const doubled = mapNumbers([1, 2, 3], (n) => n * 2);`}
        />
      </div>
    </div>
  );
};

export default FunctionTypes;


