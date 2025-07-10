
import { Button } from "@/components/ui/button";
import { Heart, Star, Sparkles } from "lucide-react";

interface LoginScreenProps {
  onLogin: () => void;
}

export const LoginScreen = ({ onLogin }: LoginScreenProps) => {

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
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-2">Sign in with Google</h2>
            <p className="text-gray-600 text-sm">Secure and easy access to your productivity companion</p>
          </div>

          <Button 
            onClick={onLogin}
            className="w-full h-12 text-lg font-semibold bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 rounded-2xl flex items-center justify-center space-x-3"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span>Continue with Google</span>
          </Button>

          <div className="text-center">
            <p className="text-gray-500 text-xs">
              By signing in, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
