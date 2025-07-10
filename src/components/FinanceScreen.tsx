
import { TrendingUp, TrendingDown, Plus, DollarSign, CreditCard, ShoppingBag } from "lucide-react";
import { CreaCard } from "./CreaCard";
import { IconContainer } from "./IconContainer";
import { TransactionForm } from "./TransactionForm";
import { useState } from "react";

export const FinanceScreen = () => {
  const [showTransactionForm, setShowTransactionForm] = useState(false);
  const [transactions, setTransactions] = useState([
    { name: "Salary", amount: "+S/ 12,800", date: "Dec 1", type: "income", icon: DollarSign, color: "mint" },
    { name: "Groceries", amount: "-S/ 340", date: "Dec 8", type: "expense", icon: ShoppingBag, color: "coral" },
    { name: "Coffee Shop", amount: "-S/ 48", date: "Dec 8", type: "expense", icon: CreditCard, color: "purple" },
    { name: "Freelance", amount: "+S/ 1,800", date: "Dec 7", type: "income", icon: DollarSign, color: "yellow" },
  ]);

  const handleAddTransaction = (newTransaction: { name: string; amount: number; type: 'income' | 'expense' }) => {
    const transaction = {
      name: newTransaction.name,
      amount: `${newTransaction.type === 'income' ? '+' : '-'}S/ ${newTransaction.amount.toFixed(2)}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      type: newTransaction.type,
      icon: newTransaction.type === 'income' ? DollarSign : CreditCard,
      color: newTransaction.type === 'income' ? 'mint' : 'coral'
    };
    setTransactions([transaction, ...transactions]);
  };

  const monthlyData = [
    { month: "Aug", income: 2800, expenses: 2200 },
    { month: "Sep", income: 3100, expenses: 2400 },
    { month: "Oct", income: 2900, expenses: 2100 },
    { month: "Nov", income: 3200, expenses: 2600 },
    { month: "Dec", income: 3500, expenses: 2300 },
  ];

  return (
    <div className="p-6 pb-24 space-y-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Finance</h1>
        <p className="text-gray-600">Track your financial health</p>
      </div>

      {/* Balance Card */}
      <CreaCard variant="gradient-pink">
        <div className="text-center mb-6">
          <p className="text-white/80 mb-2">Total Balance</p>
          <h2 className="text-4xl font-bold mb-4">S/ 34,968</h2>
          <div className="flex justify-center space-x-6">
            <div className="text-center">
              <p className="text-sm opacity-80">Income</p>
              <p className="text-lg font-semibold">+S/ 14,600</p>
            </div>
            <div className="text-center">
              <p className="text-sm opacity-80">Expenses</p>
              <p className="text-lg font-semibold">-S/ 9,360</p>
            </div>
          </div>
        </div>
      </CreaCard>

      {/* Statistics Chart */}
      <CreaCard>
        <h3 className="text-lg font-bold text-gray-800 mb-4">Monthly Overview</h3>
        <div className="space-y-4">
          {monthlyData.map((data, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600 w-12">{data.month}</span>
              <div className="flex-1 mx-4">
                <div className="relative h-8 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="absolute top-0 left-0 h-full bg-accent-mint rounded-full"
                    style={{ width: `${(data.income / 4000) * 100}%` }}
                  />
                  <div 
                    className="absolute top-0 left-0 h-full bg-accent-coral rounded-full opacity-70"
                    style={{ width: `${(data.expenses / 4000) * 100}%` }}
                  />
                </div>
              </div>
               <div className="text-right">
                 <p className="text-sm font-medium text-accent-mint">S/ {data.income}</p>
                 <p className="text-sm text-accent-coral">S/ {data.expenses}</p>
               </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center space-x-6 mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center text-sm">
            <div className="w-3 h-3 bg-accent-mint rounded-full mr-2" />
            Income
          </div>
          <div className="flex items-center text-sm">
            <div className="w-3 h-3 bg-accent-coral rounded-full mr-2" />
            Expenses
          </div>
        </div>
      </CreaCard>

      {/* Recent Transactions */}
      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Transactions</h3>
        <div className="space-y-3">
          {transactions.map((transaction, index) => (
            <CreaCard key={index} className="flex items-center p-4">
              <IconContainer variant={transaction.color as any} size="sm">
                <transaction.icon size={16} />
              </IconContainer>
              <div className="ml-4 flex-1">
                <p className="font-medium text-gray-800">{transaction.name}</p>
                <p className="text-sm text-gray-600">{transaction.date}</p>
              </div>
              <p className={`font-bold ${
                transaction.type === 'income' ? 'text-accent-mint' : 'text-accent-coral'
              }`}>
                {transaction.amount}
              </p>
            </CreaCard>
          ))}
        </div>
      </div>

      {/* Add Transaction */}
      <CreaCard 
        className="text-center cursor-pointer hover:scale-[1.02] transition-transform"
        onClick={() => setShowTransactionForm(true)}
      >
        <IconContainer variant="pink" className="mx-auto mb-3">
          <Plus size={20} />
        </IconContainer>
        <p className="font-medium text-gray-800">Add Transaction</p>
        <p className="text-sm text-gray-600">Record income or expense</p>
      </CreaCard>

      {/* Transaction Form Modal */}
      {showTransactionForm && (
        <TransactionForm
          onClose={() => setShowTransactionForm(false)}
          onSubmit={handleAddTransaction}
        />
      )}
    </div>
  );
};
