
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
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    
    // Days of the month
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
      // Edit existing routine
      const updatedRoutines = currentRoutines.map(r => 
        r.id === routine.id ? routine : r
      );
      setRoutinesData({ ...routinesData, [dateKey]: updatedRoutines });
    } else {
      // Add new routine
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
    <div className="p-6 pb-24 space-y-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Daily Routines</h1>
        <p className="text-gray-600">Build consistent habits, one day at a time</p>
      </div>

      {/* Monthly Calendar */}
      <CreaCard>
        <div className="mb-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800 flex items-center">
              <Calendar className="mr-2" size={20} />
              {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h3>
            <div className="flex space-x-2">
              <button
                onClick={() => navigateMonth('prev')}
                className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ChevronLeft size={20} className="text-gray-600" />
              </button>
              <button
                onClick={() => navigateMonth('next')}
                className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ChevronRight size={20} className="text-gray-600" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="text-xs font-medium text-gray-500 py-2">
                {day}
              </div>
            ))}
             {generateCalendarDays().map((day, index) => (
               <button
                 key={index}
                 onClick={() => day && handleDateSelect(day)}
                 className={`
                   py-2 text-sm rounded-lg transition-colors min-h-[32px]
                   ${day === null ? '' : 
                     day.toDateString() === selectedDate.toDateString()
                       ? 'bg-primary text-white font-bold' 
                       : day.toDateString() === new Date().toDateString()
                         ? 'bg-accent-yellow text-gray-800 font-medium'
                         : 'hover:bg-gray-100 text-gray-700'
                   }
                 `}
               >
                 {day?.getDate()}
               </button>
             ))}
          </div>
        </div>
      </CreaCard>

      {/* Selected Date Routines */}
      <CreaCard variant="gradient-purple">
         <div className="flex justify-between items-center mb-4">
           <h3 className="text-lg font-bold">
             {formatSelectedDateTitle()}
           </h3>
           <div className="text-sm opacity-90">
             {routinesForDate.filter(r => r.completed).length} of {routinesForDate.length} done
           </div>
         </div>
         
         <div className="bg-white/20 rounded-2xl p-4">
           <div className="space-y-3">
             {routinesForDate.length === 0 ? (
               <p className="text-center text-white/80 py-4">No routines scheduled for this day</p>
             ) : (
               routinesForDate.map((routine) => (
                <div key={routine.id} className="flex items-center justify-between group">
                  <div className="flex items-center">
                    <button 
                      onClick={() => toggleRoutineComplete(routine.id!)}
                      className={`
                        w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 transition-colors
                        ${routine.completed 
                          ? 'bg-white border-white text-purple-600' 
                          : 'border-white/50 hover:border-white'
                        }
                      `}
                    >
                      {routine.completed && <Check size={14} />}
                    </button>
                    <div>
                      <p className={`font-medium ${routine.completed ? 'opacity-75 line-through' : ''}`}>
                        {routine.name}
                      </p>
                      <p className="text-sm opacity-75">{formatTime(routine.time)}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      setEditingRoutine(routine);
                      setIsModalOpen(true);
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1 rounded transition-opacity"
                  >
                    <Edit size={16} className="text-white/80" />
                  </button>
                </div>
              ))
             )}
          </div>
        </div>
      </CreaCard>

      {/* Add New Routine */}
      <CreaCard 
        className="text-center cursor-pointer hover:scale-[1.02] transition-transform"
        onClick={() => {
          setEditingRoutine(undefined);
          setIsModalOpen(true);
        }}
      >
        <IconContainer variant="pink" className="mx-auto mb-3">
          <Plus size={20} />
        </IconContainer>
        <p className="font-medium text-gray-800">Add New Routine</p>
        <p className="text-sm text-gray-600">Create a healthy habit</p>
      </CreaCard>

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
