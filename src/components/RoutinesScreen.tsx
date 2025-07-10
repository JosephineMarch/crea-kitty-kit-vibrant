
import { Check, Plus, Calendar, ChevronLeft, ChevronRight, Edit } from "lucide-react";
import { CreaCard } from "./CreaCard";
import { IconContainer } from "./IconContainer";
import { RoutineModal } from "./RoutineModal";
import { useState } from "react";

interface Routine {
  id?: string;
  name: string;
  time: string;
  color: string;
  completed: boolean;
  repeat?: string;
}

export const RoutinesScreen = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRoutine, setEditingRoutine] = useState<Routine | undefined>();
  
  const [routinesData, setRoutinesData] = useState<Record<string, Routine[]>>({
    [new Date().toDateString()]: [
      { id: "1", name: "Morning Meditation", completed: true, time: "07:00", color: "mint" },
      { id: "2", name: "Workout", completed: true, time: "08:00", color: "coral" },
      { id: "3", name: "Read for 30 min", completed: false, time: "21:00", color: "purple" },
      { id: "4", name: "Plan Tomorrow", completed: false, time: "22:00", color: "yellow" },
    ],
  });

  const routinesForDate = routinesData[selectedDate.toDateString()] || [];

  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const days = [];
    
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(currentDate.getMonth() - 1);
    } else {
      newDate.setMonth(currentDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const formatSelectedDateTitle = () => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric'
    };
    return `Routines for ${selectedDate.toLocaleDateString('en-US', options)}`;
  };

  const handleSaveRoutine = (routine: Routine) => {
    const dateKey = selectedDate.toDateString();
    const currentRoutines = routinesData[dateKey] || [];
    
    if (routine.id) {
      const updatedRoutines = currentRoutines.map(r => 
        r.id === routine.id ? routine : r
      );
      setRoutinesData({ ...routinesData, [dateKey]: updatedRoutines });
    } else {
      const newRoutine = { ...routine, id: Date.now().toString() };
      setRoutinesData({ 
        ...routinesData, 
        [dateKey]: [...currentRoutines, newRoutine] 
      });
    }
    setEditingRoutine(undefined);
  };

  const toggleRoutineComplete = (routineId: string) => {
    const dateKey = selectedDate.toDateString();
    const currentRoutines = routinesData[dateKey] || [];
    const updatedRoutines = currentRoutines.map(r => 
      r.id === routineId ? { ...r, completed: !r.completed } : r
    );
    setRoutinesData({ ...routinesData, [dateKey]: updatedRoutines });
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6 pb-24 space-y-8">
      {/* Header */}
      <div className="mb-2">
        <h1 className="text-3xl font-bold text-gray-800">Daily Routines</h1>
        <p className="text-gray-500">Build consistent habits, one day at a time.</p>
      </div>

      {/* Monthly Calendar */}
      <CreaCard className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg text-gray-800">
            {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </h3>
          <div className="flex space-x-1">
            <button
              onClick={() => navigateMonth('prev')}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft size={20} className="text-gray-600" />
            </button>
            <button
              onClick={() => navigateMonth('next')}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <ChevronRight size={20} className="text-gray-600" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-2 text-center">
          {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
            <div key={day} className="text-sm font-medium text-gray-400 py-2">
              {day}
            </div>
          ))}
            {generateCalendarDays().map((day, index) => (
              <button
                key={index}
                onClick={() => day && handleDateSelect(day)}
                className={`
                  py-2 text-sm rounded-2xl font-semibold transition-all duration-300 min-h-[36px]
                  ${day === null ? 'cursor-default' : 
                    day.toDateString() === selectedDate.toDateString()
                      ? 'bg-accent-pink text-white scale-110 shadow-lg' 
                      : day.toDateString() === new Date().toDateString()
                        ? 'bg-accent-yellow/50 text-yellow-800'
                        : 'hover:bg-gray-100 text-gray-700'
                  }
                `}
              >
                {day?.getDate()}
              </button>
            ))}
        </div>
      </CreaCard>

      {/* Selected Date Routines */}
      <div className="space-y-4">
        <div className="flex justify-between items-center px-2">
          <h3 className="text-lg font-bold text-gray-700">
            {selectedDate.toDateString() === new Date().toDateString() ? "Today's Routines" : formatSelectedDateTitle()}
          </h3>
          <p className="text-sm font-medium text-gray-500 bg-gray-200 px-2 py-1 rounded-lg">
            {routinesForDate.filter(r => r.completed).length}/{routinesForDate.length}
          </p>
        </div>
        
        <div className="space-y-3">
            {routinesForDate.length === 0 ? (
              <CreaCard className="text-center py-10">
                <p className="text-gray-500">No routines for this day.</p>
                <p className="text-gray-400 text-sm">Add one with the '+' button!</p>
              </CreaCard>
            ) : (
              routinesForDate.map((routine) => (
              <CreaCard key={routine.id} className="flex items-center p-4 group bg-white shadow-sm">
                <button 
                  onClick={() => toggleRoutineComplete(routine.id!)}
                  className={`
                    w-7 h-7 rounded-full border-2 flex items-center justify-center mr-4 transition-all
                    ${routine.completed 
                      ? `bg-accent-pink border-accent-pink text-white` 
                      : 'border-gray-300 group-hover:border-accent-pink'
                    }
                  `}
                >
                  {routine.completed && <Check size={16} strokeWidth={3}/>}
                </button>
                <div className="flex-1">
                  <p className={`font-semibold text-gray-800 ${routine.completed ? 'opacity-50 line-through' : ''}`}>
                    {routine.name}
                  </p>
                  <p className="text-sm text-gray-500">{formatTime(routine.time)}</p>
                </div>
                <button 
                  onClick={() => {
                    setEditingRoutine(routine);
                    setIsModalOpen(true);
                  }}
                  className="opacity-0 group-hover:opacity-100 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-opacity"
                >
                  <Edit size={16} className="text-gray-600" />
                </button>
              </CreaCard>
            ))
            )}
        </div>
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => {
          setEditingRoutine(undefined);
          setIsModalOpen(true);
        }}
        className="fixed bottom-24 right-6 bg-accent-pink text-white rounded-full p-4 shadow-lg hover:scale-110 transition-transform z-10"
      >
        <Plus size={24} />
      </button>

      <RoutineModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingRoutine(undefined);
        }}
        onSave={handleSaveRoutine}
        routine={editingRoutine}
      />
    </div>
  );
};
