export type Priority = 'LOW' | 'MEDIUM' | 'HIGH';
export type Status = 'TO_DO' | 'IN_PROGRESS' | 'COMPLETED';

export interface Developer {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface Bug {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  createdBy: Developer;
  assignedTo?: Developer;
  createdAt: string;
  dueDate: string;
  completedAt?: string;
}

export interface Project {
  id: string;
  name: string;
  startDate: string;
  manager: Developer;
  bugCount: number;
  bugs: Bug[];
}