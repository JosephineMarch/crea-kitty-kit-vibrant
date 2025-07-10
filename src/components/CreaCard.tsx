
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface CreaCardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'gradient-pink' | 'gradient-purple' | 'gradient-yellow' | 'accent-mint' | 'accent-coral';
  onClick?: () => void;
}

export const CreaCard = ({ children, className, variant = 'default', onClick }: CreaCardProps) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'gradient-pink':
        return 'gradient-pink-peach text-white';
      case 'gradient-purple':
        return 'gradient-purple-pink text-white';
      case 'gradient-yellow':
        return 'gradient-yellow-peach text-gray-800';
      case 'accent-mint':
        return 'bg-accent-mint text-white';
      case 'accent-coral':
        return 'bg-accent-coral text-white';
      default:
        return 'bg-card text-card-foreground';
    }
  };

  return (
    <div
      className={cn(
        "rounded-3xl p-6 card-shadow transition-all duration-200 hover:scale-[1.02] hover:shadow-lg",
        getVariantClasses(),
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
