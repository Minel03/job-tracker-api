import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { BadgeCheck, Briefcase, Calendar, ChevronLeft, DollarSign, FileText, Globe, House, Image as ImageIcon, MapPin, MessageSquareText, Sparkles } from 'lucide-react';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

export default function Show({ application }: { application: any }) {
    const [isAiLoading, setIsAiLoading] = useState(false);

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Applications', href: '/job-applications' },
        { title: 'Interview Prep', href: '#' },
    ];

    const handleGenerateAiPrep = () => {
        router.post(
            route('job-applications.ai-prep', application.id),
            {},
            {
                onStart: () => setIsAiLoading(true),
                onFinish: () => setIsAiLoading(false),
                preserveScroll: true,
            },
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Prep: ${application.title} @ ${application.company}`} />

            <div className="mx-auto max-w-7xl px-6 p-4 pb-20 space-y-8">
                {/* Header Section */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-col gap-1">
                        <Link href={route('job-applications.index')} className="flex items-center gap-1 text-sm text-neutral-500 hover:text-blue-600 transition mb-2">
                             <ChevronLeft className="h-4 w-4" /> Back to list
                        </Link>
                        <h1 className="text-3xl font-extrabold tracking-tight">{application.title}</h1>
                        <p className="text-lg text-neutral-500 font-medium">{application.company}</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link 
                            href={route('job-applications.edit', application.id)}
                            className="rounded-lg border px-4 py-2 font-medium hover:bg-neutral-50 transition dark:hover:bg-neutral-800"
                        >
                            Edit Application
                        </Link>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    {/* Details Sidebar */}
                    <div className="md:col-span-1 space-y-4">
                        <div className="rounded-xl border bg-white p-5 shadow-xs dark:bg-neutral-900 border-neutral-100 dark:border-neutral-800">
                            <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-4">Application Info</h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-900/20">
                                        <BadgeCheck className="h-4 w-4" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs text-neutral-500 font-medium">Status</span>
                                        <span className="text-sm font-bold capitalize">{application.status}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-orange-50 text-orange-600 dark:bg-orange-900/20">
                                        <Calendar className="h-4 w-4" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs text-neutral-500 font-medium">Applied On</span>
                                        <span className="text-sm font-bold">{new Date(application.applied_at).toLocaleDateString()}</span>
                                    </div>
                                </div>

                                {application.location && (
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-neutral-50 text-neutral-600 dark:bg-neutral-800">
                                            <MapPin className="h-4 w-4" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-xs text-neutral-500 font-medium">Location</span>
                                            <span className="text-sm font-bold">{application.location}</span>
                                        </div>
                                    </div>
                                )}

                                {application.salary && (
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-green-50 text-green-600 dark:bg-green-900/20">
                                            <DollarSign className="h-4 w-4" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-xs text-neutral-500 font-medium">Salary</span>
                                            <span className="text-sm font-bold">{application.salary}</span>
                                        </div>
                                    </div>
                                )}

                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20">
                                        <Briefcase className="h-4 w-4" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs text-neutral-500 font-medium">Type</span>
                                        <span className="text-sm font-bold capitalize">{application.job_type}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-purple-50 text-purple-600 dark:bg-purple-900/20">
                                        <House className="h-4 w-4" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs text-neutral-500 font-medium">Work Policy</span>
                                        <span className="text-sm font-bold capitalize">{application.remote_policy}</span>
                                    </div>
                                </div>

                                {application.url && (
                                    <div className="flex items-center gap-3 group">
                                        <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20">
                                            <Globe className="h-4 w-4" />
                                        </div>
                                        <div className="flex flex-col overflow-hidden">
                                            <span className="text-xs text-neutral-500 font-medium">Job Link</span>
                                            <a href={application.url} target="_blank" className="text-sm font-bold text-blue-600 hover:underline truncate">
                                                View Original
                                            </a>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Document Evidence */}
                        {(application.resume_url || application.screenshot_url) && (
                            <div className="rounded-xl border bg-white p-5 shadow-xs dark:bg-neutral-900 border-neutral-100 dark:border-neutral-800">
                                <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-4">Attached Evidence</h3>
                                <div className="space-y-3">
                                    {application.resume_url && (
                                        <a 
                                            href={application.resume_url} 
                                            target="_blank" 
                                            className="flex items-center gap-3 p-2 rounded-lg border border-neutral-50 hover:border-blue-200 hover:bg-blue-50/30 transition dark:border-neutral-800 dark:hover:border-blue-900/30 dark:hover:bg-blue-900/10 group"
                                        >
                                            <div className="p-2 rounded-md bg-blue-50 text-blue-600 dark:bg-blue-900/30 group-hover:scale-110 transition">
                                                <FileText className="h-4 w-4" />
                                            </div>
                                            <span className="text-xs font-bold">View Resume</span>
                                        </a>
                                    )}

                                    {application.screenshot_url && (
                                        <a 
                                            href={application.screenshot_url} 
                                            target="_blank" 
                                            className="flex items-center gap-3 p-2 rounded-lg border border-neutral-50 hover:border-indigo-200 hover:bg-indigo-50/30 transition dark:border-neutral-800 dark:hover:border-indigo-900/30 dark:hover:bg-indigo-900/10 group"
                                        >
                                            <div className="p-2 rounded-md bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 group-hover:scale-110 transition">
                                                <ImageIcon className="h-4 w-4" />
                                            </div>
                                            <span className="text-xs font-bold">Job Screenshot</span>
                                        </a>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Main Content Area */}
                    <div className="md:col-span-2 space-y-6">
                        {/* Interview Notes */}
                        <div className="rounded-xl border bg-white p-6 shadow-xs dark:bg-neutral-900">
                            <div className="flex items-center gap-2 mb-4 text-neutral-700 dark:text-neutral-300">
                                <MessageSquareText className="h-5 w-5" />
                                <h3 className="font-bold">Interview Notes & Research</h3>
                            </div>
                            {application.interview_notes ? (
                                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed whitespace-pre-wrap">
                                    {application.interview_notes}
                                </p>
                            ) : (
                                <p className="text-neutral-400 italic text-sm">No notes provided for this application.</p>
                            )}
                        </div>

                        {/* AI Coach Card */}
                        <div className="rounded-2xl border-2 border-blue-100 bg-blue-50/20 p-8 dark:border-blue-900/30 dark:bg-blue-900/10 transition shadow-inner">
                            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="p-2 rounded-full bg-blue-600 text-white shadow-lg shadow-blue-500/30 animate-pulse">
                                        <Sparkles className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-blue-900 dark:text-blue-100">AI Interview Coach</h2>
                                        <p className="text-xs text-blue-700/60 dark:text-blue-300/60 font-medium">Llama 3.3 Powered Prep</p>
                                    </div>
                                </div>
                                <button
                                    onClick={handleGenerateAiPrep}
                                    disabled={isAiLoading}
                                    className="rounded-full bg-blue-600 px-6 py-2.5 text-sm font-bold text-white shadow-xl shadow-blue-500/20 transition hover:bg-blue-700 hover:scale-105 active:scale-95 disabled:opacity-50"
                                >
                                    {isAiLoading ? 'Analyzing...' : (application.ai_prep_plan ? '🎯 Refine Prep Plan' : '⚡ Generate Prep Plan')}
                                </button>
                            </div>

                            {application.ai_prep_plan ? (
                                <div className="rounded-xl border bg-white p-6 shadow-xs dark:bg-neutral-900 prose prose-sm dark:prose-invert max-w-none prose-headings:font-bold prose-headings:text-blue-900 dark:prose-headings:text-blue-100 prose-p:leading-relaxed prose-li:my-2">
                                    <ReactMarkdown>
                                        {application.ai_prep_plan}
                                    </ReactMarkdown>
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <p className="text-blue-800/60 dark:text-blue-200/60 mb-1 font-medium">
                                        Need to prepare for this interview?
                                    </p>
                                    <p className="text-xs text-blue-700/40 dark:text-blue-300/40 px-4">
                                        I'll analyze your notes and the job role to create a personalized strategy.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
