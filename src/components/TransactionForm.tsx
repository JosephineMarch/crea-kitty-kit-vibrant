import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { CreaCard } from "./CreaCard";
import { IconContainer } from "./IconContainer";

interface TransactionFormProps {
  onClose: () => void;
  onSubmit: (transaction: { name: string; amount: number; type: 'income' | 'expense' }) => void;
}

export const TransactionForm = ({ onClose, onSubmit }: TransactionFormProps) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<'income' | 'expense'>('expense');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && amount) {
      onSubmit({
        name,
        amount: parseFloat(amount),
        type
      });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <CreaCard className="w-full max-w-sm">
        <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">Add Transaction</h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Transaction Type */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setType('income')}
              className={`flex-1 flex items-center justify-center p-3 rounded-2xl transition-colors ${
                type === 'income' 
                  ? 'bg-accent-mint text-white' 
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              <Plus size={16} className="mr-2" />
              Income
            </button>
            <button
              type="button"
              onClick={() => setType('expense')}
              className={`flex-1 flex items-center justify-center p-3 rounded-2xl transition-colors ${
                type === 'expense' 
                  ? 'bg-accent-coral text-white' 
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              <Minus size={16} className="mr-2" />
              Expense
            </button>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter description"
              className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount (S/.)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                S/.
              </span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                step="0.01"
                min="0"
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-2xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 rounded-2xl bg-primary text-white font-medium hover:opacity-90 transition-opacity"
            >
              Add Transaction
            </button>
          </div>
        </form>
      </CreaCard>
    </div>
  );
};