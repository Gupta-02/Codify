import React from 'react';
import CodeBlock from '../../../components/CodeBlock';

const Interfaces = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Interfaces</h1>

        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Interfaces describe the shape of objects and can be implemented by classes.
        </p>

        <CodeBlock
          code={`interface User {
  id: number;
  name: string;
  email?: string;
}

function printUser(user: User) {
  console.log(user.name);
}

class Member implements User {
  constructor(public id: number, public name: string, public email?: string) {}
}`}
        />

        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">Extending Interfaces</h2>

        <CodeBlock
          code={`interface Timestamps { createdAt: Date; updatedAt: Date }
interface Admin extends User, Timestamps { permissions: string[] }`}
        />
      </div>
    </div>
  );
};

export default Interfaces;


