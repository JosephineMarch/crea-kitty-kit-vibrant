
import { useState } from "react";
import { LoginScreen } from "@/components/LoginScreen";
import { HomeScreen } from "@/components/HomeScreen";
import { RoutinesScreen } from "@/components/RoutinesScreen";
import { ProjectsScreen } from "@/components/ProjectsScreen";
import { FinanceScreen } from "@/components/FinanceScreen";
import { AchievementsScreen } from "@/components/AchievementsScreen";
import { BottomNavigation } from "@/components/BottomNavigation";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const renderScreen = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen />;
      case 'routines':
        return <RoutinesScreen />;
      case 'projects':
        return <ProjectsScreen />;
      case 'finance':
        return <FinanceScreen />;
      case 'achievements':
        return <AchievementsScreen />;
      default:
        return <HomeScreen />;
    }
  };

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {renderScreen()}
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
