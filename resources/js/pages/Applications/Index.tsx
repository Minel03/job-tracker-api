import AppLayout from '@/layouts/app-layout';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { BriefcaseBusiness, Filter, Search, Sparkles } from 'lucide-react';
import { useMemo, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Applications', href: '/job-applications' }];

const getStatusColor = (status: string) => {
    switch (status) {
        case 'interview': return 'bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/40 dark:text-orange-300 dark:border-orange-800';
        case 'offer': return 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/40 dark:text-green-300 dark:border-green-800';
        case 'rejected': return 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/40 dark:text-red-300 dark:border-red-800';
        default: return 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/40 dark:text-blue-300 dark:border-blue-800';
    }
};

export default function Index({ applications }: { applications: any[] }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const handleStatusUpdate = (jobId: number, newStatus: string) => {
        router.patch(route('job-applications.update', jobId), {
            status: newStatus,
        }, {
            preserveScroll: true,
        });
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
                    <Link href="/job-applications/create" className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white shadow-xs transition hover:bg-blue-700">
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
                    <div className="flex items-center gap-2 w-full sm:w-48">
                        <Filter className="h-4 w-4 text-neutral-500 shrink-0" />
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
                                    : "Start your journey by adding your first job application."}
                            </p>
                        </div>
                    )}

                    {filteredApplications.map((job) => (
                        <div
                            key={job.id}
                            className="flex flex-col gap-4 rounded-xl border bg-white p-5 shadow-xs transition hover:shadow-md sm:flex-row sm:items-center sm:justify-between dark:border-neutral-800 dark:bg-neutral-900"
                        >
                            <div className="flex flex-1 flex-col gap-1">
                                <h3 className="text-lg font-bold leading-none">{job.title}</h3>
                                <div className="flex flex-col gap-1 text-sm text-neutral-500">
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium text-neutral-700 dark:text-neutral-300">{job.company}</span>
                                        <span>•</span>
                                        <span>Applied {new Date(job.applied_at).toLocaleDateString()}</span>
                                    </div>

                                    {job.url && (
                                        <a href={job.url} target="_blank" className="flex items-center gap-1 text-xs text-blue-500 hover:underline">
                                            🔗 View Posting
                                        </a>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-4 sm:justify-end">
                                {/* Interactive Status Select */}
                                <div className="w-32">
                                    <Select value={job.status} onValueChange={(val) => handleStatusUpdate(job.id, val)}>
                                        <SelectTrigger className={`h-8 text-[10px] font-bold tracking-tight uppercase border-none rounded-full px-3 ${getStatusColor(job.status)}`}>
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
                                        className="text-sm font-medium text-neutral-500 transition hover:text-blue-600 px-2"
                                    >
                                        Edit
                                    </Link>

                                    <Link
                                        href={route('job-applications.destroy', job.id)}
                                        method="delete"
                                        as="button"
                                        onBefore={() => confirm('Delete this application?')}
                                        className="text-sm font-medium text-neutral-500 transition hover:text-red-600 px-2"
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
