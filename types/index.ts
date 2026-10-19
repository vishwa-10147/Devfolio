export interface GitHubProfile {
  login: string;
  name: string | null;
  bio: string | null;
  avatarUrl: string;
  htmlUrl: string;
  publicRepos: number;
  followers: number;
  following: number;
  createdAt: string;
  updatedAt: string;
}

export interface GitHubRepository {
  id: number;
  name: string;
  fullName: string;
  description: string | null;
  htmlUrl: string;
  homepage: string | null;
  language: string | null;
  topics: string[];
  stargazersCount: number;
  forksCount: number;
  openIssuesCount: number;
  isFork: boolean;
  isArchived: boolean;
  isPrivate: boolean;
  createdAt: string;
  updatedAt: string;
  pushedAt: string | null;
  defaultBranch: string | null;
}

export interface NormalizedRepository {
  id: number;
  name: string;
  fullName: string;
  description: string | null;
  htmlUrl: string;
  homepage: string | null;
  language: string | null;
  topics: string[];
  stars: number;
  forks: number;
  openIssues: number;
  isFork: boolean;
  isArchived: boolean;
  isPrivate: boolean;
  createdAt: string;
  updatedAt: string;
  pushedAt: string | null;
  defaultBranch: string | null;
}

export interface CuratedProject {
  repository: string;
  featured: boolean;
  displayTitle?: string;
  summary: string;
  problem: string;
  roleAndContribution: string;
  architecture?: string;
  technologies: string[];
  verifiedResults?: string;
  screenshots?: string[];
  demoUrl?: string;
  documentationUrl?: string;
  status?: string;
  futureWork?: string;
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}

export interface Skill {
  name: string;
  proficiency?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  yearsOfExperience?: number;
  projects?: string[];
  verified: boolean;
}

export interface Experience {
  role: string;
  company: string;
  location?: string;
  startDate: string;
  endDate?: string;
  description: string[];
  technologies: string[];
}

export interface Education {
  degree: string;
  institution: string;
  location?: string;
  startDate: string;
  endDate?: string;
  description?: string;
}

export interface Publication {
  title: string;
  venue: string;
  date: string;
  url?: string;
  authors: string[];
  description?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  label: string;
  icon: string;
}