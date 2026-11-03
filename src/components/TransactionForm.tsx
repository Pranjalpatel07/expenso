import type { Transaction } from "@/types/transaction";
import type { FormEvent } from "react";

export default function TransactionForm({onAdd}:{
  onAdd:(transaction: Transaction) => void;
}) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const newTransaction: Transaction = {
      id:crypto.randomUUID(),
      type:formData.get("type") as Transaction["type"],
      amount: Number(formData.get("amount")),
      title:String(formData.get("title")),
      category:String(formData.get("category")),
      date:String(formData.get("date"))
    }

    onAdd(newTransaction);
    
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="w-full rounded-2xl bg-slate-800 px-4 pb-4 pt-12 text-slate-100 sm:px-6 sm:pb-6">
          <h1 className="p-2 text-xl font-bold text-slate-100 sm:text-2xl">
            Add Transaction
          </h1>

          <div className="flex flex-col py-2">
            <label htmlFor="type" className="px-0.5 font-semibold text-slate-200">
              Type
            </label>
            <select
              className="rounded-lg border border-slate-600 bg-slate-700 px-3 py-2 text-slate-100 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
              name="type"
              id="type"
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>

          <div className="flex flex-col py-2">
            <label htmlFor="amount" className="px-0.5 font-semibold text-slate-200">
              Amount
            </label>
            <input
              name="amount"
              type="number"
              className="rounded-lg border border-slate-600 bg-slate-700 px-3 py-2 text-slate-100 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
              placeholder="Amount"
            />
          </div>

          <div className="flex flex-col py-2">
            <label htmlFor="title" className="px-0.5 font-semibold text-slate-200">
              Title
            </label>
            <input
              name="title"
              type="text"
              className="rounded-lg border border-slate-600 bg-slate-700 px-3 py-2 text-slate-100 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
              placeholder="Groceries"
            />
          </div>

          <div className="flex flex-col py-2">
            <label htmlFor="category" className="px-0.5 font-semibold text-slate-200">
              Description
            </label>
            <input
              name="category"
              type="text"
              className="rounded-lg border border-slate-600 bg-slate-700 px-3 py-2 text-slate-100 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
              placeholder="“Food” or “Salary”"
            />
          </div>

          <div className="flex flex-col py-2">
            <label htmlFor="date" className="px-0.5 font-semibold text-slate-200">
              Date
            </label>
            <input
              type="date"
              name="date"
              className="rounded-lg border border-slate-600 bg-slate-700 px-3 py-2 text-slate-100 scheme:dark focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
            />
          </div>

          <div className="flex items-center justify-center py-1">
            <button className="w-full rounded-2xl bg-blue-700 px-6 py-2 font-medium text-slate-100 transition hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-800 sm:w-auto">
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
