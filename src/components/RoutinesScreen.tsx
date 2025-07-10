
import { Check, Plus, Calendar } from "lucide-react";
import { CreaCard } from "./CreaCard";
import { IconContainer } from "./IconContainer";
import { useState } from "react";

export const RoutinesScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().getDate());
  
  const routines = [
    { name: "Morning Meditation", completed: true, time: "7:00 AM", color: "mint" },
    { name: "Workout", completed: true, time: "8:00 AM", color: "coral" },
    { name: "Read for 30 min", completed: false, time: "9:00 PM", color: "purple" },
    { name: "Plan Tomorrow", completed: false, time: "10:00 PM", color: "yellow" },
  ];

  const [routinesForDate, setRoutinesForDate] = useState(routines);

  const generateCalendarDays = () => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const year = today.getFullYear();
    const firstDay = new Date(year, currentMonth, 1).getDay();
    const daysInMonth = new Date(year, currentMonth + 1, 0).getDate();
    
    const days = [];
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const getRoutinesForDate = (date: number) => {
    // Mock data - in real app this would come from backend
    const routinesByDate: Record<number, typeof routines> = {
      [new Date().getDate()]: routines,
      16: [
        { name: "Morning Yoga", completed: false, time: "7:30 AM", color: "mint" },
        { name: "Project Review", completed: true, time: "10:00 AM", color: "purple" },
        { name: "Team Meeting", completed: false, time: "2:00 PM", color: "coral" },
      ],
      17: [
        { name: "Gym Session", completed: false, time: "6:00 AM", color: "coral" },
        { name: "Client Call", completed: false, time: "11:00 AM", color: "yellow" },
        { name: "Design Review", completed: true, time: "3:00 PM", color: "purple" },
      ]
    };
    return routinesByDate[date] || [];
  };

  const handleDateSelect = (date: number) => {
    setSelectedDate(date);
    setRoutinesForDate(getRoutinesForDate(date));
  };

  return (
    <div className="p-6 pb-24 space-y-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Daily Routines</h1>
        <p className="text-gray-600">Build consistent habits, one day at a time</p>
      </div>

      {/* Mini Calendar */}
      <CreaCard>
        <div className="mb-4">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center">
            <Calendar className="mr-2" size={20} />
            December 2024
          </h3>
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
                   py-2 text-sm rounded-lg transition-colors
                   ${day === null ? '' : 
                     day === selectedDate 
                       ? 'bg-primary text-white font-bold' 
                       : day === new Date().getDate()
                         ? 'bg-accent-yellow text-gray-800 font-medium'
                         : 'hover:bg-gray-100 text-gray-700'
                   }
                 `}
               >
                 {day}
               </button>
             ))}
          </div>
        </div>
      </CreaCard>

      {/* Today's Routines */}
      <CreaCard variant="gradient-purple">
         <div className="flex justify-between items-center mb-4">
           <h3 className="text-xl font-bold">
             {selectedDate === new Date().getDate() ? "Today's Routines" : `Routines for ${selectedDate}`}
           </h3>
           <div className="text-sm opacity-90">
             {routinesForDate.filter(r => r.completed).length} of {routinesForDate.length} done
           </div>
         </div>
         
         <div className="bg-white/20 rounded-2xl p-4">
           <div className="space-y-3">
             {routinesForDate.map((routine, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <button className={`
                    w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3
                    ${routine.completed 
                      ? 'bg-white border-white text-purple-600' 
                      : 'border-white/50 hover:border-white'
                    }
                  `}>
                    {routine.completed && <Check size={14} />}
                  </button>
                  <div>
                    <p className={`font-medium ${routine.completed ? 'opacity-75 line-through' : ''}`}>
                      {routine.name}
                    </p>
                    <p className="text-sm opacity-75">{routine.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CreaCard>

      {/* Add New Routine */}
      <CreaCard className="text-center cursor-pointer hover:scale-[1.02] transition-transform">
        <IconContainer variant="pink" className="mx-auto mb-3">
          <Plus size={20} />
        </IconContainer>
        <p className="font-medium text-gray-800">Add New Routine</p>
        <p className="text-sm text-gray-600">Create a healthy habit</p>
      </CreaCard>
    </div>
  );
};
