export interface User {
  userId: string;
  walletAddress: string;
  email?: string;
  name?: string;
  createdAt: Date;
}

export interface Project {
  projectId: string;
  userId: string;
  propertyName: string;
  propertyAddress: string;
  description: string;
  mediaUrls: string[];
  templateId: string;
  videoUrl?: string;
  tokenAddress?: string;
  tokenSymbol?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TokenOffering {
  offeringId: string;
  projectId: string;
  tokenAddress: string;
  totalTokens: number;
  pricePerToken: number;
  tokensAvailable: number;
  status: 'active' | 'inactive' | 'sold_out';
  createdAt: Date;
}

export interface Lead {
  leadId: string;
  projectId: string;
  walletAddress: string;
  source: 'video_interaction' | 'farcaster_frame' | 'token_purchase';
  interactedAt: Date;
}

export interface CreateProjectForm {
  propertyName: string;
  propertyAddress: string;
  description: string;
  mediaUrls: string[];
  templateId: string;
}

export interface CreateTokenOfferingForm {
  projectId: string;
  totalTokens: number;
  pricePerToken: number;
  tokenSymbol: string;
}

