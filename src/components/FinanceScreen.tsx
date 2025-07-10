
import { Plus, DollarSign, CreditCard, ShoppingBag, MoreVertical, BarChart2 } from "lucide-react";
import { CreaCard } from "./CreaCard";
import { IconContainer } from "./IconContainer";
import { TransactionForm } from "./TransactionForm";
import { useState } from "react";

// Mock data for the chart
const chartData = [
  { month: "Jan", expense: 120, income: 150 },
  { month: "Feb", expense: 140, income: 180 },
  { month: "Mar", expense: 110, income: 210 },
  { month: "Apr", expense: 180, income: 190 },
  { month: "May", expense: 250, income: 220 },
  { month: "Jun", expense: 210, income: 240 },
  { month: "Jul", expense: 190, income: 260 },
];

export const FinanceScreen = () => {
  const [showTransactionForm, setShowTransactionForm] = useState(false);
  const [activeTab, setActiveTab] = useState('Expense');
  const [activeTime, setActiveTime] = useState('M');

  const [transactions, setTransactions] = useState([
    { name: "Salary", amount: "+$ 12,800", date: "Dec 1", type: "income", icon: DollarSign, color: "mint" as const },
    { name: "Photography", amount: "-$ 280", date: "Dec 8", type: "expense", icon: ShoppingBag, color: "purple" as const },
    { name: "Flight Ticket", amount: "-$ 475", date: "Dec 8", type: "expense", icon: CreditCard, color: "pink" as const },
    { name: "Oori Shop", amount: "-$ 128", date: "Dec 7", type: "expense", icon: ShoppingBag, color: "yellow" as const },
  ]);

  const handleAddTransaction = (newTransaction: { name: string; amount: number; type: 'income' | 'expense' }) => {
    const transaction = {
      name: newTransaction.name,
      amount: `${newTransaction.type === 'income' ? '+' : '-'}S/ ${newTransaction.amount.toFixed(2)}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      type: newTransaction.type,
      icon: newTransaction.type === 'income' ? DollarSign : CreditCard,
      color: (newTransaction.type === 'income' ? 'mint' : 'coral') as any,
    };
    setTransactions([transaction, ...transactions]);
  };

  const totalExpense = 2486; // Example data

  return (
    <div className="bg-gray-50 min-h-screen p-6 pb-24 space-y-8">
      
      {/* Statistics Card */}
      <CreaCard className="p-6 bg-white shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold text-gray-800">Statistics</h1>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setActiveTab('Expense')}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${activeTab === 'Expense' ? 'bg-accent-pink text-white' : 'bg-gray-100 text-gray-700'}`}
            >
              Expense
            </button>
            <button 
              onClick={() => setActiveTab('Income')}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${activeTab === 'Income' ? 'bg-accent-pink text-white' : 'bg-gray-100 text-gray-700'}`}
            >
              Income
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center mb-8">
          <div>
            <p className="text-3xl font-bold text-gray-800">$ {totalExpense.toLocaleString()}</p>
            <p className="text-sm text-gray-500">Total {activeTab}</p>
          </div>
          <div className="flex bg-gray-100 rounded-full p-1">
            {['W', 'M', 'Y'].map(time => (
              <button 
                key={time}
                onClick={() => setActiveTime(time)}
                className={`px-3 py-1 rounded-full text-sm font-semibold transition-colors ${activeTime === time ? 'bg-white shadow' : 'text-gray-600'}`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        {/* Bar Chart */}
        <div className="h-40 flex items-end justify-between">
          {chartData.map(data => (
            <div key={data.month} className="text-center w-1/12">
              <div className="bg-accent-purple/20 h-full rounded-2xl flex items-end">
                <div 
                  className={`w-full rounded-2xl transition-all duration-500 ${data.month === 'May' ? 'bg-accent-pink' : 'bg-accent-purple'}`}
                  style={{ height: `${(data.expense / 300) * 100}%` }}
                />
              </div>
              <p className="text-xs text-gray-400 mt-2">{data.month}</p>
            </div>
          ))}
        </div>
      </CreaCard>

      {/* History */}
      <div className="space-y-4">
        <div className="flex justify-between items-center px-2">
          <h2 className="text-lg font-bold text-gray-700">History</h2>
          <button className="text-accent-pink font-semibold text-sm">See all</button>
        </div>
        
        <div className="space-y-3">
          {transactions.map((transaction, index) => (
            <CreaCard key={index} className="flex items-center p-4 bg-white shadow-sm">
              <IconContainer variant={transaction.color} size="md" className="mr-4">
                <transaction.icon size={20} />
              </IconContainer>
              <div className="flex-1">
                <p className="font-semibold text-gray-800">{transaction.name}</p>
                <p className="text-sm text-gray-500">{transaction.date}</p>
              </div>
              <p className={`font-bold text-gray-800`}>
                {transaction.amount}
              </p>
            </CreaCard>
          ))}
        </div>
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => setShowTransactionForm(true)}
        className="fixed bottom-24 right-6 bg-accent-pink text-white rounded-full p-4 shadow-lg hover:scale-110 transition-transform z-10"
      >
        <Plus size={24} />
      </button>

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
