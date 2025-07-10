
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Plus, Minus, DollarSign } from "lucide-react";

interface TransactionFormProps {
  onClose: () => void;
  onSubmit: (transaction: { name: string; amount: number; type: 'income' | 'expense' }) => void;
  // isOpen prop to control the dialog visibility
  isOpen: boolean; 
}

export const TransactionForm = ({ onClose, onSubmit, isOpen }: TransactionFormProps) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<'income' | 'expense'>('expense');

  useEffect(() => {
    if (isOpen) {
      setName("");
      setAmount("");
      setType('expense');
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && amount) {
      onSubmit({
        name: name.trim(),
        amount: parseFloat(amount),
        type
      });
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg p-8 bg-gray-50 rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-800 flex items-center">
            <DollarSign className="mr-3 h-7 w-7 text-accent-mint" />
            Add New Transaction
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div>
            <Label className="font-semibold text-gray-600 mb-2 block">Transaction Type</Label>
            <div className="grid grid-cols-2 gap-4">
              <Button
                type="button"
                onClick={() => setType('income')}
                variant={type === 'income' ? 'default' : 'outline'}
                className={`py-6 text-base rounded-2xl flex items-center justify-center space-x-2 transition-all ${type === 'income' ? 'bg-accent-mint hover:bg-accent-mint/90' : 'border-gray-300'}`}
              >
                <Plus size={20} />
                <span>Income</span>
              </Button>
              <Button
                type="button"
                onClick={() => setType('expense')}
                variant={type === 'expense' ? 'default' : 'outline'}
                className={`py-6 text-base rounded-2xl flex items-center justify-center space-x-2 transition-all ${type === 'expense' ? 'bg-accent-coral hover:bg-accent-coral/90 text-white' : 'border-gray-300'}`}
              >
                <Minus size={20} />
                <span>Expense</span>
              </Button>
            </div>
          </div>
          
          <div>
            <Label htmlFor="transaction-name" className="font-semibold text-gray-600">Description</Label>
            <Input
              id="transaction-name"
              placeholder="e.g., Coffee, Salary"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-xl p-3 mt-2 text-base"
              required
            />
          </div>

          <div>
            <Label htmlFor="transaction-amount" className="font-semibold text-gray-600">Amount</Label>
            <div className="relative mt-2">
               <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 font-semibold">
                $
              </span>
              <Input
                id="transaction-amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                step="0.01"
                min="0"
                className="rounded-xl p-3 pl-8 text-base"
                required
              />
            </div>
          </div>
        </form>
        
        <DialogFooter className="mt-8">
          <div className="flex space-x-4 w-full">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 rounded-xl py-3 text-base font-semibold border-gray-300"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={handleSubmit}
              disabled={!name.trim() || !amount}
              className="flex-1 rounded-xl py-3 text-base font-semibold bg-accent-pink hover:bg-accent-pink/90"
            >
              Add Transaction
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};