import React from 'react';
import CodeBlock from '../../../components/CodeBlock';

const Enums = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Enums</h1>

        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Enums define a set of named constants. Prefer <strong>union string literals</strong> for
          most cases, but enums can be helpful when interoperating with existing code or when you
          need reverse mapping.
        </p>

        <CodeBlock
          code={`// Numeric enum
enum Direction {
  Up = 1,
  Down,
  Left,
  Right
}

const d: Direction = Direction.Up;

// String enum
enum Role {
  Admin = 'admin',
  User = 'user',
  Guest = 'guest'
}

function canEdit(role: Role) {
  return role === Role.Admin;
}`}
        />

        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">Alternatives</h2>

        <CodeBlock
          code={`// Prefer unions for type safety and tree-shaking
type Role = 'admin' | 'user' | 'guest';
const canEdit = (role: Role) => role === 'admin';`}
        />
      </div>
    </div>
  );
};

export default Enums;


