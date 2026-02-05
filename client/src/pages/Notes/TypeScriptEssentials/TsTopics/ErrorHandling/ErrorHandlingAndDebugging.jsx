import React from 'react';
import CodeBlock from '../../../components/CodeBlock';

const ErrorHandlingAndDebugging = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Error Handling & Debugging</h1>

        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-6 mb-3">Typed Error Handling</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">Narrow unknown errors before use. Prefer user-defined type guards.</p>
        <CodeBlock
          code={`function isError(e: unknown): e is Error {
  return typeof e === 'object' && e !== null && 'message' in e;
}

try {
  JSON.parse('invalid');
} catch (e: unknown) {
  if (isError(e)) console.error(e.message);
}`}
        />

        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-6 mb-3">Type Guards</h2>
        <CodeBlock
          code={`function isString(value: unknown): value is string {
  return typeof value === 'string';
}

function format(v: string | number) {
  return isString(v) ? v.toUpperCase() : v.toFixed(2);
}`}
        />

        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-6 mb-3">Debugging TypeScript</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">Enable source maps to debug TS directly in devtools/IDE.</p>
        <CodeBlock
          code={`// tsconfig.json
{
  "compilerOptions": {
    "sourceMap": true,
    "inlineSources": true
  }
}
// Set breakpoints in .ts/.tsx files`}
        />
      </div>
    </div>
  );
};

export default ErrorHandlingAndDebugging;


