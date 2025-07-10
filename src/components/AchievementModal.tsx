
import { useState } from "react";
import { X, Star, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface AchievementModalProps {
  isOpen: boolean;
  onClose: () => void;
  achievement: {
    name: string;
    description: string;
    kitty: {
      name: string;
      emoji: string;
      color: string;
    };
  };
}

export const AchievementModal = ({ isOpen, onClose, achievement }: AchievementModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto bg-white rounded-3xl border-0 p-0 overflow-hidden">
        {/* Header with confetti background */}
        <div className="relative gradient-pink-peach p-8 text-center text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white"
          >
            <X size={24} />
          </button>
          
          <div className="animate-bounce-gentle mb-4">
            <Trophy size={48} className="mx-auto" />
          </div>
          
          <h2 className="text-2xl font-bold mb-2">Achievement Unlocked!</h2>
          <p className="text-white/90">{achievement.name}</p>
        </div>

        {/* Kitty Character */}
        <div className="px-8 py-6 text-center">
          <div className="mb-6">
            <div 
              className="w-24 h-24 mx-auto rounded-3xl flex items-center justify-center text-4xl animate-wiggle mb-4"
              style={{ backgroundColor: achievement.kitty.color }}
            >
              {achievement.kitty.emoji}
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Meet {achievement.kitty.name}!
            </h3>
            <p className="text-gray-600 text-sm mb-6">
              {achievement.description}
            </p>
          </div>

          <Button 
            onClick={onClose}
            className="pill-button bg-primary hover:bg-primary/90 text-white w-full"
          >
            View My Collection
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
