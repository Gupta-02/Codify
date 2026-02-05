import React from 'react';
import CodeBlock from '../../../components/CodeBlock';

const OptionalParameters = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Optional Parameters</h1>

        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Mark parameters as optional with <code>?</code>. Always place optional parameters after required ones.
        </p>

        <CodeBlock
          code={`function greet(name: string, title?: string): string {
  return title ? \`Hello \${title} \${name}\` : \`Hello \${name}\`;
}

greet('Alex');
greet('Alex', 'Dr.');`}
        />

        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">Default vs Optional</h2>

        <CodeBlock
          code={`// Optional (can be undefined)
function format(value?: string) { /* ... */ }

// Default (always defined inside function)
function formatWithDefault(value: string = 'N/A') { /* ... */ }`}
        />
      </div>
    </div>
  );
};

export default OptionalParameters;


