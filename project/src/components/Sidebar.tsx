import { format } from 'date-fns';
import { Bug, Plus, Users } from 'lucide-react';
import { Project, Developer } from '../types';

interface SidebarProps {
  project: Project;
  completedPercentage: number;
  developers: Developer[];
}

export default function Sidebar({ project, completedPercentage, developers }: SidebarProps) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg w-full lg:w-80 h-fit sticky top-6">
      <div className="space-y-6">
        <div>
          <h2 className="text-sm font-medium text-gray-500">Project ID</h2>
          <p className="text-gray-900 font-medium">{project.id}</p>
        </div>
        
        <div>
          <h2 className="text-sm font-medium text-gray-500">Project Status</h2>
          <div className="mt-2">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">Progress</span>
              <span className="text-sm font-medium text-gray-700">{Math.round(completedPercentage)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${completedPercentage}%` }}
              />
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-sm font-medium text-gray-500">Start Date</h2>
          <p className="text-gray-900 font-medium">
            {format(new Date(project.startDate), 'MMM dd, yyyy')}
          </p>
        </div>
        
        <div>
          <h2 className="text-sm font-medium text-gray-500">Project Manager</h2>
          <div className="flex items-center mt-1 space-x-2">
            <img
              src={project.manager.avatar}
              alt={project.manager.name}
              className="w-8 h-8 rounded-full"
            />
            <div>
              <p className="text-gray-900 font-medium">{project.manager.name}</p>
              <p className="text-sm text-gray-500">{project.manager.email}</p>
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-sm font-medium text-gray-500">Team Members</h2>
          <div className="flex -space-x-2 mt-2 overflow-hidden">
            {developers.map((dev) => (
              <img
                key={dev.id}
                src={dev.avatar}
                alt={dev.name}
                className="w-8 h-8 rounded-full border-2 border-white"
                title={dev.name}
              />
            ))}
            <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center">
              <Users className="w-4 h-4 text-gray-500" />
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-sm font-medium text-gray-500">Total Bugs</h2>
          <div className="flex items-center space-x-2 mt-1">
            <Bug className="w-5 h-5 text-orange-400" />
            <p className="text-gray-900 font-medium">{project.bugCount}</p>
          </div>
        </div>
        
        <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-xl flex items-center justify-center space-x-2 hover:bg-blue-700 transition-all duration-200 hover:shadow-md hover:scale-[1.02] active:scale-[0.98]">
          <Plus className="w-5 h-5" />
          <span className="font-medium">Add New Bug</span>
        </button>
      </div>
    </div>
  );
}