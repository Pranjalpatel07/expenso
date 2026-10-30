"use client";
import TransactionForm from "@/components/TransactionForm";
import { Transaction } from "@/types/transaction";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [transaction,setTransaction] = useState(false);

  const income = transactions
    .filter((item) => item.type === "income")
    .reduce((total,item) => total + item.amount,0);

  const expenses = transactions
    .filter((item) => item.type === "expense")
    .reduce((total,item) => total + item.amount,0);

  const balance = income - expenses;

  useEffect(()=>{
    const saved = localStorage.getItem("transactions");
    if(saved){
      setTransactions(JSON.parse(saved) as Transaction[]);
    }
    setLoaded(true);
  },[]);

  useEffect(()=>{
    if(!loaded) return;
    localStorage.setItem("transactions",JSON.stringify(transactions));
  },[transactions,loaded])

  if(!loaded){
    return <main>Loading transaction....</main>
  }

  return (
    <>
      <main className=" bg-gray-100 p-6 text-gray-900 h-screen ">
        <div className="mx-auto max-w-6xl ">
          <h1 className="mb-2 text-3xl font-bold">Expense Tracker</h1>
          <p className="mb-8 text-gray-600">
            Track your income and expenses in one place.
          </p>
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
            <p className="text-sm text-gray-500">Total Expenses</p>
            <h2 className="mt-3 text-2xl font-bold text-red-600">
              {expenses.toLocaleString("en-IN")}
            </h2>
          </div>
        </div>

        <div className="py-2">
          <h2 className="">Recent Transactions</h2>
        </div>

        <button className='px-6 py-1.5 text-gray-200 bg-blue-800 hover:bg-blue-600 rounded-2xl' onClick={() => setTransaction(true)}>Add Transaction</button>

        {transaction && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
            <div className="rounded-lg bg-white p-6 shadow-xl">
              <div className="relative rounded-lg bg-white p-6">
                <button
                  type="button"
                  className="absolute right-3 top-3 p-0.5 hover:bg-gray-800 hover:text-white rounded"
                  onClick={() => setTransaction(false)}
                  aria-label="Close transaction form" 
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <TransactionForm 
                onAdd={(newTransaction)=>{
                setTransactions((current) => [...current,newTransaction]);
                setTransaction(false);
              }}/>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
