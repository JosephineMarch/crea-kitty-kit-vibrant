
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, Star, Sparkles } from "lucide-react";

interface LoginScreenProps {
  onLogin: () => void;
}

export const LoginScreen = ({ onLogin }: LoginScreenProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-yellow-50 flex flex-col">
      {/* Illustration Section */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center max-w-sm">
          {/* Playful Illustration Placeholder */}
          <div className="relative mb-8">
            <div className="w-48 h-48 mx-auto gradient-pink-peach rounded-3xl flex items-center justify-center relative overflow-hidden">
              <div className="text-6xl animate-float">🐱</div>
              <Star className="absolute top-4 right-4 text-yellow-300 animate-pulse" size={20} />
              <Heart className="absolute bottom-6 left-6 text-red-300 animate-bounce" size={16} />
              <Sparkles className="absolute top-8 left-4 text-white animate-pulse" size={18} />
            </div>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome to <span className="text-primary">Crea</span>
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            Make productivity fun with your personal kitty collection!
          </p>
        </div>
      </div>

      {/* Login Form */}
      <div className="bg-white rounded-t-3xl px-8 py-8 shadow-lg">
        <div className="max-w-sm mx-auto space-y-6">
          <div className="space-y-4">
            <Input
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-2xl h-12 border-gray-200"
            />
            <Input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-2xl h-12 border-gray-200"
            />
          </div>

          <Button 
            onClick={onLogin}
            className="pill-button w-full h-12 text-lg font-semibold bg-primary hover:bg-primary/90"
          >
            Let's Get Started! 🚀
          </Button>

          <div className="text-center">
            <p className="text-gray-600 text-sm">
              Don't have an account?{" "}
              <button className="text-primary font-medium hover:underline">
                Sign up here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
