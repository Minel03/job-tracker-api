import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type JobApplication } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Calendar, ChevronRight, Sparkles, TrendingUp } from 'lucide-react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface DashboardProps {
    stats: {
        total: number;
        applied: number;
        interviews: number;
        offers: number;
        rejected: number;
    };
    chartData: Array<{ name: string; value: number; color: string }>;
    upcomingInterviews: JobApplication[];
}

export default function Dashboard({ stats, chartData, upcomingInterviews }: DashboardProps) {
    const hasData = stats.total > 0;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="space-y-8 p-4 pb-20">
                {/* Header Row */}
                <div className="flex flex-col gap-6 border-b border-neutral-100 pb-8 sm:flex-row sm:items-end sm:justify-between dark:border-neutral-800">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-5xl font-black tracking-tight text-neutral-900 dark:text-neutral-100">Dashboard</h1>
                        <p className="text-sm font-medium text-neutral-500">Real-time analytical overview of your active application funnel.</p>
                    </div>
                </div>

                <div className="flex flex-col gap-8">
                    {/* Stats Grid */}
                    <div className="grid auto-rows-min gap-4 md:grid-cols-4">
                        <div className="rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
                            <div className="text-[10px] font-black tracking-widest text-neutral-400 uppercase">Total Applications</div>
                            <div className="mt-2 text-3xl font-black">{stats.total}</div>
                        </div>

                        <div className="rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
                            <div className="text-[10px] font-black tracking-widest text-blue-600 uppercase">Active Applications</div>
                            <div className="mt-2 text-3xl font-black text-blue-600">{stats.applied}</div>
                        </div>

                        <div className="rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
                            <div className="text-[10px] font-black tracking-widest text-orange-500 uppercase">Interviews</div>
                            <div className="mt-2 text-3xl font-black text-orange-500">{stats.interviews}</div>
                        </div>

                        <div className="rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
                            <div className="text-[10px] font-black tracking-widest text-green-600 uppercase">Offers Received</div>
                            <div className="mt-2 text-3xl font-black text-green-600">{stats.offers}</div>
                        </div>
                    </div>

                    {/* Analytics and Widgets */}
                    <div className="grid gap-6 md:grid-cols-12">
                        {/* Status Distribution Chart */}
                        <div className="flex flex-col rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm md:col-span-12 lg:col-span-5 dark:border-neutral-800 dark:bg-neutral-900">
                            <div className="mb-8 flex items-center gap-2 text-[10px] font-black tracking-widest text-neutral-400 uppercase">
                                <TrendingUp className="h-4 w-4" /> Application Funnel
                            </div>
                            {hasData ? (
                                <div className="flex min-h-[300px] flex-1 flex-col justify-between">
                                    <div className="h-[220px] w-full">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={chartData.filter((d) => d.value > 0)}
                                                    innerRadius={65}
                                                    outerRadius={85}
                                                    paddingAngle={chartData.filter((d) => d.value > 0).length > 1 ? 8 : 0}
                                                    dataKey="value"
                                                    stroke="none"
                                                    cx="50%"
                                                    cy="50%"
                                                >
                                                    {chartData
                                                        .filter((d) => d.value > 0)
                                                        .map((entry, index) => (
                                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                                        ))}
                                                </Pie>
                                                <Tooltip
                                                    contentStyle={{
                                                        borderRadius: '12px',
                                                        border: 'none',
                                                        boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                                                        fontSize: '12px',
                                                        fontWeight: 'bold',
                                                    }}
                                                />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>

                                    <div className="mt-6 grid grid-cols-2 gap-x-8 gap-y-3 border-t pt-6 dark:border-neutral-800">
                                        {chartData.map((item) => (
                                            <div key={item.name} className="flex items-center gap-2">
                                                <div className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: item.color }} />
                                                <span className="truncate text-xs font-medium text-neutral-500">{item.name}</span>
                                                <span className="ml-auto text-sm font-bold">{item.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-1 items-center justify-center py-10 text-center">
                                    <p className="text-sm text-neutral-500 italic">Add some applications to see your funnel analytics.</p>
                                </div>
                            )}
                        </div>

                        {/* Upcoming Interviews Widget */}
                        <div className="flex flex-col rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm md:col-span-12 lg:col-span-7 dark:border-neutral-800 dark:bg-neutral-900">
                            <div className="mb-8 flex items-center justify-between">
                                <div className="flex items-center gap-2 text-[10px] font-black tracking-widest text-neutral-400 uppercase">
                                    <Calendar className="h-4 w-4" /> Recent Interview Activity
                                </div>
                                <Link
                                    href="/job-applications"
                                    className="text-[10px] font-black tracking-widest text-blue-600 uppercase transition hover:text-blue-700"
                                >
                                    View all
                                </Link>
                            </div>

                            <div className="flex flex-col gap-3">
                                {upcomingInterviews.length > 0 ? (
                                    upcomingInterviews.map((job) => (
                                        <Link
                                            key={job.id}
                                            href={route('job-applications.show', job.id)}
                                            className="group flex items-center justify-between rounded-xl border border-neutral-100 p-4 shadow-sm transition-all hover:border-blue-100 hover:bg-blue-50/50 hover:shadow-md dark:border-neutral-800 dark:hover:border-blue-900/30 dark:hover:bg-blue-900/10"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="rounded-lg bg-blue-50 p-2.5 text-blue-600 shadow-sm dark:bg-blue-900/20">
                                                    <Sparkles className="h-4 w-4" />
                                                </div>
                                                <div>
                                                    <p className="mb-1 max-w-[150px] truncate leading-none font-bold transition group-hover:text-blue-600 sm:max-w-none">
                                                        {job.title}
                                                    </p>
                                                    <p className="text-xs font-medium text-neutral-500">{job.company}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 text-blue-600 opacity-0 transition-opacity group-hover:opacity-100">
                                                <span className="text-[10px] font-bold tracking-wider uppercase">Start Prep</span>
                                                <ChevronRight className="h-4 w-4" />
                                            </div>
                                        </Link>
                                    ))
                                ) : (
                                    <div className="flex flex-1 flex-col items-center justify-center rounded-xl border-2 border-dashed py-12">
                                        <p className="mb-2 text-neutral-500">No active interviews tracked yet.</p>
                                        <Link href="/job-applications/create" className="text-sm font-bold text-blue-500 hover:underline">
                                            Add your first interview?
                                        </Link>
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
