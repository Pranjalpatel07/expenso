"use client";
import TransactionForm from "@/components/TransactionForm";
import { useState } from "react";

export default function Home() {
  const [income] = useState<number>(25000);
  const [expenses] = useState<number>(8000);
  const balance = income - expenses;
  return (
   <>
   <main className=" bg-gray-100 p-6 text-gray-900 ">
    <div className="mx-auto max-w-6xl ">
      <h1 className="mb-2 text-3xl font-bold">Expense Tracker</h1>
      <p className="mb-8 text-gray-600">Track your income and expenses in one place.</p>
    </div>

    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <p className="text-sm text-gray-500">Total Balance</p>
        <h2 className="mt-3 text-2xl font-bold">
          {balance.toLocaleString("en-IN")}
        </h2>
      </div>
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <p className="text-sm text-gray-500">Total Income</p>
        <h2 className="mt-3 text-2xl font-bold text-green-600">
          {income.toLocaleString("en-IN")}
        </h2>
      </div>
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <p className="text-sm text-gray-500">
          Total Expenses
        </p>
        <h2 className="mt-3 text-2xl font-bold text-red-600">
          {expenses.toLocaleString("en-IN")}
        </h2>
      </div>

    </div>

    <div className="py-2">
      <h2 className="">
        Recent Transactions
      </h2>
    </div>

    <TransactionForm />
   </main>

   </>
  );
}
