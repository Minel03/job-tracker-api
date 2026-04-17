import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type JobApplication } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import {
    BadgeCheck,
    Briefcase,
    Calendar,
    CheckCircle2,
    ChevronLeft,
    Clipboard,
    DollarSign,
    FileText,
    Globe,
    House,
    Image as ImageIcon,
    MapPin,
    MessageSquareText,
    Sparkles,
} from 'lucide-react';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

export default function Show({ application }: { application: JobApplication }) {
    const [isAiLoading, setIsAiLoading] = useState(false);
    const [copySuccess, setCopySuccess] = useState(false);

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Applications', href: '/job-applications' },
        { title: 'Interview Prep', href: '#' },
    ];

    const getStepStatus = (step: string) => {
        const order = ['applied', 'interview', 'offer'];
        const currentIdx = order.indexOf(application.status || 'applied');
        const stepIdx = order.indexOf(step);

        if (stepIdx < currentIdx) return 'complete';
        if (stepIdx === currentIdx) return 'current';
        return 'upcoming';
    };

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

    const handleCopyPlan = () => {
        if (!application.ai_prep_plan) return;
        navigator.clipboard.writeText(application.ai_prep_plan);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Prep: ${application.title} @ ${application.company}`} />

            <div className="mx-auto max-w-7xl space-y-8 p-4 px-6 pb-20">
                {/* Header Section */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-col gap-1">
                        <Link
                            href={route('job-applications.index')}
                            className="mb-2 flex items-center gap-1 text-sm text-neutral-500 transition hover:text-blue-600"
                        >
                            <ChevronLeft className="h-4 w-4" /> Back to list
                        </Link>
                        <h1 className="text-4xl font-black tracking-tight">{application.title}</h1>
                        <p className="text-xl font-medium text-neutral-500">{application.company}</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link
                            href={route('job-applications.edit', application.id)}
                            className="rounded-xl border px-5 py-2.5 text-sm font-bold shadow-sm transition hover:bg-neutral-50 dark:hover:bg-neutral-800"
                        >
                            Edit Case
                        </Link>
                    </div>
                </div>

                {/* Journey Stepper */}
                <div className="relative flex justify-between rounded-2xl border border-neutral-100 bg-neutral-50/50 p-4 dark:border-neutral-800 dark:bg-neutral-900/50">
                    <div className="absolute top-1/2 left-0 h-0.5 w-full -translate-y-1/2 bg-neutral-200 px-20 dark:bg-neutral-800"></div>

                    {['applied', 'interview', 'offer'].map((step, i) => {
                        const status = getStepStatus(step);
                        return (
                            <div key={step} className="relative z-10 flex w-24 flex-col items-center gap-2">
                                <div
                                    className={`flex h-10 w-10 items-center justify-center rounded-full border-4 transition-all duration-500 ${
                                        status === 'complete'
                                            ? 'border-green-100 bg-green-500 text-white dark:border-green-900'
                                            : status === 'current'
                                              ? 'scale-110 border-blue-100 bg-blue-600 text-white shadow-lg dark:border-blue-900'
                                              : 'border-neutral-100 bg-white text-neutral-400 dark:border-neutral-700 dark:bg-neutral-800'
                                    }`}
                                >
                                    {status === 'complete' ? (
                                        <CheckCircle2 className="h-5 w-5" />
                                    ) : (
                                        <span className="text-xs font-black">{i + 1}</span>
                                    )}
                                </div>
                                <span
                                    className={`text-[10px] font-black tracking-widest uppercase ${
                                        status === 'upcoming' ? 'text-neutral-400' : 'text-neutral-900 dark:text-neutral-100'
                                    }`}
                                >
                                    {step}
                                </span>
                            </div>
                        );
                    })}
                </div>

                <div className="grid items-start gap-8 md:grid-cols-3">
                    {/* Details Sidebar - NOW STICKY */}
                    <div className="space-y-6 md:sticky md:top-6 md:col-span-1">
                        <div className="rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
                            <h3 className="mb-4 text-xs font-bold tracking-widest text-neutral-400 uppercase">Case Context</h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="rounded-lg bg-blue-50 p-2 text-blue-600 dark:bg-blue-900/20">
                                        <BadgeCheck className="h-4 w-4" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-bold tracking-tight text-neutral-400 uppercase">Status</span>
                                        <span className="text-sm font-black capitalize">{application.status}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="rounded-lg bg-orange-50 p-2 text-orange-600 dark:bg-orange-900/20">
                                        <Calendar className="h-4 w-4" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs font-medium text-neutral-500">Applied On</span>
                                        <span className="text-sm font-bold">{new Date(application.applied_at).toLocaleDateString()}</span>
                                    </div>
                                </div>

                                {application.location && (
                                    <div className="flex items-center gap-3">
                                        <div className="rounded-lg bg-neutral-50 p-2 text-neutral-600 dark:bg-neutral-800">
                                            <MapPin className="h-4 w-4" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-xs font-medium text-neutral-500">Location</span>
                                            <span className="text-sm font-bold">{application.location}</span>
                                        </div>
                                    </div>
                                )}

                                {application.salary && (
                                    <div className="flex items-center gap-3">
                                        <div className="rounded-lg bg-green-50 p-2 text-green-600 dark:bg-green-900/20">
                                            <DollarSign className="h-4 w-4" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-xs font-medium text-neutral-500">Salary</span>
                                            <span className="text-sm font-bold">{application.salary}</span>
                                        </div>
                                    </div>
                                )}

                                <div className="flex items-center gap-3">
                                    <div className="rounded-lg bg-indigo-50 p-2 text-indigo-600 dark:bg-indigo-900/20">
                                        <Briefcase className="h-4 w-4" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs font-medium text-neutral-500">Type</span>
                                        <span className="text-sm font-bold capitalize">{application.job_type}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="rounded-lg bg-purple-50 p-2 text-purple-600 dark:bg-purple-900/20">
                                        <House className="h-4 w-4" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs font-medium text-neutral-500">Work Policy</span>
                                        <span className="text-sm font-bold capitalize">{application.remote_policy}</span>
                                    </div>
                                </div>

                                {application.url && (
                                    <div className="group flex items-center gap-3">
                                        <div className="rounded-lg bg-emerald-50 p-2 text-emerald-600 dark:bg-emerald-900/20">
                                            <Globe className="h-4 w-4" />
                                        </div>
                                        <div className="flex flex-col overflow-hidden">
                                            <span className="text-xs font-medium text-neutral-500">Job Link</span>
                                            <a
                                                href={application.url}
                                                target="_blank"
                                                className="truncate text-sm font-bold text-blue-600 hover:underline"
                                            >
                                                View Original
                                            </a>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Document Evidence */}
                        {(application.resume_url || application.screenshot_url) && (
                            <div className="rounded-xl border border-neutral-100 bg-white p-5 shadow-xs dark:border-neutral-800 dark:bg-neutral-900">
                                <h3 className="mb-4 text-xs font-bold tracking-widest text-neutral-400 uppercase">Attached Evidence</h3>
                                <div className="space-y-3">
                                    {application.resume_url && (
                                        <a
                                            href={application.resume_url}
                                            target="_blank"
                                            className="group flex items-center gap-3 rounded-lg border border-neutral-50 p-2 transition hover:border-blue-200 hover:bg-blue-50/30 dark:border-neutral-800 dark:hover:border-blue-900/30 dark:hover:bg-blue-900/10"
                                        >
                                            <div className="rounded-md bg-blue-50 p-2 text-blue-600 transition group-hover:scale-110 dark:bg-blue-900/30">
                                                <FileText className="h-4 w-4" />
                                            </div>
                                            <span className="text-xs font-bold">View Resume</span>
                                        </a>
                                    )}

                                    {application.screenshot_url && (
                                        <a
                                            href={application.screenshot_url}
                                            target="_blank"
                                            className="group flex items-center gap-3 rounded-lg border border-neutral-50 p-2 transition hover:border-indigo-200 hover:bg-indigo-50/30 dark:border-neutral-800 dark:hover:border-indigo-900/30 dark:hover:bg-indigo-900/10"
                                        >
                                            <div className="rounded-md bg-indigo-50 p-2 text-indigo-600 transition group-hover:scale-110 dark:bg-indigo-900/30">
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
                    <div className="space-y-8 md:col-span-2">
                        {/* Interview Notes */}
                        <div className="rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
                            <div className="mb-4 flex items-center gap-2 text-neutral-800 dark:text-neutral-200">
                                <MessageSquareText className="h-5 w-5 text-neutral-400" />
                                <h3 className="font-bold">Interview Notes & Research</h3>
                            </div>
                            {application.interview_notes ? (
                                <p className="text-sm leading-relaxed whitespace-pre-wrap text-neutral-600 dark:text-neutral-400">
                                    {application.interview_notes}
                                </p>
                            ) : (
                                <p className="text-sm text-neutral-400 italic">No specific notes provided for this case.</p>
                            )}
                        </div>

                        {/* AI Coach Card - GLASSMORPHISM */}
                        <div className="group relative overflow-hidden rounded-3xl border-2 border-blue-100 bg-white shadow-2xl shadow-blue-500/10 dark:border-blue-900/30 dark:bg-neutral-950">
                            {/* Animated Background Glow */}
                            <div className="absolute -top-24 -right-24 h-64 w-64 animate-pulse rounded-full bg-blue-500/10 blur-3xl"></div>

                            <div className="relative p-8">
                                <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="relative">
                                            <div className="absolute inset-0 animate-pulse bg-blue-400 opacity-40 blur-lg"></div>
                                            <div className="relative rounded-2xl bg-blue-600 p-3 text-white shadow-xl">
                                                <Sparkles className="h-6 w-6" />
                                            </div>
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-black tracking-tight text-neutral-900 dark:text-neutral-100">
                                                AI Interview Coach
                                            </h2>
                                            <p className="text-xs font-bold tracking-wider text-blue-600 uppercase dark:text-blue-400">
                                                Expert Research & Strategist
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        {application.ai_prep_plan && (
                                            <button
                                                onClick={handleCopyPlan}
                                                className={`flex items-center gap-2 rounded-xl border px-4 py-2 text-xs font-bold transition ${
                                                    copySuccess
                                                        ? 'border-green-200 bg-green-50 text-green-600'
                                                        : 'hover:bg-neutral-50 dark:hover:bg-neutral-800'
                                                }`}
                                            >
                                                {copySuccess ? <BadgeCheck className="h-4 w-4" /> : <Clipboard className="h-4 w-4" />}
                                                {copySuccess ? 'Copied!' : 'Copy Strategy'}
                                            </button>
                                        )}
                                        <button
                                            onClick={handleGenerateAiPrep}
                                            disabled={isAiLoading}
                                            className="rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-500/30 transition hover:scale-[1.02] hover:bg-blue-700 active:scale-95 disabled:opacity-50"
                                        >
                                            {isAiLoading
                                                ? 'Synthesizing...'
                                                : application.ai_prep_plan
                                                  ? '🎯 Refine Prep Plan'
                                                  : '✨ Generate Strategy'}
                                        </button>
                                    </div>
                                </div>

                                {application.ai_prep_plan ? (
                                    <div className="rounded-2xl border bg-neutral-50/50 p-8 shadow-inner backdrop-blur-sm dark:bg-neutral-900/50">
                                        <div className="prose prose-sm dark:prose-invert prose-p:text-neutral-600 dark:prose-p:text-neutral-400 prose-p:leading-relaxed prose-strong:text-neutral-900 dark:prose-strong:text-white prose-headings:text-neutral-900 dark:prose-headings:text-neutral-100 prose-li:text-neutral-600 dark:prose-li:text-neutral-400 max-w-none">
                                            <ReactMarkdown
                                                components={{
                                                    h3: ({ ...props }) => (
                                                        <h3
                                                            className="flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-2 text-sm font-black tracking-tight text-blue-700 uppercase dark:bg-blue-900/30 dark:text-blue-300"
                                                            {...props}
                                                        />
                                                    ),
                                                    h2: ({ ...props }) => <h2 className="mb-4 border-b pb-2 font-black" {...props} />,
                                                }}
                                            >
                                                {application.ai_prep_plan}
                                            </ReactMarkdown>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-12 text-center">
                                        <div className="mb-6 rounded-full bg-blue-50 p-6 dark:bg-blue-900/10">
                                            <Sparkles className="h-10 w-10 text-blue-300 opacity-50" />
                                        </div>
                                        <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">Ready to strategize?</h3>
                                        <p className="mx-auto mt-2 max-w-xs text-sm text-neutral-500">
                                            I'll analyze the role details and your notes to build a hyper-personalized interview blueprint.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
