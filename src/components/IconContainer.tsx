
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface IconContainerProps {
  children: ReactNode;
  variant?: 'pink' | 'purple' | 'yellow' | 'mint' | 'coral' | 'peach';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const IconContainer = ({ 
  children, 
  variant = 'pink', 
  size = 'md',
  className 
}: IconContainerProps) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'pink':
        return 'bg-accent-pink';
      case 'purple':
        return 'bg-accent-purple';
      case 'yellow':
        return 'bg-accent-yellow text-gray-800';
      case 'mint':
        return 'bg-accent-mint';
      case 'coral':
        return 'bg-accent-coral';
      case 'peach':
        return 'bg-accent-peach';
      default:
        return 'bg-accent-pink';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'w-10 h-10 rounded-xl';
      case 'lg':
        return 'w-16 h-16 rounded-3xl';
      default:
        return 'w-12 h-12 rounded-2xl';
    }
  };

  return (
    <div
      className={cn(
        "flex items-center justify-center text-white",
        getVariantClasses(),
        getSizeClasses(),
        className
      )}
    >
      {children}
    </div>
  );
};
