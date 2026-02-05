import React from 'react';
import CodeBlock from '../../../components/CodeBlock';

const UtilityTypes = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Utility Types</h1>

        <p className="text-gray-700 dark:text-gray-300 mb-4">
          TypeScript includes built-in utility types that transform existing types to help with
          common tasks like making properties optional, required, or read-only.
        </p>

        <CodeBlock
          code={`type User = { id: number; name: string; email?: string };

// Partial: make all props optional
type UserDraft = Partial<User>;

// Required: make all props required
type UserRequired = Required<User>;

// Readonly: make all props readonly
type UserReadonly = Readonly<User>;

// Pick / Omit
type UserPublic = Pick<User, 'id' | 'name'>;
type UserPrivate = Omit<User, 'email'>;

// Record
type UsersById = Record<number, UserPublic>;`}
        />

        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">NonNullable & ReturnType</h2>

        <CodeBlock
          code={`type MaybeString = string | null | undefined;
type DefinitelyString = NonNullable<MaybeString>; // string

function makeUser(name: string) {
  return { id: 1, name };
}
type MakeUserReturn = ReturnType<typeof makeUser>;`}
        />
      </div>
    </div>
  );
};

export default UtilityTypes;


