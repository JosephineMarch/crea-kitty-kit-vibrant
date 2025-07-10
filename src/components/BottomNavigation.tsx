
import { Home, CheckSquare, Briefcase, DollarSign, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const BottomNavigation = ({ activeTab, onTabChange }: BottomNavigationProps) => {
  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'routines', icon: CheckSquare, label: 'Routines' },
    { id: 'projects', icon: Briefcase, label: 'Projects' },
    { id: 'finance', icon: DollarSign, label: 'Finance' },
    { id: 'achievements', icon: Trophy, label: 'Kitties' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 safe-area-pb">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "flex flex-col items-center py-2 px-3 rounded-2xl transition-all duration-200",
              activeTab === tab.id 
                ? "text-primary bg-primary/10" 
                : "text-gray-500 hover:text-gray-700"
            )}
          >
            <tab.icon size={24} className="mb-1" />
            <span className="text-xs font-medium">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
