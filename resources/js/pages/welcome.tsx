import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Briefcase, Sparkles, Shield, BarChart3, ChevronRight } from 'lucide-react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <div className="min-h-screen bg-white text-neutral-900 selection:bg-blue-100 selection:text-blue-900 dark:bg-neutral-950 dark:text-neutral-100">
            <Head title="Job Application Tracker | Elite Career Workstation" />
            
            {/* Header / Navigation */}
            <header className="fixed top-0 z-50 w-full border-b border-neutral-100 bg-white/80 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-950/80">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900">
                            <Briefcase className="h-5 w-5" />
                        </div>
                        <span className="text-sm font-black tracking-widest uppercase">Tracker.Elite</span>
                    </div>
                    
                    <nav className="flex items-center gap-6">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="inline-flex h-10 items-center justify-center rounded-xl bg-neutral-900 px-6 text-xs font-bold text-white transition hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
                            >
                                Enter Workspace
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="text-xs font-black tracking-widest text-neutral-400 uppercase transition hover:text-neutral-900 dark:text-neutral-500 dark:hover:text-neutral-100"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="inline-flex h-10 items-center justify-center rounded-xl bg-neutral-900 px-6 text-xs font-bold text-white transition hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
                                >
                                    Start Hunting
                                </Link>
                            </>
                        )}
                    </nav>
                </div>
            </header>

            <main>
                {/* Hero Section */}
                <section className="relative flex flex-col items-center px-6 pt-48 pb-32 text-center">
                    <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.02)_0%,transparent_50%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.02)_0%,transparent_50%)]" />
                    
                    <div className="mb-10 inline-flex items-center gap-2 rounded-full border border-neutral-100 bg-neutral-50 px-3 py-1 text-[10px] font-black tracking-widest text-neutral-500 uppercase dark:border-neutral-800 dark:bg-neutral-900">
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500"></span>
                        </span>
                        AI Powered Workstation v3.3
                    </div>
                    
                    <h1 className="max-w-4xl text-5xl font-black leading-tight tracking-tighter sm:text-7xl md:text-9xl">
                        Organize your hunt. <span className="text-neutral-400 dark:text-neutral-600">Land the offer.</span>
                    </h1>
                    
                    <p className="mt-8 max-w-2xl text-lg text-neutral-500 sm:text-xl dark:text-neutral-400">
                        A professional-grade career workstation built to organize your job search 
                        and accelerate your interview success with AI intelligence.
                    </p>
                    
                    <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row">
                        <Link
                            href={auth.user ? route('dashboard') : route('register')}
                            className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-neutral-900 px-8 text-sm font-bold text-white transition hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
                        >
                            Get Started Now <ChevronRight className="h-4 w-4 transition group-hover:translate-x-1" />
                        </Link>
                    </div>

                    <div className="mt-24 w-full max-w-5xl overflow-hidden rounded-2xl border border-neutral-100 bg-neutral-50/50 p-4 shadow-2xl transition-all duration-700 dark:border-neutral-800 dark:bg-neutral-900/50">
                        <div className="flex h-72 w-full overflow-hidden rounded-xl border border-neutral-100 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-950 sm:h-96">
                            {/* Mini Sidebar */}
                            <div className="hidden w-16 flex-col items-center border-r border-neutral-100 py-6 dark:border-neutral-800 sm:flex">
                                <div className="mb-8 flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900">
                                    <Briefcase className="h-4 w-4" />
                                </div>
                                <div className="space-y-4">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="h-2 w-8 rounded-full bg-neutral-100 dark:bg-neutral-800" />
                                    ))}
                                </div>
                            </div>
                            
                            {/* Mini Content area */}
                            <div className="flex-1 p-6 text-left sm:p-10">
                                <div className="mb-8 flex items-end justify-between border-b border-neutral-100 pb-6 dark:border-neutral-800">
                                    <div className="space-y-2">
                                        <div className="h-2 w-32 rounded-full bg-neutral-100 dark:bg-neutral-800" />
                                        <div className="h-6 w-48 rounded-md bg-neutral-200 dark:bg-neutral-700" />
                                    </div>
                                    <div className="h-8 w-24 rounded-lg bg-neutral-900 dark:bg-neutral-100" />
                                </div>
                                
                                <div className="grid grid-cols-3 gap-4">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="rounded-xl border border-neutral-100 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900/50">
                                            <div className="mb-2 h-2 w-12 rounded-full bg-neutral-200 dark:bg-neutral-700" />
                                            <div className="h-8 w-8 rounded-md bg-neutral-100 dark:bg-neutral-800" />
                                        </div>
                                    ))}
                                </div>
                                
                                <div className="mt-8 space-y-3">
                                    {[1, 2].map((i) => (
                                        <div key={i} className="flex h-12 w-full items-center justify-between rounded-lg border border-neutral-50 px-4 dark:border-neutral-900">
                                            <div className="flex items-center gap-3">
                                                <div className="h-6 w-6 rounded bg-neutral-100 dark:bg-neutral-800" />
                                                <div className="h-2 w-24 rounded-full bg-neutral-100 dark:bg-neutral-800" />
                                            </div>
                                            <div className="h-2 w-16 rounded-full bg-neutral-100 dark:bg-neutral-800" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Grid */}
                <section className="mx-auto max-w-7xl px-6 py-32">
                    <div className="grid gap-12 md:grid-cols-3">
                        <div className="space-y-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100">
                                <Sparkles className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-black tracking-tight">AI Interview Coach</h3>
                            <p className="text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
                                Generates custom preparation strategies and STAR answer blueprints tailored to every specific role and company.
                            </p>
                        </div>
                        
                        <div className="space-y-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100">
                                <Shield className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-black tracking-tight">Evidence Archival</h3>
                            <p className="text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
                                Never lose a job description again. Automatic resume versioning and cloud-synced screenshots for every application.
                            </p>
                        </div>
                        
                        <div className="space-y-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100">
                                <BarChart3 className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-black tracking-tight">Funnel Analytics</h3>
                            <p className="text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
                                Track your success rates with professional metrics. Visualize your journey from applied to offer in real-time.
                            </p>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="border-t border-neutral-100 py-12 dark:border-neutral-800">
                <div className="mx-auto max-w-7xl px-6 text-center">
                    <p className="text-xs font-black tracking-widest text-neutral-400 uppercase">
                        &copy; {new Date().getFullYear()} Tracker.Elite — Professional Career Workstation
                    </p>
                </div>
            </footer>
        </div>
    );
}
