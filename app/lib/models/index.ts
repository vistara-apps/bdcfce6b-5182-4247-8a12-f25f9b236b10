// Mock data store for TokenProp Tours
// In a real application, this would be replaced with a proper database

import { User, Project, TokenOffering, Lead } from '../types';
import { v4 as uuidv4 } from 'uuid';

// Mock data
const mockUsers: User[] = [
  {
    userId: 'user-1',
    walletAddress: '0x1234567890123456789012345678901234567890',
    email: 'john.doe@example.com',
    name: 'John Doe',
    createdAt: new Date('2024-01-01'),
  },
];

const mockProjects: Project[] = [
  {
    projectId: 'project-1',
    userId: 'user-1',
    propertyName: 'Luxury Downtown Condo',
    propertyAddress: '123 Main St, Downtown City, ST 12345',
    description: 'A stunning luxury condo with panoramic city views, modern amenities, and premium finishes.',
    mediaUrls: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
    ],
    templateId: 'template-1',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    tokenAddress: '0xabcdef1234567890abcdef1234567890abcdef12',
    tokenSymbol: 'LUXCONDO',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
];

const mockTokenOfferings: TokenOffering[] = [
  {
    offeringId: 'offering-1',
    projectId: 'project-1',
    tokenAddress: '0xabcdef1234567890abcdef1234567890abcdef12',
    totalTokens: 10000,
    pricePerToken: 50.00,
    tokensAvailable: 7500,
    status: 'active',
    createdAt: new Date('2024-01-15'),
  },
];

const mockLeads: Lead[] = [];

// Storage keys
const STORAGE_KEYS = {
  users: 'tokenprop_users',
  projects: 'tokenprop_projects',
  tokenOfferings: 'tokenprop_token_offerings',
  leads: 'tokenprop_leads',
  currentUser: 'tokenprop_current_user',
};

// Utility functions for localStorage
const getFromStorage = <T>(key: string, defaultValue: T): T => {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
};

const setToStorage = <T>(key: string, value: T): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Handle storage errors silently
  }
};

// User operations
export const getUsers = (): User[] => {
  return getFromStorage(STORAGE_KEYS.users, mockUsers);
};

export const getUser = (userId: string): User | undefined => {
  const users = getUsers();
  return users.find(user => user.userId === userId);
};

export const createUser = (userData: Omit<User, 'userId' | 'createdAt'>): User => {
  const users = getUsers();
  const newUser: User = {
    ...userData,
    userId: uuidv4(),
    createdAt: new Date(),
  };
  users.push(newUser);
  setToStorage(STORAGE_KEYS.users, users);
  return newUser;
};

export const getCurrentUser = (): User | null => {
  return getFromStorage(STORAGE_KEYS.currentUser, null);
};

export const setCurrentUser = (user: User | null): void => {
  setToStorage(STORAGE_KEYS.currentUser, user);
};

// Project operations
export const getProjects = (userId?: string): Project[] => {
  const projects = getFromStorage(STORAGE_KEYS.projects, mockProjects);
  return userId ? projects.filter(project => project.userId === userId) : projects;
};

export const getProject = (projectId: string): Project | undefined => {
  const projects = getProjects();
  return projects.find(project => project.projectId === projectId);
};

export const getProjectById = (projectId: string): Project | null => {
  const project = getProject(projectId);
  return project || null;
};

export const getUserProjects = (userId: string): Project[] => {
  return getProjects(userId);
};

export const createProject = (projectData: Omit<Project, 'projectId' | 'createdAt' | 'updatedAt'>): Project => {
  const projects = getProjects();
  const newProject: Project = {
    ...projectData,
    projectId: uuidv4(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  projects.push(newProject);
  setToStorage(STORAGE_KEYS.projects, projects);
  return newProject;
};

export const updateProject = (projectId: string, updates: Partial<Project>): Project | null => {
  const projects = getProjects();
  const index = projects.findIndex(project => project.projectId === projectId);
  if (index === -1) return null;

  projects[index] = { ...projects[index], ...updates, updatedAt: new Date() };
  setToStorage(STORAGE_KEYS.projects, projects);
  return projects[index];
};

// Token Offering operations
export const getTokenOfferings = (projectId?: string): TokenOffering[] => {
  const offerings = getFromStorage(STORAGE_KEYS.tokenOfferings, mockTokenOfferings);
  return projectId ? offerings.filter(offering => offering.projectId === projectId) : offerings;
};

export const getTokenOffering = (offeringId: string): TokenOffering | undefined => {
  const offerings = getTokenOfferings();
  return offerings.find(offering => offering.offeringId === offeringId);
};

export const createTokenOffering = (offeringData: Omit<TokenOffering, 'offeringId' | 'createdAt'>): TokenOffering => {
  const offerings = getTokenOfferings();
  const newOffering: TokenOffering = {
    ...offeringData,
    offeringId: uuidv4(),
    createdAt: new Date(),
  };
  offerings.push(newOffering);
  setToStorage(STORAGE_KEYS.tokenOfferings, offerings);
  return newOffering;
};

// Lead operations
export const getLeads = (projectId?: string): Lead[] => {
  const leads = getFromStorage(STORAGE_KEYS.leads, mockLeads);
  return projectId ? leads.filter(lead => lead.projectId === projectId) : leads;
};

export const createLead = (leadData: Omit<Lead, 'leadId' | 'interactedAt'>): Lead => {
  const leads = getLeads();
  const newLead: Lead = {
    ...leadData,
    leadId: uuidv4(),
    interactedAt: new Date(),
  };
  leads.push(newLead);
  setToStorage(STORAGE_KEYS.leads, leads);
  return newLead;
};

