
import { Plus, Calendar, TrendingUp, Target } from "lucide-react";
import { CreaCard } from "./CreaCard";
import { IconContainer } from "./IconContainer";

export const HomeScreen = () => {
  const quickStats = [
    { label: "Routines Done", value: "12", icon: Target, color: "pink" as const },
    { label: "Active Projects", value: "5", icon: TrendingUp, color: "purple" as const },
    { label: "This Month", value: "$2,340", icon: Calendar, color: "mint" as const },
  ];

  return (
    <div className="p-6 pb-24 space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Good morning, Alex! 👋
        </h1>
        <p className="text-gray-600">Ready to be productive today?</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        {quickStats.map((stat, index) => (
          <CreaCard key={index} className="text-center p-4">
            <IconContainer variant={stat.color} size="sm" className="mx-auto mb-3">
              <stat.icon size={16} />
            </IconContainer>
            <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            <p className="text-xs text-gray-600 mt-1">{stat.label}</p>
          </CreaCard>
        ))}
      </div>

      {/* Today's Focus */}
      <CreaCard variant="gradient-pink" className="text-center">
        <h3 className="text-xl font-bold mb-4">Today's Focus</h3>
        <div className="space-y-3">
          <div className="bg-white/20 rounded-2xl p-3 text-left">
            <p className="font-medium">Complete morning routine</p>
            <p className="text-sm opacity-90">3 of 5 tasks done</p>
          </div>
          <div className="bg-white/20 rounded-2xl p-3 text-left">
            <p className="font-medium">Work on project Alpha</p>
            <p className="text-sm opacity-90">2 hours remaining</p>
          </div>
        </div>
      </CreaCard>

      {/* Recent Activity */}
      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {[
            { action: "Completed", item: "Morning Meditation", time: "30 min ago", color: "mint" },
            { action: "Added", item: "New Project: Website", time: "2 hours ago", color: "purple" },
            { action: "Earned", item: "Weekly Achiever Badge", time: "Yesterday", color: "yellow" },
          ].map((activity, index) => (
            <CreaCard key={index} className="flex items-center p-4">
              <IconContainer variant={activity.color as any} size="sm">
                <Plus size={16} />
              </IconContainer>
              <div className="ml-4 flex-1">
                <p className="font-medium text-gray-800">
                  {activity.action} {activity.item}
                </p>
                <p className="text-sm text-gray-600">{activity.time}</p>
              </div>
            </CreaCard>
          ))}
        </div>
      </div>
    </div>
  );
};
