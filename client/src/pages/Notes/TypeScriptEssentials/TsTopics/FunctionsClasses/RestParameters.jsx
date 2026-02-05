import React from 'react';
import CodeBlock from '../../../components/CodeBlock';

const RestParameters = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Rest Parameters</h1>

        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Use rest parameters to accept a variable number of arguments with strong typing.
        </p>

        <CodeBlock
          code={`function sum(...nums: number[]): number {
  return nums.reduce((acc, n) => acc + n, 0);
}

sum(1, 2, 3);
sum(5, 10);`}
        />

        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">Tuple Rest</h2>

        <CodeBlock
          code={`function log(level: 'info' | 'warn' | 'error', ...messages: string[]) {
  console[level](...messages);
}`}
        />
      </div>
    </div>
  );
};

export default RestParameters;


