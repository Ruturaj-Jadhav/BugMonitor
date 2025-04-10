import { format } from 'date-fns';
import { AlertCircle, Calendar, CheckCircle2, ChevronDown, Clock, User } from 'lucide-react';
import { Bug, Developer } from '../types';

interface BugCardProps {
  bug: Bug;
  onAssign?: (developerId: string) => void;
  developers?: Developer[];
}

export default function BugCard({ bug, onAssign, developers }: BugCardProps) {
  const priorityConfig = {
    LOW: {
      color: 'bg-blue-100 text-blue-800',
      icon: '🔵'
    },
    MEDIUM: {
      color: 'bg-orange-100 text-orange-800',
      icon: '⚠️'
    },
    HIGH: {
      color: 'bg-red-100 text-red-800',
      icon: '🔥'
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-200">
      <div className="flex items-start justify-between">
        <h3 className="font-medium text-gray-900">{bug.title}</h3>
        <span 
          className={`text-xs px-3 py-1 rounded-full flex items-center space-x-1 ${priorityConfig[bug.priority].color}`}
          title={`Priority: ${bug.priority}`}
        >
          <span>{priorityConfig[bug.priority].icon}</span>
          <span>{bug.priority}</span>
        </span>
      </div>
      
      <div className="relative mt-2">
        <p className="text-sm text-gray-600 line-clamp-2">{bug.description}</p>
        {bug.description.length > 100 && (
          <button 
            className="text-xs text-blue-600 hover:text-blue-800 absolute bottom-0 right-0 bg-white pl-2"
            onClick={() => alert(bug.description)}
          >
            Read more
          </button>
        )}
      </div>
      
      <div className="mt-4 space-y-3">
        <div className="flex items-center text-sm text-gray-500">
          <Calendar className="w-4 h-4 mr-2" />
          Due: {format(new Date(bug.dueDate), 'MMM dd')}
        </div>
        
        {bug.status === 'TO_DO' && developers && (
          <div className="relative">
            <select
              className="w-full px-3 py-2 text-sm border rounded-lg appearance-none bg-white pr-8 hover:border-blue-500 transition-colors"
              onChange={(e) => onAssign?.(e.target.value)}
              defaultValue=""
            >
              <option value="" disabled>Assign Developer</option>
              {developers.map((dev) => (
                <option key={dev.id} value={dev.id}>
                  {dev.name}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-gray-400 absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none" />
          </div>
        )}
        
        {bug.assignedTo && (
          <div className="flex items-center space-x-2">
            <User className="w-4 h-4 text-gray-400" />
            <div className="flex items-center space-x-2">
              <img
                src={bug.assignedTo.avatar}
                alt={bug.assignedTo.name}
                className="w-6 h-6 rounded-full"
              />
              <span className="text-sm text-gray-600">{bug.assignedTo.name}</span>
            </div>
          </div>
        )}
        
        {bug.status === 'COMPLETED' && bug.completedAt && (
          <div className="flex items-center text-sm text-green-600">
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Completed: {format(new Date(bug.completedAt), 'MMM dd')}
          </div>
        )}
        
        {bug.status === 'IN_PROGRESS' && (
          <div className="flex items-center text-sm text-orange-600">
            <AlertCircle className="w-4 h-4 mr-2" />
            In Progress
          </div>
        )}
      </div>
    </div>
  );
}