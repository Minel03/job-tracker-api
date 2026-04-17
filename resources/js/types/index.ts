import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    url: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    flash: {
        success: string | null;
        error: string | null;
    };
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface JobApplication {
    id: number;
    user_id: number;
    title: string;
    company: string;
    status: 'applied' | 'interview' | 'offer' | 'rejected';
    url: string | null;
    applied_at: string;
    interview_notes: string | null;
    ai_prep_plan: string | null;
    resume_url: string | null;
    resume_public_id: string | null;
    screenshot_url: string | null;
    screenshot_public_id: string | null;
    location: string | null;
    salary: string | null;
    job_type: 'full-time' | 'part-time' | 'contract' | 'internship' | 'freelance' | null;
    remote_policy: 'remote' | 'hybrid' | 'on-site' | null;
    created_at: string;
    updated_at: string;
}
