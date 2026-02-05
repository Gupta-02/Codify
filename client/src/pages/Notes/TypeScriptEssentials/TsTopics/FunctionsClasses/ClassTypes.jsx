import React from 'react';
import CodeBlock from '../../../components/CodeBlock';

const ClassTypes = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Class Types</h1>

        <p className="text-gray-700 dark:text-gray-300 mb-4">
          TypeScript supports classes with visibility modifiers, readonly properties, getters/setters, and implements/extends.
        </p>

        <CodeBlock
          code={`class User {
  readonly id: number;
  private password: string;
  public name: string;

  constructor(id: number, name: string, password: string) {
    this.id = id;
    this.name = name;
    this.password = password;
  }
}

class Admin extends User {
  role: 'admin' = 'admin';
}`}
        />

        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">Getters & Setters</h2>

        <CodeBlock
          code={`class Account {
  private _balance = 0;
  get balance() { return this._balance; }
  set balance(v: number) { if (v >= 0) this._balance = v; }
}`}
        />
      </div>
    </div>
  );
};

export default ClassTypes;


