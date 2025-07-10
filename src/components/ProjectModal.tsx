
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Folder } from "lucide-react";

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

const colorOptions = ["pink", "purple", "yellow", "mint", "coral"];

export const ProjectModal = ({ isOpen, onClose, onSave, project }: ProjectModalProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("active");
  const [color, setColor] = useState("purple");

  useEffect(() => {
    if (project) {
      setName(project.name);
      setDescription(project.description || "");
      setDueDate(project.dueDate);
      setStatus(project.status);
      setColor(project.color);
    } else {
      // Reset form
      setName("");
      setDescription("");
      setDueDate("");
      setStatus("active");
      setColor("purple");
    }
  }, [project, isOpen]);

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
      tasks: project?.tasks || { completed: 0, total: 1 },
    });
    
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg p-8 bg-gray-50 rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-800 flex items-center">
            <Folder className="mr-3 h-7 w-7 text-accent-purple" />
            {project ? "Edit Project" : "Create New Project"}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 pt-4">
          <div>
            <Label htmlFor="project-name" className="font-semibold text-gray-600">Project Name</Label>
            <Input
              id="project-name"
              placeholder="e.g., Website Redesign"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-xl p-3 mt-2 text-base"
            />
          </div>

          <div>
            <Label htmlFor="project-description" className="font-semibold text-gray-600">Description</Label>
            <Textarea
              id="project-description"
              placeholder="A brief description of your project..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="rounded-xl p-3 mt-2 text-base resize-none"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="project-due-date" className="font-semibold text-gray-600">Due Date</Label>
            <Input
              id="project-due-date"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="rounded-xl p-3 mt-2 text-base"
            />
          </div>

          <div>
            <Label className="font-semibold text-gray-600 mb-2 block">Color Theme</Label>
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
              disabled={!name.trim() || !dueDate.trim()}
              className="flex-1 rounded-xl py-3 text-base font-semibold bg-accent-pink hover:bg-accent-pink/90"
            >
              {project ? "Save Changes" : "Create Project"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
