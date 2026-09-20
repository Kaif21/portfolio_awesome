export interface Project {
  id: string;
  title: string;
  category: 'workflow' | 'erp' | 'web' | 'management';
  clientType: string;
  problemStatement: string;
  solutionArchitecture: string;
  impactValue: string;
  impactLabel: string;
  toolsUsed: string[];
  featured: boolean;
  year?: string;
  status?: 'Live' | 'In Production' | 'Archived';
  createdAt: string;
  updatedAt: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string[];
  type: 'work' | 'education' | 'certification';
  current?: boolean;
  tags?: string[];
}

export interface ContactForm {
  name: string;
  email: string;
  company: string;
  service: string;
  message: string;
}
