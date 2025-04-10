import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Folder, AlertCircle } from 'lucide-react';
import { fetchMockData, mockProjects } from '../data/mockData';
import KanbanBoard from '../components/KanbanBoard';
import Sidebar from '../components/Sidebar';
import { Developer, Project } from '../types';

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | undefined>();
  const [developers, setDevelopers] = useState<Developer[]>([]);

  useEffect(() => {
    fetchMockData().then(() => {
      const foundProject = mockProjects.find((p) => p.id === id);
      setProject(foundProject);

      if (foundProject) {
        const devSet = new Map<string, Developer>();
        foundProject.bugs.forEach((bug) => {
          if (bug.createdBy) devSet.set(bug.createdBy.id, bug.createdBy);
          if (bug.assignedTo) devSet.set(bug.assignedTo.id, bug.assignedTo);
        });
        setDevelopers(Array.from(devSet.values()));
      }
    });
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Loading project...</p>
      </div>
    );
  }

  const handleAssignDeveloper = (bugId: string, developerId: string) => {
    console.log(`Assigning bug ${bugId} to developer ${developerId}`);
    alert('Developer assigned successfully!');
  };

  const completedBugs = project.bugs.filter((bug) => bug.status === 'COMPLETED').length;
  const progressPercentage = (completedBugs / project.bugs.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-4 mb-8">
          <div className="flex-1 flex items-center space-x-3">
            <Folder className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">{project.name}</h1>
            <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
              Active
            </span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <AlertCircle className="w-4 h-4" />
            <span>Last updated: {new Date().toLocaleDateString()}</span>
          </div>
        </div>

        <div className="h-px bg-gradient-to-r from-blue-100 via-blue-200 to-blue-100 mb-8" />

        <div className="flex flex-col lg:flex-row gap-6">
          <Sidebar
            project={project}
            completedPercentage={progressPercentage}
            developers={developers}
          />

          <div className="flex-1 overflow-x-auto">
            <KanbanBoard
              bugs={project.bugs}
              developers={developers}
              onAssignDeveloper={handleAssignDeveloper}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
