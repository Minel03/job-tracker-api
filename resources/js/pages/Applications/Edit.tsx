import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type JobApplication } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ChevronLeft } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'My Applications', href: '/job-applications' },
    { title: 'Edit Application', href: '#' },
];

export default function Edit({ application }: { application: JobApplication }) {
    // 1. Initialize with EXISTING data
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PATCH', // Required for file uploads on update in PHP/Laravel
        title: application.title || '',
        company: application.company || '',
        status: application.status || 'applied',
        applied_at: application.applied_at || '',
        url: application.url || '',
        interview_notes: application.interview_notes || '',
        resume: null as File | null,
        screenshot: null as File | null,
        location: application.location || '',
        salary: application.salary || '',
        job_type: application.job_type || 'full-time',
        remote_policy: application.remote_policy || 'on-site',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Use post instead of patch because of multipart/form-data limitations in PHP
        post(route('job-applications.update', application.id), {
            forceFormData: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Application" />
            <div className="space-y-8 p-4 pb-20">
                <div className="border-b pb-4">
                    <Link
                        href={route('job-applications.show', application.id)}
                        className="group mb-6 flex w-fit items-center gap-2 px-1 text-xs font-black tracking-widest text-neutral-400 uppercase transition hover:text-blue-600"
                    >
                        <ChevronLeft className="h-4 w-4 transition group-hover:-translate-x-1" /> Back to List
                    </Link>
                    <h1 className="text-3xl font-black tracking-tight">Edit</h1>
                    <p className="text-sm text-neutral-500">Update your application details and documents.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium">Job Title</label>
                            <input
                                type="text"
                                className="mt-1 w-full rounded-md border p-2.5 dark:bg-neutral-800"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                            />
                            {errors.title && <div className="mt-1 text-xs text-red-500">{errors.title}</div>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Company</label>
                            <input
                                type="text"
                                className="mt-1 w-full rounded-md border p-2.5 dark:bg-neutral-800"
                                value={data.company}
                                onChange={(e) => setData('company', e.target.value)}
                            />
                            {errors.company && <div className="mt-1 text-xs text-red-500">{errors.company}</div>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Status</label>
                            <select
                                className="mt-1 w-full rounded-md border p-2.5 dark:bg-neutral-800"
                                value={data.status}
                                onChange={(e) => setData('status', e.target.value as 'applied' | 'interview' | 'offer' | 'rejected')}
                            >
                                <option value="applied">Applied</option>
                                <option value="interview">Interview</option>
                                <option value="offer">Offer</option>
                                <option value="rejected">Rejected</option>
                            </select>
                            {errors.status && <div className="mt-1 text-xs text-red-500">{errors.status}</div>}
                        </div>
                    </div>

                    {/* Job Context Section */}
                    <div className="rounded-xl border border-neutral-100 bg-neutral-50/50 p-6 dark:border-neutral-800 dark:bg-neutral-900/50">
                        <h2 className="mb-4 text-sm font-bold tracking-wider text-neutral-500 uppercase">Job Context</h2>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div>
                                <label className="block text-sm font-medium">Location</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Remote, New York, Tokyo"
                                    className="mt-1 w-full rounded-md border p-2.5 dark:bg-neutral-800"
                                    value={data.location}
                                    onChange={(e) => setData('location', e.target.value)}
                                />
                                {errors.location && <div className="mt-1 text-xs text-red-500">{errors.location}</div>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium">Salary Range (Optional)</label>
                                <input
                                    type="text"
                                    placeholder="e.g. $100k - $120k"
                                    className="mt-1 w-full rounded-md border p-2.5 dark:bg-neutral-800"
                                    value={data.salary}
                                    onChange={(e) => setData('salary', e.target.value)}
                                />
                                {errors.salary && <div className="mt-1 text-xs text-red-500">{errors.salary}</div>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium">Job Type</label>
                                <select
                                    className="mt-1 w-full rounded-md border p-2.5 dark:bg-neutral-800"
                                    value={data.job_type}
                                    onChange={(e) =>
                                        setData('job_type', e.target.value as 'full-time' | 'part-time' | 'contract' | 'internship' | 'freelance')
                                    }
                                >
                                    <option value="full-time">Full-time</option>
                                    <option value="part-time">Part-time</option>
                                    <option value="contract">Contract</option>
                                    <option value="internship">Internship</option>
                                    <option value="freelance">Freelance</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium">Work Policy</label>
                                <select
                                    className="mt-1 w-full rounded-md border p-2.5 dark:bg-neutral-800"
                                    value={data.remote_policy}
                                    onChange={(e) => setData('remote_policy', e.target.value as 'remote' | 'hybrid' | 'on-site')}
                                >
                                    <option value="on-site">On-site</option>
                                    <option value="hybrid">Hybrid</option>
                                    <option value="remote">Remote</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div>
                            <label className="block text-sm font-medium">Date Applied</label>
                            <input
                                type="date"
                                className="mt-1 w-full rounded-md border p-2.5 dark:bg-neutral-800"
                                value={data.applied_at}
                                onChange={(e) => setData('applied_at', e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Job Posting URL</label>
                            <input
                                type="url"
                                placeholder="https://..."
                                className="mt-1 w-full rounded-md border p-2.5 dark:bg-neutral-800"
                                value={data.url}
                                onChange={(e) => setData('url', e.target.value)}
                            />
                        </div>
                    </div>

                    {/* File Upload Section */}
                    <div className="rounded-xl border border-neutral-100 bg-neutral-50/50 p-6 dark:border-neutral-800 dark:bg-neutral-900/50">
                        <h2 className="mb-4 text-sm font-bold tracking-wider text-neutral-500 uppercase">Documents & Evidence</h2>

                        <div className="grid gap-6">
                            <div className="space-y-3">
                                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">Resume Sent (PDF/DOCX)</label>
                                {application.resume_url && (
                                    <div className="flex items-center gap-2 rounded-lg bg-green-50 px-3 py-2 text-xs font-semibold text-green-700 dark:bg-green-900/20 dark:text-green-400">
                                        📄 Current Resume Attached
                                        <a href={application.resume_url} target="_blank" className="ml-auto underline">
                                            View
                                        </a>
                                    </div>
                                )}
                                <input
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    className="block w-full text-sm text-neutral-500 file:mr-4 file:rounded-full file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900/20 dark:file:text-blue-400"
                                    onChange={(e) => setData('resume', e.target.files ? e.target.files[0] : null)}
                                />
                                {errors.resume && <div className="mt-1 text-xs text-red-500">{errors.resume}</div>}
                            </div>

                            <div className="space-y-3">
                                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">Job Posting Screenshot</label>
                                {application.screenshot_url && (
                                    <div className="flex items-center gap-2 rounded-lg bg-indigo-50 px-3 py-2 text-xs font-semibold text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-400">
                                        🖼️ Screenshot Uploaded
                                        <a href={application.screenshot_url} target="_blank" className="ml-auto underline">
                                            View
                                        </a>
                                    </div>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="block w-full text-sm text-neutral-500 file:mr-4 file:rounded-full file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-indigo-700 hover:file:bg-indigo-100 dark:file:bg-indigo-900/20 dark:file:text-indigo-400"
                                    onChange={(e) => setData('screenshot', e.target.files ? e.target.files[0] : null)}
                                />
                                {errors.screenshot && <div className="mt-1 text-xs text-red-500">{errors.screenshot}</div>}
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Interview Notes & Research</label>
                        <textarea
                            rows={4}
                            placeholder="What do you know about this role?"
                            className="mt-1 w-full rounded-md border p-2.5 dark:bg-neutral-800"
                            value={data.interview_notes}
                            onChange={(e) => setData('interview_notes', e.target.value)}
                        />
                    </div>

                    <div className="flex items-center gap-4 pt-4">
                        <button
                            type="submit"
                            disabled={processing}
                            className="flex-1 rounded-xl bg-blue-600 py-3.5 text-sm font-black tracking-widest text-white uppercase shadow-xl shadow-blue-500/30 transition hover:scale-[1.01] hover:bg-blue-700 active:scale-95 disabled:opacity-50"
                        >
                            {processing ? 'Syncing to Cloud...' : 'Update Application'}
                        </button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
