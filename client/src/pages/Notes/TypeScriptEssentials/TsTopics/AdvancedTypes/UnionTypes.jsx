import React from 'react';
import CodeBlock from '../../../components/CodeBlock';

const UnionTypes = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Union Types</h1>

        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Union types let a value be one of several types using the <code>|</code> operator. They are
          ideal when an API accepts a limited set of primitives or shapes.
        </p>

        <CodeBlock
          code={`// Basic unions
let id: string | number;
id = 'abc123';
id = 42;

// Function parameters with unions
function formatId(id: string | number): string {
  return typeof id === 'string' ? id.toUpperCase() : id.toString();
}

// Narrowing with typeof
function toFixedIfNumber(value: string | number) {
  if (typeof value === 'number') {
    return value.toFixed(2);
  }
  return value;
}`}
        />

        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">Unions with Objects</h2>

        <CodeBlock
          code={`type Success = { status: 'success'; data: string };
type Failure = { status: 'error'; message: string };
type Result = Success | Failure;

function handle(result: Result) {
  if (result.status === 'success') {
    return result.data; // narrowed to Success
  }
  return result.message; // narrowed to Failure
}`}
        />
      </div>
    </div>
  );
};

export default UnionTypes;


