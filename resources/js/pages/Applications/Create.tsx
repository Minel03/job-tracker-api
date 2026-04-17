import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Applications', href: '/job-applications' },
    { title: 'New Application', href: '/job-applications/create' },
];

export default function Create() {
    // 1. Initialize the form (Just like Inertia-Vue!)
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        company: '',
        status: 'applied',
        applied_at: new Date().toISOString().split('T')[0], // Today's date
        url: '',
        interview_notes: '',
        resume: null as File | null,
        screenshot: null as File | null,
        location: '',
        salary: '',
        job_type: 'full-time',
        remote_policy: 'on-site',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('job-applications.store'), {
            forceFormData: true, // Required for file uploads in Inertia
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Add Application" />

            <div className="mx-auto max-w-2xl space-y-8 p-4 pb-20">
                <div className="border-b pb-4">
                    <h1 className="text-2xl font-bold">New Job Application</h1>
                    <p className="text-sm text-neutral-500">Track your journey to your next great career move.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium">Job Title</label>
                            <input
                                type="text"
                                placeholder="e.g. Senior Frontend Developer"
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
                                placeholder="e.g. Google, Inc."
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
                        <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-neutral-500">Job Context</h2>
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
                                    onChange={(e) => setData('job_type', e.target.value as 'full-time' | 'part-time' | 'contract' | 'internship' | 'freelance')}
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
                            <label className="block text-sm font-medium">Job URL</label>
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
                        <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-neutral-500">Documents & Evidence</h2>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium">Resume Sent (PDF/DOCX)</label>
                                <input
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    className="mt-1 block w-full text-sm text-neutral-500 file:mr-4 file:rounded-full file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900/20 dark:file:text-blue-400"
                                    onChange={(e) => setData('resume', e.target.files ? e.target.files[0] : null)}
                                />
                                <p className="mt-1 text-xs text-neutral-500">Upload the specific version you used for this app.</p>
                                {errors.resume && <div className="mt-1 text-xs text-red-500">{errors.resume}</div>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium">Job Posting Screenshot</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="mt-1 block w-full text-sm text-neutral-500 file:mr-4 file:rounded-full file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-indigo-700 hover:file:bg-indigo-100 dark:file:bg-indigo-900/20 dark:file:text-indigo-400"
                                    onChange={(e) => setData('screenshot', e.target.files ? e.target.files[0] : null)}
                                />
                                <p className="mt-1 text-xs text-neutral-500">In case the listing gets taken down.</p>
                                {errors.screenshot && <div className="mt-1 text-xs text-red-500">{errors.screenshot}</div>}
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Interview Notes & Research</label>
                        <textarea
                            rows={3}
                            placeholder="Salary range, referrals, specific interests..."
                            className="mt-1 w-full rounded-md border p-2.5 dark:bg-neutral-800"
                            value={data.interview_notes}
                            onChange={(e) => setData('interview_notes', e.target.value)}
                        />
                    </div>

                    <div className="flex items-center gap-4 pt-4">
                        <button
                            type="submit"
                            disabled={processing}
                            className="flex-1 rounded-lg bg-blue-600 py-3 font-bold text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-700 disabled:opacity-50"
                        >
                            {processing ? 'Uploading to Cloud...' : 'Create Application'}
                        </button>

                        <Link
                            href={route('job-applications.index')}
                            className="px-6 py-2 text-sm font-medium text-neutral-500 hover:text-neutral-700"
                        >
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
