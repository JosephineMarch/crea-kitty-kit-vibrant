import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Project {
  id?: string;
  name: string;
  description?: string;
  dueDate: string;
  status: string;
  color: string;
  progress: number;
  tasks: { completed: number; total: number };
}

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (project: Project) => void;
  project?: Project;
}

export const ProjectModal = ({ isOpen, onClose, onSave, project }: ProjectModalProps) => {
  const [name, setName] = useState(project?.name || "");
  const [description, setDescription] = useState(project?.description || "");
  const [dueDate, setDueDate] = useState(project?.dueDate || "");
  const [status, setStatus] = useState(project?.status || "active");
  const [color, setColor] = useState(project?.color || "gradient-purple");

  const handleSave = () => {
    if (!name.trim() || !dueDate.trim()) return;
    
    onSave({
      id: project?.id,
      name: name.trim(),
      description: description.trim(),
      dueDate,
      status,
      color,
      progress: project?.progress || 0,
      tasks: project?.tasks || { completed: 0, total: 1 }
    });
    
    onClose();
    setName("");
    setDescription("");
    setDueDate("");
    setStatus("active");
    setColor("gradient-purple");
  };

  const formatDateForInput = (dateStr: string) => {
    if (!dateStr) return "";
    // Convert "Dec 15" format to "2024-12-15" format
    const months = {
      "Jan": "01", "Feb": "02", "Mar": "03", "Apr": "04",
      "May": "05", "Jun": "06", "Jul": "07", "Aug": "08",
      "Sep": "09", "Oct": "10", "Nov": "11", "Dec": "12"
    };
    
    const parts = dateStr.split(" ");
    if (parts.length === 2) {
      const month = months[parts[0] as keyof typeof months];
      const day = parts[1].padStart(2, '0');
      return `2024-${month}-${day}`;
    }
    return dateStr;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{project ? "Edit Project" : "Create New Project"}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="project-name">Project Name</Label>
            <Input
              id="project-name"
              placeholder="e.g., Website Redesign"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-xl"
            />
          </div>

          <div>
            <Label htmlFor="project-description">Description (Optional)</Label>
            <Textarea
              id="project-description"
              placeholder="Brief project description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="rounded-xl resize-none"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="project-due-date">Due Date</Label>
            <Input
              id="project-due-date"
              type="date"
              value={formatDateForInput(dueDate)}
              onChange={(e) => {
                // Convert back to "Dec 15" format
                const date = new Date(e.target.value);
                const month = date.toLocaleDateString('en-US', { month: 'short' });
                const day = date.getDate();
                setDueDate(`${month} ${day}`);
              }}
              className="rounded-xl"
            />
          </div>

          <div>
            <Label htmlFor="project-status">Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">🟢 Active</SelectItem>
                <SelectItem value="urgent">🔴 Urgent</SelectItem>
                <SelectItem value="planning">🟡 Planning</SelectItem>
                <SelectItem value="completed">✅ Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="project-color">Color Theme</Label>
            <Select value={color} onValueChange={setColor}>
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Choose color" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gradient-purple">💜 Purple Gradient</SelectItem>
                <SelectItem value="gradient-pink">🌸 Pink Gradient</SelectItem>
                <SelectItem value="gradient-yellow">🌞 Yellow Gradient</SelectItem>
                <SelectItem value="accent-mint">🌿 Mint</SelectItem>
                <SelectItem value="accent-coral">🪸 Coral</SelectItem>
              </SelectContent>
            </Select>
          </div>

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
              disabled={!name.trim() || !dueDate.trim()}
              className="flex-1 rounded-xl bg-primary hover:bg-primary/90"
            >
              {project ? "Update" : "Create"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};