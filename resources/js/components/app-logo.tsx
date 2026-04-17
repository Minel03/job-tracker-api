import { BriefcaseBusiness } from 'lucide-react';

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-blue-500 text-white shadow-md">
                <BriefcaseBusiness className="size-5" strokeWidth={2.5} />
            </div>
            <div className="ml-2 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate font-bold tracking-tight text-neutral-900 dark:text-neutral-100 uppercase text-[11px]">
                    Job Tracker <span className="text-blue-600 dark:text-blue-400">AI</span>
                </span>
            </div>
        </>
    );
}
