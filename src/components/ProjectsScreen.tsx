
import { Plus, Clock, CheckCircle, AlertCircle, Edit, Folder, MoreVertical } from "lucide-react";
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
      color: "pink",
      tasks: { completed: 12, total: 16 }
    },
    {
      id: "2",
      name: "Mobile App",
      progress: 45,
      dueDate: "Jan 20",
      status: "active",
      color: "purple",
      tasks: { completed: 9, total: 20 }
    },
    {
      id: "3",
      name: "Marketing Campaign",
      progress: 90,
      dueDate: "Dec 10",
      status: "urgent",
      color: "yellow",
      tasks: { completed: 18, total: 20 }
    },
    {
      id: "4",
      name: "Team Training",
      progress: 30,
      dueDate: "Dec 25",
      status: "active",
      color: "mint",
      tasks: { completed: 3, total: 10 }
    },
  ]);

  const handleSaveProject = (project: Project) => {
    if (project.id) {
      setProjects(projects.map(p => p.id === project.id ? project : p));
    } else {
      const newProject = { ...project, id: Date.now().toString() };
      setProjects([...projects, newProject]);
    }
    setEditingProject(undefined);
  };

  const totalProgress = projects.reduce((acc, p) => acc + p.progress, 0) / projects.length;

  return (
    <div className="bg-gray-50 min-h-screen p-6 pb-24 space-y-8">
      {/* Header */}
      <div className="mb-2">
        <h1 className="text-3xl font-bold text-gray-800">Projects</h1>
        <p className="text-gray-500">Track your progress and stay organized.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-6">
        <CreaCard className="p-5 bg-accent-purple/20 border-accent-purple/30 border">
          <IconContainer variant="purple" size="sm" className="mb-3">
            <Folder size={16} />
          </IconContainer>
          <p className="text-3xl font-bold text-purple-800">{projects.length}</p>
          <p className="text-sm font-medium text-purple-700">Active Projects</p>
        </CreaCard>
        
        <CreaCard className="p-5 bg-accent-peach/20 border-accent-peach/30 border">
          <IconContainer variant="peach" size="sm" className="mb-3">
            <CheckCircle size={16} />
          </IconContainer>
          <p className="text-3xl font-bold text-orange-800">{Math.round(totalProgress)}%</p>
          <p className="text-sm font-medium text-orange-700">Avg Progress</p>
        </CreaCard>
      </div>

      {/* Projects List */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-gray-700 px-2">All Projects</h2>
        {projects.map((project) => (
          <CreaCard 
            key={project.id} 
            className="p-4 bg-white shadow-sm cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => {
              setEditingProject(project);
              setIsModalOpen(true);
            }}
          >
            <div className="flex items-center">
              <IconContainer variant={project.color as any} size="md" className="mr-4">
                 <Folder size={20} />
              </IconContainer>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-800">{project.name}</h3>
                    <p className="text-sm text-gray-500">
                      Due: {project.dueDate}
                      {project.status === 'urgent' && <span className="text-red-500 animate-pulse ml-2">Urgent!</span>}
                    </p>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      // Implement menu logic here
                    }}
                    className="p-2 rounded-full hover:bg-gray-100"
                  >
                    <MoreVertical size={20} className="text-gray-500" />
                  </button>
                </div>
                <div className="mt-3">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>{project.tasks.completed} / {project.tasks.total} tasks</span>
                    <span className="font-semibold">{project.progress}%</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-2 w-full">
                    <div 
                      className={`bg-accent-${project.color} rounded-full h-2 transition-all duration-500`}
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </CreaCard>
        ))}
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => {
          setEditingProject(undefined);
          setIsModalOpen(true);
        }}
        className="fixed bottom-24 right-6 bg-accent-pink text-white rounded-full p-4 shadow-lg hover:scale-110 transition-transform z-10"
      >
        <Plus size={24} />
      </button>

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
