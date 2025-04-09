import { Bug, Developer, Status } from '../types';
import BugCard from './BugCard';

interface KanbanBoardProps {
  bugs: Bug[];
  developers: Developer[];
  onAssignDeveloper: (bugId: string, developerId: string) => void;
}

export default function KanbanBoard({ bugs, developers, onAssignDeveloper }: KanbanBoardProps) {
  const columns: Status[] = ['TO_DO', 'IN_PROGRESS', 'COMPLETED'];
  
  const getBugsByStatus = (status: Status) => bugs.filter((bug) => bug.status === status);
  
  const columnTitles = {
    'TO_DO': 'To Do',
    'IN_PROGRESS': 'In Progress',
    'COMPLETED': 'Completed'
  };

  const columnIcons = {
    'TO_DO': '📋',
    'IN_PROGRESS': '⚡',
    'COMPLETED': '✅'
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {columns.map((status) => (
        <div key={status} className="space-y-4">
          <div className="flex items-center justify-between bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center space-x-2">
              <span className="text-xl" role="img" aria-label={status}>
                {columnIcons[status]}
              </span>
              <h2 className="text-lg font-semibold text-gray-900">{columnTitles[status]}</h2>
            </div>
            <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full">
              {getBugsByStatus(status).length}
            </span>
          </div>
          
          <div className="space-y-4 min-h-[200px]">
            {getBugsByStatus(status).map((bug) => (
              <BugCard
                key={bug.id}
                bug={bug}
                developers={status === 'TO_DO' ? developers : undefined}
                onAssign={
                  status === 'TO_DO'
                    ? (developerId) => onAssignDeveloper(bug.id, developerId)
                    : undefined
                }
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}