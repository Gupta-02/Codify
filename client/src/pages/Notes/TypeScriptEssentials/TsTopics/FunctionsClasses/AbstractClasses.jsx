import React from 'react';
import CodeBlock from '../../../components/CodeBlock';

const AbstractClasses = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Abstract Classes</h1>

        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Abstract classes provide a base with shared implementation and abstract methods that subclasses must implement.
        </p>

        <CodeBlock
          code={`abstract class Shape {
  abstract area(): number;
  describe() { return 'A geometric shape'; }
}

class Rectangle extends Shape {
  constructor(private w: number, private h: number) { super(); }
  area() { return this.w * this.h; }
}`}
        />
      </div>
    </div>
  );
};

export default AbstractClasses;


