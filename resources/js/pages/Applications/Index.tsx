import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type JobApplication } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { BriefcaseBusiness, Filter, MapPin, Search, Sparkles } from 'lucide-react';
import { useMemo, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Applications', href: '/job-applications' }];

const getStatusColor = (status: string) => {
    switch (status) {
        case 'interview':
            return 'bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/40 dark:text-orange-300 dark:border-orange-800';
        case 'offer':
            return 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/40 dark:text-green-300 dark:border-green-800';
        case 'rejected':
            return 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/40 dark:text-red-300 dark:border-red-800';
        default:
            return 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/40 dark:text-blue-300 dark:border-blue-800';
    }
};

export default function Index({ applications }: { applications: JobApplication[] }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const handleStatusUpdate = (jobId: number, newStatus: string) => {
        router.patch(
            route('job-applications.update', jobId),
            {
                status: newStatus,
            },
            {
                preserveScroll: true,
            },
        );
    };

    // Real-time filtering logic
    const filteredApplications = useMemo(() => {
        return applications.filter((job) => {
            const matchesSearch =
                job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (job.interview_notes && job.interview_notes.toLowerCase().includes(searchQuery.toLowerCase()));

            const matchesStatus = statusFilter === 'all' || job.status === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [applications, searchQuery, statusFilter]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Job Applications" />

            <div className="space-y-6 p-4 pb-20">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">My Applications</h1>
                        <p className="text-sm text-neutral-500">Track and manage your professional opportunities.</p>
                    </div>
                    <Link
                        href="/job-applications/create"
                        className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white shadow-xs transition hover:bg-blue-700"
                    >
                        Add New Job
                    </Link>
                </div>

                {/* Search and Filters */}
                <div className="flex flex-col gap-4 sm:flex-row">
                    <div className="relative flex-1">
                        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-neutral-500" />
                        <Input
                            placeholder="Search by title, company, or notes..."
                            className="pl-10"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex w-full items-center gap-2 sm:w-48">
                        <Filter className="h-4 w-4 shrink-0 text-neutral-500" />
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger>
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Statuses</SelectItem>
                                <SelectItem value="applied">Applied</SelectItem>
                                <SelectItem value="interview">Interview</SelectItem>
                                <SelectItem value="offer">Offer</SelectItem>
                                <SelectItem value="rejected">Rejected</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* List View */}
                <div className="grid gap-4">
                    {filteredApplications.length === 0 && (
                        <div className="rounded-2xl border-2 border-dashed border-neutral-200 py-20 text-center dark:border-neutral-800">
                            <div className="mb-4 text-4xl text-neutral-400">
                                <BriefcaseBusiness className="mx-auto h-12 w-12 opacity-20" />
                            </div>
                            <h3 className="text-lg font-medium">No applications found</h3>
                            <p className="mb-6 text-neutral-500">
                                {searchQuery || statusFilter !== 'all'
                                    ? "Try adjusting your search or filters to find what you're looking for."
                                    : 'Start your journey by adding your first job application.'}
                            </p>
                        </div>
                    )}

                    {filteredApplications.map((job) => (
                        <div
                            key={job.id}
                            className="flex flex-col gap-4 rounded-xl border bg-white p-5 shadow-xs transition hover:shadow-md sm:flex-row sm:items-center sm:justify-between dark:border-neutral-800 dark:bg-neutral-900"
                        >
                            <div className="flex flex-1 flex-col gap-1">
                                <h3 className="text-lg leading-none font-bold">{job.title}</h3>
                                <div className="flex flex-col gap-1.5 text-sm">
                                    <div className="flex items-center gap-2 text-neutral-500">
                                        <span className="font-bold text-neutral-800 dark:text-neutral-200">{job.company}</span>
                                        <span>•</span>
                                        <span>Applied {new Date(job.applied_at).toLocaleDateString()}</span>
                                    </div>

                                    {(job.location || job.job_type || job.remote_policy || job.salary) && (
                                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium text-neutral-400">
                                            {job.location && (
                                                <span className="flex items-center gap-1">
                                                    <MapPin className="h-3 w-3" />
                                                    {job.location}
                                                </span>
                                            )}
                                            {job.job_type && (
                                                <span className="flex items-center gap-1">
                                                    <BriefcaseBusiness className="h-3 w-3" />
                                                    <span className="capitalize">{job.job_type}</span>
                                                </span>
                                            )}
                                            {job.remote_policy && (
                                                <span className="rounded-md bg-neutral-100 px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase dark:bg-neutral-800">
                                                    {job.remote_policy}
                                                </span>
                                            )}
                                            {job.salary && <span className="font-bold text-emerald-600 dark:text-emerald-400">{job.salary}</span>}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-4 sm:justify-end">
                                {/* Interactive Status Select */}
                                <div className="w-32">
                                    <Select value={job.status} onValueChange={(val) => handleStatusUpdate(job.id, val)}>
                                        <SelectTrigger
                                            className={`h-8 rounded-full border-none px-3 text-[10px] font-bold tracking-tight uppercase ${getStatusColor(job.status)}`}
                                        >
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="applied">Applied</SelectItem>
                                            <SelectItem value="interview">Interview</SelectItem>
                                            <SelectItem value="offer">Offer</SelectItem>
                                            <SelectItem value="rejected">Rejected</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Link
                                        href={route('job-applications.show', job.id)}
                                        className="flex items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-600 transition hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-300"
                                    >
                                        <Sparkles className="h-3.5 w-3.5" /> Interview Prep
                                    </Link>

                                    <Link
                                        href={route('job-applications.edit', job.id)}
                                        className="px-2 text-sm font-medium text-neutral-500 transition hover:text-blue-600"
                                    >
                                        Edit
                                    </Link>

                                    <Link
                                        href={route('job-applications.destroy', job.id)}
                                        method="delete"
                                        as="button"
                                        onBefore={() => confirm('Delete this application?')}
                                        className="px-2 text-sm font-medium text-neutral-500 transition hover:text-red-600"
                                    >
                                        Delete
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
