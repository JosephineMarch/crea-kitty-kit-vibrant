
import { Trophy, Star, Lock } from "lucide-react";
import { CreaCard } from "./CreaCard";
import { IconContainer } from "./IconContainer";
import { useState } from "react";
import { AchievementModal } from "./AchievementModal";

export const AchievementsScreen = () => {
  const [showModal, setShowModal] = useState(false);
  
  const achievements = [
    {
      id: 1,
      name: "First Steps",
      description: "Complete your first routine",
      unlocked: true,
      kitty: { name: "Whiskers", emoji: "🐱", color: "#FF6B8A" }
    },
    {
      id: 2,
      name: "Streak Master",
      description: "Complete routines for 7 days straight",
      unlocked: true,
      kitty: { name: "Luna", emoji: "🌙", color: "#9966CC" }
    },
    {
      id: 3,
      name: "Project Pioneer",
      description: "Create your first project",
      unlocked: true,
      kitty: { name: "Spark", emoji: "⚡", color: "#FFD700" }
    },
    {
      id: 4,
      name: "Money Manager", 
      description: "Track expenses for 30 days",
      unlocked: false,
      kitty: { name: "Penny", emoji: "💰", color: "#66CC99" }
    },
    {
      id: 5,
      name: "Completion King",
      description: "Complete 5 projects",
      unlocked: false,
      kitty: { name: "Crown", emoji: "👑", color: "#FF8A50" }
    },
    {
      id: 6,
      name: "Habit Hero",
      description: "Maintain 3 routines for 30 days",
      unlocked: false,
      kitty: { name: "Hero", emoji: "🦸", color: "#FF7F7F" }
    },
  ];

  const unlockedCount = achievements.filter(a => a.unlocked).length;

  return (
    <div className="p-6 pb-24 space-y-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Kitty Collection</h1>
        <p className="text-gray-600">Unlock adorable kitties by achieving your goals!</p>
      </div>

      {/* Progress Overview */}
      <CreaCard variant="gradient-purple">
        <div className="text-center">
          <h3 className="text-xl font-bold mb-4">Collection Progress</h3>
          <div className="text-4xl font-bold mb-2">
            {unlockedCount}/{achievements.length}
          </div>
          <p className="opacity-90 mb-4">Kitties Collected</p>
          <div className="bg-white/20 rounded-full h-3">
            <div 
              className="bg-white rounded-full h-3 transition-all duration-500"
              style={{ width: `${(unlockedCount / achievements.length) * 100}%` }}
            />
          </div>
        </div>
      </CreaCard>

      {/* Achievement Grid */}
      <div className="grid grid-cols-2 gap-4">
        {achievements.map((achievement) => (
          <CreaCard 
            key={achievement.id}
            className={`text-center cursor-pointer hover:scale-[1.02] transition-transform ${
              !achievement.unlocked ? 'opacity-60' : ''
            }`}
            onClick={() => achievement.unlocked && setShowModal(true)}
          >
            <div className="mb-4">
              {achievement.unlocked ? (
                <div 
                  className="w-16 h-16 mx-auto rounded-3xl flex items-center justify-center text-3xl animate-float"
                  style={{ backgroundColor: achievement.kitty.color }}
                >
                  {achievement.kitty.emoji}
                </div>
              ) : (
                <div className="w-16 h-16 mx-auto rounded-3xl bg-gray-300 flex items-center justify-center">
                  <Lock size={24} className="text-gray-500" />
                </div>
              )}
            </div>
            
            <h4 className="font-bold text-gray-800 mb-2">
              {achievement.unlocked ? achievement.kitty.name : "???"}
            </h4>
            <p className="text-sm text-gray-600 mb-3">
              {achievement.name}
            </p>
            <p className="text-xs text-gray-500">
              {achievement.description}
            </p>
            
            {achievement.unlocked && (
              <div className="mt-3">
                <IconContainer variant="yellow" size="sm" className="mx-auto">
                  <Star size={12} />
                </IconContainer>
              </div>
            )}
          </CreaCard>
        ))}
      </div>

      {/* Achievement Tips */}
      <CreaCard>
        <h3 className="font-bold text-gray-800 mb-3 flex items-center">
          <Trophy className="mr-2 text-primary" size={20} />
          Pro Tips
        </h3>
        <div className="space-y-2 text-sm text-gray-600">
          <p>• Complete daily routines to unlock streak-based kitties</p>
          <p>• Start new projects to discover project-themed characters</p>
          <p>• Track your finances consistently for money-related rewards</p>
          <p>• Check back regularly for special seasonal kitties!</p>
        </div>
      </CreaCard>

      {/* Achievement Modal */}
      <AchievementModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        achievement={achievements[0]} // You would pass the clicked achievement
      />
    </div>
  );
};
