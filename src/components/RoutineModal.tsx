import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

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

export const RoutineModal = ({ isOpen, onClose, onSave, routine }: RoutineModalProps) => {
  const [name, setName] = useState(routine?.name || "");
  const [time, setTime] = useState(routine?.time || "");
  const [color, setColor] = useState(routine?.color || "mint");
  const [repeat, setRepeat] = useState(routine?.repeat || "none");
  const [isRepeating, setIsRepeating] = useState(routine?.repeat !== "none" && routine?.repeat !== undefined);

  const handleSave = () => {
    if (!name.trim() || !time.trim()) return;
    
    onSave({
      id: routine?.id,
      name: name.trim(),
      time,
      color,
      completed: false,
      repeat: isRepeating ? repeat : "none"
    });
    
    onClose();
    setName("");
    setTime("");
    setColor("mint");
    setRepeat("none");
    setIsRepeating(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{routine ? "Edit Routine" : "Add New Routine"}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="routine-name">Routine Name</Label>
            <Input
              id="routine-name"
              placeholder="e.g., Morning meditation"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-xl"
            />
          </div>

          <div>
            <Label htmlFor="routine-time">Time</Label>
            <Input
              id="routine-time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="rounded-xl"
            />
          </div>

          <div>
            <Label htmlFor="routine-color">Color Theme</Label>
            <Select value={color} onValueChange={setColor}>
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Choose color" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mint">🌿 Mint</SelectItem>
                <SelectItem value="coral">🪸 Coral</SelectItem>
                <SelectItem value="purple">💜 Purple</SelectItem>
                <SelectItem value="yellow">🌞 Yellow</SelectItem>
                <SelectItem value="pink">🌸 Pink</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="repeat-routine"
              checked={isRepeating}
              onCheckedChange={setIsRepeating}
            />
            <Label htmlFor="repeat-routine">Repeat this routine</Label>
          </div>

          {isRepeating && (
            <div>
              <Label htmlFor="repeat-frequency">Repeat frequency</Label>
              <Select value={repeat} onValueChange={setRepeat}>
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="weekdays">Weekdays only</SelectItem>
                  <SelectItem value="weekends">Weekends only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="flex space-x-2 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 rounded-xl"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={!name.trim() || !time.trim()}
              className="flex-1 rounded-xl bg-primary hover:bg-primary/90"
            >
              {routine ? "Update" : "Create"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};