import React from 'react';
import CodeBlock from '../../../components/CodeBlock';

const ModulesAndNamespaces = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Modules & Namespaces</h1>

        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-6 mb-3">ES Modules (Recommended)</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">Use standard ES imports/exports. Avoid namespaces in application code.</p>
        <CodeBlock
          code={`// math.ts
export function add(a: number, b: number) { return a + b; }
export const PI = 3.14159;

// app.ts
import { add, PI } from './math';
console.log(add(2, 3), PI);`}
        />

        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-6 mb-3">Import & Export Patterns</h2>
        <CodeBlock
          code={`// Named and default exports
export const PI = 3.14;
export function area(r: number) { return PI * r * r; }
export default class Circle {}

// Importing
import Circle, { PI, area } from './circle';

// Re-exports
export { area, PI } from './circle';
export * from './square';`}
        />

        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-6 mb-3">Namespaces (Legacy)</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">Namespaces are mainly for ambient declarations or single-file libraries.</p>
        <CodeBlock
          code={`// legacy namespace example (d.ts or single-file libs)
namespace Utils {
  export function greet(name: string) { return 'Hello ' + name; }
}

const msg = Utils.greet('Alex');`}
        />

        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-6 mb-3">Declaration Files (.d.ts)</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">Describe JS shapes for TypeScript when a library has no types.</p>
        <CodeBlock
          code={`// globals.d.ts
declare const VERSION: string;

// Module declaration
declare module 'legacy-lib' {
  export function init(config: object): void;
}`}
        />
      </div>
    </div>
  );
};

export default ModulesAndNamespaces;


