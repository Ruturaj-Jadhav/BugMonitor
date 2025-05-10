// mockData.ts
import { Bug, Developer, Project } from '../types';

const DEFAULT_AVATAR = 'https://api.dicebear.com/7.x/thumbs/svg?seed=dev';

function mapUserToDeveloper(user: any): Developer {
  return {
    id: user.userID.toString(),
    name: user.name,
    email: user.email,
    avatar: DEFAULT_AVATAR,
  };
}

function mapBug(rawBug: any): Bug {
  return {
    id: rawBug.bugId.toString(),
    title: rawBug.title,
    description: rawBug.description,
    priority: rawBug.priority,
    status:
      rawBug.status === 'OPEN'
        ? 'TO_DO'
        : rawBug.status === 'IN_PROGRESS'
        ? 'IN_PROGRESS'
        : 'COMPLETED',
    createdBy: mapUserToDeveloper(rawBug.createdBy),
    assignedTo: rawBug.assignedTo ? mapUserToDeveloper(rawBug.assignedTo) : undefined,
    createdAt: '2025-04-01T00:00:00Z', // fallback date
    dueDate: rawBug.due,
    completedAt: rawBug.resolvedDate || undefined,
  };
}

function mapProject(rawProject: any, allBugs: any[]): Project {
  const projectBugs = allBugs
    .filter((bug) => bug.project.projectId === rawProject.projectId)
    .map(mapBug);

  return {
    id: rawProject.projectId.toString(),
    name: rawProject.name,
    startDate: rawProject.startDate,
    manager: mapUserToDeveloper(rawProject.projectManager),
    bugCount: projectBugs.length,
    bugs: projectBugs,
  };
}

export let mockProjects: Project[] = [];

export async function fetchMockData(): Promise<void> {
  try {
    const [projectsResponse, bugsResponse] = await Promise.all([
      fetch('http://localhost:8089/projects'),
      fetch('http://localhost:8089/bugs'),
    ]);

    const [projectsData, bugsData] = await Promise.all([
      projectsResponse.json(),
      bugsResponse.json(),
    ]);

    mockProjects = projectsData.map((project: any) =>
      mapProject(project, bugsData)
    );
  } catch (error) {
    console.error('Error fetching mock data:', error);
  }
}
