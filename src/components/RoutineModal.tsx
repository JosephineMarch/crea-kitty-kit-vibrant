
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Repeat } from "lucide-react";

interface Routine {
  id?: string;
  name: string;
  time: string;
  color: string;
  completed: boolean;
  repeat?: string;
}

interface RoutineModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (routine: Routine) => void;
  routine?: Routine;
}

const colorOptions = ["pink", "purple", "yellow", "mint", "coral"];
const repeatOptions = {
  "none": "None",
  "daily": "Daily",
  "weekly": "Weekly",
  "weekdays": "Weekdays",
  "weekends": "Weekends",
};

export const RoutineModal = ({ isOpen, onClose, onSave, routine }: RoutineModalProps) => {
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [color, setColor] = useState("mint");
  const [repeat, setRepeat] = useState("none");
  const [isRepeating, setIsRepeating] = useState(false);

  useEffect(() => {
    if (routine) {
      setName(routine.name);
      setTime(routine.time);
      setColor(routine.color);
      setRepeat(routine.repeat || "none");
      setIsRepeating(!!routine.repeat && routine.repeat !== "none");
    } else {
      // Reset form when opening for a new routine
      setName("");
      setTime("");
      setColor("mint");
      setRepeat("none");
      setIsRepeating(false);
    }
  }, [routine, isOpen]);

  const handleSave = () => {
    if (!name.trim() || !time.trim()) return;
    
    onSave({
      id: routine?.id,
      name: name.trim(),
      time,
      color,
      completed: routine?.completed || false,
      repeat: isRepeating ? repeat : "none"
    });
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg p-8 bg-gray-50 rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-800">
            {routine ? "Edit Routine" : "Add New Routine"}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 pt-4">
          <div>
            <Label htmlFor="routine-name" className="font-semibold text-gray-600">Name</Label>
            <Input
              id="routine-name"
              placeholder="e.g., Morning meditation"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-xl p-3 mt-2 text-base"
            />
          </div>

          <div>
            <Label htmlFor="routine-time" className="font-semibold text-gray-600">Time</Label>
            <Input
              id="routine-time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="rounded-xl p-3 mt-2 text-base"
            />
          </div>

          <div>
            <Label className="font-semibold text-gray-600 mb-2 block">Theme</Label>
            <div className="flex space-x-3">
              {colorOptions.map(c => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`w-10 h-10 rounded-full transition-transform hover:scale-110 bg-accent-${c} ${color === c ? 'ring-4 ring-offset-2 ring-accent-pink' : ''}`}
                />
              ))}
            </div>
          </div>
          
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="repeat-routine" className="font-semibold text-gray-600 flex items-center">
                <Repeat className="mr-2 h-5 w-5 text-gray-500" />
                Repeat Routine
              </Label>
              <Switch
                id="repeat-routine"
                checked={isRepeating}
                onCheckedChange={setIsRepeating}
              />
            </div>

            {isRepeating && (
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(repeatOptions).map(([value, label]) => (
                   <Button
                    key={value}
                    variant={repeat === value ? "default" : "outline"}
                    onClick={() => setRepeat(value)}
                    className={`rounded-lg ${repeat === value ? 'bg-accent-pink' : ''}`}
                  >
                    {label}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <DialogFooter className="mt-8">
          <div className="flex space-x-4 w-full">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 rounded-xl py-3 text-base font-semibold border-gray-300"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={!name.trim() || !time.trim()}
              className="flex-1 rounded-xl py-3 text-base font-semibold bg-accent-pink hover:bg-accent-pink/90"
            >
              {routine ? "Save Changes" : "Create Routine"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
