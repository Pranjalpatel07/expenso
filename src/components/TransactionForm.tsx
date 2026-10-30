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
        <div className="h-120 w-120 bg-gray-100 px-4 rounded-2xl ">
          <h1 className="text-2xl text-gray-800 p-2 font-bold ">
            Add Transation
          </h1>

          <div className="flex flex-col py-2">
            <label htmlFor="type" className="px-0.5 font-bold">
              Type
            </label>
            <select className="border rounded px-1 py-1" name="type" id="type" >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>

          <div className="flex flex-col py-2">
            <label htmlFor="amount" className="px-0.5 font-bold">
              Amount
            </label>
            <input
              name="amount"
              type="number"
              className="border rounded px-1 py-1"
              placeholder="Amount"
            />
          </div>

          <div className="flex flex-col py-2">
            <label htmlFor="title" className="px-0.5 font-bold">
              Title
            </label>
            <input
              name="title"
              type="text"
              className="border rounded px-1 py-1"
              placeholder="Groceries"
            />
          </div>

          <div className="flex flex-col py-2">
            <label htmlFor="title" className="px-0.5 font-bold">
              Category
            </label>
            <input
              name="category"
              type="text"
              className="border rounded px-1 py-1"
              placeholder="“Food” or “Salary”"
            />
          </div>

          <div className="flex flex-col py-2">
            <label htmlFor="date" className="px-0.5 font-bold">
              Date
            </label>
            <input type="date" name="date" className="border rounded px-1 py-1" />
          </div>

          <div className="flex items-center justify-center py-1">
            <button className="px-6 py-1.5 text-gray-200 bg-blue-800 hover:bg-blue-600 rounded-2xl">
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
