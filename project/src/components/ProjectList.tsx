import { format } from 'date-fns';
import { Bug, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Project } from '../types';

interface ProjectListProps {
  projects: Project[];
}

export default function ProjectList({ projects }: ProjectListProps) {
  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <Link
          key={project.id}
          to={`/projects/${project.id}`}
          className="block bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">{project.name}</h2>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
            
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-500">Start Date</p>
                <p className="font-medium text-gray-900">
                  {format(new Date(project.startDate), 'MMM dd, yyyy')}
                </p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Project Manager</p>
                <div className="flex items-center space-x-2">
                  <img
                    src={project.manager.avatar}
                    alt={project.manager.name}
                    className="w-6 h-6 rounded-full"
                  />
                  <p className="font-medium text-gray-900">{project.manager.name}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Total Bugs</p>
                <div className="flex items-center space-x-2">
                  <Bug className="w-5 h-5 text-orange-400" />
                  <p className="font-medium text-gray-900">{project.bugCount}</p>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}