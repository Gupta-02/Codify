import React from 'react';
import CodeBlock from '../../../components/CodeBlock';

const Generics = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Generics</h1>

        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Generics enable reusable components that work with a variety of types while maintaining
          type safety.
        </p>

        <CodeBlock
          code={`// Generic identity
function identity<T>(value: T): T {
  return value;
}

const n = identity<number>(42);
const s = identity('hello'); // type inferred

// Generic interfaces
interface ApiResponse<T> {
  data: T;
  status: number;
}

type User = { id: number; name: string };
const res: ApiResponse<User> = { data: { id: 1, name: 'Alex' }, status: 200 };`}
        />

        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">Constraints</h2>

        <CodeBlock
          code={`// Constraining generic parameters
function getProp<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { id: 1, name: 'Alex' };
const name = getProp(user, 'name'); // type: string`}
        />
      </div>
    </div>
  );
};

export default Generics;


