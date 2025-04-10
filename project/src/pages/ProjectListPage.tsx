import { useEffect, useState } from 'react';
import { Bug } from 'lucide-react';
import { fetchMockData, mockProjects } from '../data/mockData';
import ProjectList from '../components/ProjectList';
import { Project } from '../types';

export default function ProjectListPage() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetchMockData().then(() => {
      setProjects(mockProjects);
    });
  }, []);

  if (projects.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Loading projects...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-3 mb-8">
          <Bug className="w-8 h-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">Bug Tracker</h1>
        </div>

        <ProjectList projects={projects} />
      </div>
    </div>
  );
}
