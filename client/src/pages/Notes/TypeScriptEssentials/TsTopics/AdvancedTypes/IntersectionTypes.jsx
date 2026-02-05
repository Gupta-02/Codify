import React from 'react';
import CodeBlock from '../../../components/CodeBlock';

const IntersectionTypes = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Intersection Types</h1>

        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Intersection types combine multiple types into one using the <code>&</code> operator. The
          resulting type must satisfy all members.
        </p>

        <CodeBlock
          code={`type HasId = { id: string };
type Timestamped = { createdAt: Date; updatedAt: Date };
type Entity = HasId & Timestamped;

const user: Entity = {
  id: 'u_1',
  createdAt: new Date(),
  updatedAt: new Date()
};`}
        />

        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">With Interfaces</h2>

        <CodeBlock
          code={`interface Named { name: string }
interface Aged { age: number }
type Person = Named & Aged;

const p: Person = { name: 'Alex', age: 30 };`}
        />
      </div>
    </div>
  );
};

export default IntersectionTypes;


