import React from 'react';
import CodeBlock from '../../../components/CodeBlock';

const DefaultParameters = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Default Parameters</h1>

        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Provide default values for parameters to ensure well-defined behavior when callers omit arguments.
        </p>

        <CodeBlock
          code={`function paginate(page: number = 1, pageSize: number = 20) {
  return { page, pageSize };
}

paginate();
paginate(2);
paginate(3, 50);`}
        />

        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">Defaults with Destructuring</h2>

        <CodeBlock
          code={`function connect({ host = 'localhost', port = 5432 }: { host?: string; port?: number }) {
  /* ... */
}`}
        />
      </div>
    </div>
  );
};

export default DefaultParameters;


