
import { Plus, Clock, CheckCircle, AlertCircle, Edit } from "lucide-react";
import { CreaCard } from "./CreaCard";
import { IconContainer } from "./IconContainer";
import { ProjectModal } from "./ProjectModal";
import { useState } from "react";

interface Project {
  id?: string;
  name: string;
  description?: string;
  progress: number;
  dueDate: string;
  status: string;
  color: string;
  tasks: { completed: number; total: number };
}

export const ProjectsScreen = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | undefined>();
  
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      name: "Website Redesign",
      progress: 75,
      dueDate: "Dec 15",
      status: "active",
      color: "gradient-pink",
      tasks: { completed: 12, total: 16 }
    },
    {
      id: "2",
      name: "Mobile App",
      progress: 45,
      dueDate: "Jan 20",
      status: "active",
      color: "gradient-purple",
      tasks: { completed: 9, total: 20 }
    },
    {
      id: "3",
      name: "Marketing Campaign",
      progress: 90,
      dueDate: "Dec 10",
      status: "urgent",
      color: "gradient-yellow",
      tasks: { completed: 18, total: 20 }
    },
    {
      id: "4",
      name: "Team Training",
      progress: 30,
      dueDate: "Dec 25",
      status: "active",
      color: "accent-mint",
      tasks: { completed: 3, total: 10 }
    },
  ]);

  const handleSaveProject = (project: Project) => {
    if (project.id) {
      // Edit existing project
      setProjects(projects.map(p => p.id === project.id ? project : p));
    } else {
      // Add new project
      const newProject = { ...project, id: Date.now().toString() };
      setProjects([...projects, newProject]);
    }
    setEditingProject(undefined);
  };

  return (
    <div className="p-6 pb-24 space-y-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Projects</h1>
        <p className="text-gray-600">Track your progress and stay organized</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <CreaCard className="text-center p-4">
          <IconContainer variant="pink" size="sm" className="mx-auto mb-3">
            <CheckCircle size={16} />
          </IconContainer>
          <p className="text-2xl font-bold text-gray-800">4</p>
          <p className="text-sm text-gray-600">Active Projects</p>
        </CreaCard>
        
        <CreaCard className="text-center p-4">
          <IconContainer variant="yellow" size="sm" className="mx-auto mb-3">
            <Clock size={16} />
          </IconContainer>
          <p className="text-2xl font-bold text-gray-800">62%</p>
          <p className="text-sm text-gray-600">Avg Progress</p>
        </CreaCard>
      </div>

      {/* Projects Grid */}
      <div className="space-y-4">
        {projects.map((project) => (
          <CreaCard 
            key={project.id} 
            variant={project.color as any}
            className="cursor-pointer hover:scale-[1.02] transition-transform group"
            onClick={() => {
              setEditingProject(project);
              setIsModalOpen(true);
            }}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold mb-1">{project.name}</h3>
                <p className="text-sm opacity-90">
                  {project.tasks.completed} of {project.tasks.total} tasks done
                </p>
              </div>
              <div className="flex items-center space-x-2">
                {project.status === 'urgent' && (
                  <AlertCircle size={20} className="text-white animate-pulse" />
                )}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditingProject(project);
                    setIsModalOpen(true);
                  }}
                  className="opacity-0 group-hover:opacity-100 p-1 rounded transition-opacity"
                >
                  <Edit size={16} className="text-white/80" />
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span>Progress</span>
                <span>{project.progress}%</span>
              </div>
              <div className="bg-white/20 rounded-full h-3">
                <div 
                  className="bg-white rounded-full h-3 transition-all duration-500"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>

            <div className="flex justify-between items-center text-sm">
              <span className="opacity-90">Due: {project.dueDate}</span>
              <span className="font-medium">View Details →</span>
            </div>
          </CreaCard>
        ))}
      </div>

      {/* Add New Project */}
      <CreaCard 
        className="text-center cursor-pointer hover:scale-[1.02] transition-transform"
        onClick={() => {
          setEditingProject(undefined);
          setIsModalOpen(true);
        }}
      >
        <IconContainer variant="pink" className="mx-auto mb-3">
          <Plus size={20} />
        </IconContainer>
        <p className="font-medium text-gray-800">Start New Project</p>
        <p className="text-sm text-gray-600">Turn your ideas into reality</p>
      </CreaCard>

      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingProject(undefined);
        }}
        onSave={handleSaveProject}
        project={editingProject}
      />
    </div>
  );
};
