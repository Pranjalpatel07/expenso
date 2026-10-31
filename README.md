# Expenso — Expense Tracker

Keep your income and expenses organized with **Expenso**, a responsive personal finance dashboard. Add transactions, review your totals, filter activity by month, and compare income with expenses over the last six months.

<div align="center">
  <a href="https://expenso-beige.vercel.app/">
    <img src="https://img.shields.io/badge/Live%20Demo-Visit%20Expenso-2563EB?style=for-the-badge&logo=vercel&logoColor=white" alt="Visit the live Expenso demo" />
  </a>
</div>

## 🖥️ Preview

<div align="center">
  <img src="./public/expenso-dashboard.png" alt="Expenso dashboard showing transaction totals, recent transactions, and a monthly income and expenses chart" width="720" />
</div>

## ✨ Features

- 💰 Track income, expenses, and your calculated balance.
- ➕ Add transactions with a type, amount, title, category, and date.
- 📅 Browse recent transactions and filter them by month.
- 📈 Compare income and expenses in a six-month line chart.
- 💾 Save transactions in browser `localStorage` so they remain available on that browser.
- 📱 Responsive dashboard and transaction form for mobile and desktop screens.

## 🧰 Built with

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-16.4.3-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js 16.4.3" />
  <img src="https://img.shields.io/badge/React-19.3.0-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 19.3.0" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind%20CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS 4" />
  <img src="https://img.shields.io/badge/Recharts-3.10.1-22B5BF?style=for-the-badge" alt="Recharts 3.10.1" />
  <img src="https://img.shields.io/badge/Lucide%20React-Icons-F56565?style=for-the-badge&logo=lucide&logoColor=white" alt="Lucide React icons" />
</div>

## 🚀 Run locally

### Requirements

- [Node.js](https://nodejs.org/) (LTS recommended)
- npm

### Setup

```bash
git clone <your-repository-url>
cd Expenso
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📜 Available commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run build` | Create a production build |
| `npm start` | Serve the production build |
| `npm run lint` | Run ESLint |

## 🗂️ Project layout

```text
src/
├── app/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   └── TransactionForm.tsx
└── types/
    └── transaction.ts
public/
└── expenso-dashboard.png
```

## 💡 Data and privacy

Transactions are stored in the browser's `localStorage`. They are specific to the browser and device being used; they do not sync between devices and are not backed up to a server. Clearing the browser's site data will remove saved transactions.

## 🌐 Live demo

Try Expenso at **[expenso-beige.vercel.app](https://expenso-beige.vercel.app/)**.
