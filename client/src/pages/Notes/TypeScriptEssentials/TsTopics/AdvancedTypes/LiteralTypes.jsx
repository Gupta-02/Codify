import React from 'react';
import CodeBlock from '../../../components/CodeBlock';

const LiteralTypes = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Literal Types</h1>

        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Literal types restrict a value to a specific string, number, or boolean.
          Combine them with unions to model finite sets.
        </p>

        <CodeBlock
          code={`let direction: 'up' | 'down' | 'left' | 'right' = 'up';

type HttpStatus = 200 | 400 | 404 | 500;
let status: HttpStatus = 200;

// Discriminated unions with literals
type Square = { kind: 'square'; size: number };
type Circle = { kind: 'circle'; radius: number };
type Shape = Square | Circle;`}
        />
      </div>
    </div>
  );
};

export default LiteralTypes;


