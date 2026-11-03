"use client";
import TransactionForm from "@/components/TransactionForm";
import { Transaction } from "@/types/transaction";
import { Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function formatTransactionDate(date: string) {
  const [year, month, day] = date.split("-");
  return year && month && day ? `${day}-${month}-${year}` : date;
}

export default function Home() {

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [transaction,setTransaction] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("all");

  const income = transactions
    .filter((item) => item.type === "income")
    .reduce((total,item) => total + item.amount,0);

  const expenses = transactions
    .filter((item) => item.type === "expense")
    .reduce((total,item) => total + item.amount,0);

  const balance = income - expenses;
  const availableMonths = Array.from(
    new Set(
      transactions
        .map((item) => item.date.slice(0, 7))
        .filter((month) => /^\d{4}-\d{2}$/.test(month)),
    ),
  ).sort((a, b) => b.localeCompare(a));

  const filteredTransactions = transactions
    .filter(
      (item) =>
        selectedMonth === "all" || item.date.startsWith(selectedMonth),
    )
    .sort((a, b) => b.date.localeCompare(a.date));

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

  const now = new Date();

  const monthlyTotals = Array.from({length: 6},(_,index) => {
    const date = new Date(now.getFullYear(),now.getMonth() - 5 + index, 1);
    const key = `${date.getFullYear()}-${String(date.getMonth() +1 ).padStart(2,"0")}`;
    const monthTransactions = transactions.filter((item) =>item.date.startsWith(key));

    return {
    month: new Intl.DateTimeFormat("en", { month: "short" }).format(date),
    income: monthTransactions
      .filter((item) => item.type === "income")
      .reduce((sum, item) => sum + item.amount, 0),
    expenses: monthTransactions
      .filter((item) => item.type === "expense")
      .reduce((sum, item) => sum + item.amount, 0),
  };

  })

  return (
    <>
      <main className="min-h-screen bg-slate-900 p-4 text-gray-900 sm:p-6">
        <div className="mx-auto max-w-6xl">
          <h1 className="mb-2 text-2xl font-bold text-gray-100 sm:text-3xl">Expense Tracker</h1>
          <p className="mb-8 text-gray-400">
            Track your income and expenses in one place.
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          <div className="rounded-xl bg-slate-800 p-4 shadow-sm sm:p-6">
            <p className="text-sm  text-gray-200">Total Balance</p>
            <h2 className="mt-3 text-2xl font-bold text-gray-100">
              {balance.toLocaleString("en-IN")}
            </h2>
          </div>
          <div className="rounded-xl bg-slate-800 p-4 shadow-sm sm:p-6">
            <p className="text-sm text-gray-200">Total Income</p>
            <h2 className="mt-3 text-2xl font-bold text-green-600">
              {income.toLocaleString("en-IN")}
            </h2>
          </div>
          <div className="rounded-xl bg-slate-800 p-4 shadow-sm sm:p-6">
            <p className="text-sm text-gray-200">Total Expenses</p>
            <h2 className="mt-3 text-2xl font-bold text-red-600">
              {expenses.toLocaleString("en-IN")}
            </h2>
          </div>
        </div>

        <section className="mx-auto my-5 max-w-6xl rounded-2xl border border-slate-600 bg-slate-800 p-4 shadow-sm sm:my-6 sm:p-6">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-lg font-semibold text-slate-100">
              Recent Transactions
            </h2>
            <label className="flex items-center gap-2 text-sm text-slate-300">
              <span>Month</span>
              <select
                value={selectedMonth}
                onChange={(event) => setSelectedMonth(event.target.value)}
                className="min-w-0 rounded-lg border border-slate-600 bg-slate-700 px-3 py-2 text-slate-100 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                aria-label="Filter transactions by month"
              >
                <option value="all">All months</option>
                {availableMonths.map((month) => {
                  const [year, monthNumber] = month.split("-").map(Number);
                  const label = new Intl.DateTimeFormat("en", {
                    month: "long",
                    year: "numeric",
                  }).format(new Date(year, monthNumber - 1, 1));

                  return (
                    <option key={month} value={month}>
                      {label}
                    </option>
                  );
                })}
              </select>
            </label>
          </div>

          {filteredTransactions.length === 0 ? (
            <p className="text-sm text-slate-400">
              {transactions.length === 0
                ? "No transactions yet."
                : "No transactions for this month."}
            </p>
          ) : (
            <div className="space-y-3">
              {filteredTransactions.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col gap-2 rounded-xl bg-slate-700/60 p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <p className="wrap-break-word font-medium text-slate-100">
                      {item.title}
                    </p>
                    <p className="wrap-break-word text-sm text-slate-400">
                      {item.category} · {formatTransactionDate(item.date)}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-4 self-end sm:self-auto">
                    <p
                      className={
                        item.type === "income"
                          ? "font-semibold text-green-400"
                          : "font-semibold text-red-400"
                      }
                    >
                      {item.type === "income" ? "+" : "-"}₹
                      {item.amount.toLocaleString("en-IN")}
                    </p>
                    <button
                      type="button"
                      className="rounded-lg p-2 text-slate-400 transition hover:bg-red-500/10 hover:text-red-400 focus:outline-none focus:ring-2 focus:ring-red-400"
                      onClick={() => {
                        if (window.confirm(`Delete "${item.title}"?`)) {
                          setTransactions((current) =>
                            current.filter(
                              (transaction) => transaction.id !== item.id,
                            ),
                          );
                        }
                      }}
                      aria-label={`Delete ${item.title}`}
                      title="Delete transaction"
                    >
                      <Trash2 className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="mx-auto my-5 max-w-6xl rounded-2xl border border-slate-600 bg-slate-800 p-4 shadow-sm sm:my-6 sm:p-6">
          <div className="mb-5">
            <h2 className="text-lg font-semibold text-slate-100">
              Monthly Income vs. Expenses
            </h2>
            <p className="mt-1 text-sm text-slate-300">
              A comparison of your last six months
            </p>
          </div>
          <div className="h-64 w-full rounded-2xl bg-slate-800 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyTotals} margin={{ top: 8, right: 8, left: 0, bottom: 4 }}>
                <CartesianGrid stroke="#e2e8f0" strokeDasharray="4 4" />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#cbd5e1", fontSize: 11 }}
                  minTickGap={12}
                  dy={8}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#cbd5e1", fontSize: 10 }}
                  width={60}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: 12,
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 8px 24px rgba(15, 23, 42, 0.08)",
                  }}
                  formatter={(value) => `₹${Number(value).toLocaleString("en-IN")}`}
                />
                <Legend
                  verticalAlign="top"
                  align="right"
                  iconType="circle"
                  wrapperStyle={{ paddingBottom: 16, fontSize: 12 }}
                />
                <Line
                  type="monotone"
                  dataKey="income"
                  name="Income"
                  stroke="#16a34a"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#16a34a", strokeWidth: 0 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="expenses"
                  name="Expenses"
                  stroke="#dc2626"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#dc2626", strokeWidth: 0 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        <div className="mx-auto max-w-6xl">
          <button
            className="w-full rounded-2xl bg-blue-700 px-6 py-3 font-medium text-gray-100 transition hover:bg-blue-600 sm:w-auto"
            onClick={() => setTransaction(true)}
          >
            Add Transaction
          </button>
        </div>

        {transaction && (
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-3 backdrop-blur-sm sm:p-6">
            <div className="relative my-auto w-full max-w-xl rounded-2xl border border-slate-600 bg-slate-800 p-3 shadow-xl sm:p-6">
              <button
                type="button"
                className="absolute right-5 top-5 z-10 rounded p-1 text-slate-400 transition hover:bg-slate-700 hover:text-slate-100"
                onClick={() => setTransaction(false)}
                aria-label="Close transaction form"
              >
                <X className="h-5 w-5" />
              </button>
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
