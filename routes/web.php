<?php

use App\Http\Controllers\JobApplicationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', function (Request $request) {
        $user = $request->user();

        $stats = [
            'total' => $user->jobApplications()->count(),
            'applied' => $user->jobApplications()->where('status', 'applied')->count(),
            'interviews' => $user->jobApplications()->where('status', 'interview')->count(),
            'offers' => $user->jobApplications()->where('status', 'offer')->count(),
            'rejected' => $user->jobApplications()->where('status', 'rejected')->count(),
        ];

        // Format data for Recharts donut chart
        $chartData = [
            ['name' => 'Applied', 'value' => $stats['applied'], 'color' => '#3b82f6'],
            ['name' => 'Interview', 'value' => $stats['interviews'], 'color' => '#f97316'],
            ['name' => 'Offer', 'value' => $stats['offers'], 'color' => '#22c55e'],
            ['name' => 'Rejected', 'value' => $stats['rejected'], 'color' => '#ef4444'],
        ];

        $upcomingInterviews = $user->jobApplications()
            ->where('status', 'interview')
            ->orderBy('applied_at', 'desc')
            ->limit(3)
            ->get();

        return Inertia::render('dashboard', [
            'stats' => $stats,
            'chartData' => $chartData,
            'upcomingInterviews' => $upcomingInterviews,
        ]);
    })->name('dashboard');

    Route::resource('job-applications', JobApplicationController::class);
    Route::post('job-applications/{jobApplication}/ai-prep', [JobApplicationController::class, 'generateAiPrep'])->name('job-applications.ai-prep');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
