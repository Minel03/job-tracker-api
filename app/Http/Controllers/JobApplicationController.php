<?php

namespace App\Http\Controllers;

use App\Models\JobApplication;
use App\Services\CloudinaryService;
use App\Services\GroqService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JobApplicationController extends Controller
{
    protected $cloudinary;

    public function __construct(CloudinaryService $cloudinary)
    {
        $this->cloudinary = $cloudinary;
    }

    /**
     * Generate an AI-powered interview preparation plan.
     */
    public function generateAiPrep(JobApplication $jobApplication, GroqService $groqService)
    {
        if ($jobApplication->user_id !== auth()->id()) {
            abort(403);
        }

        $prompt = "Act as an expert technical recruiter and career coach.
            Target Company: {$jobApplication->company}
            Target Position: {$jobApplication->title}
            Location: {$jobApplication->location}
            Job Type: {$jobApplication->job_type}
            Remote Policy: {$jobApplication->remote_policy}
            Salary/Range: {$jobApplication->salary}
            My current notes & Research: {$jobApplication->interview_notes}

            Based on this information, provide a comprehensive interview preparation guide:

            1. **Tailored Interview Questions**: Provide 5 highly specific questions I am likely to face.
            2. **For Each Question**:
               - **Recruiter's Perspective**: What are they actually trying to evaluate?
               - **Suggested Answer Blueprint**: Provide a structured approach (e.g., STAR method) on how I should answer this. Give specific points I should mention based on the company and role.
               - **Common Pitfall**: One thing I should absolutely avoid saying for this specific question.
            3. **A 'Winning Strategy'**: A two-sentence high-level approach for this specific company culture.
            4. **Pro-Tip**: One unexpected piece of advice for this specific role and location.

            Format the response in professional, structured Markdown with bold headers.";

        $messages = [
            ['role' => 'system', 'content' => 'You are a professional career coach.'],
            ['role' => 'user', 'content' => $prompt],
        ];

        $plan = $groqService->generateChatCompletion($messages);

        if (! $plan) {
            return back()->with('error', 'Failed to generate AI plan. Please check your API key.');
        }

        $jobApplication->update(['ai_prep_plan' => $plan]);

        return back()->with('success', 'AI Interview Coach has updated your prep plan!');
    }

    /**
     * Display the specified resource.
     */
    public function show(JobApplication $jobApplication)
    {
        if ($jobApplication->user_id !== auth()->id()) {
            abort(403);
        }

        return Inertia::render('Applications/Show', [
            'application' => $jobApplication,
        ]);
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return Inertia::render('Applications/Index', [
            'applications' => $request->user()->jobApplications()
                ->latest()
                ->get(),
        ]);
    }

    public function create()
    {
        // This tells Inertia to look for: resources/js/Pages/Applications/Create.tsx
        return Inertia::render('Applications/Create');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(JobApplication $jobApplication)
    {
        // This tells Inertia to look for: resources/js/Pages/Applications/Edit.tsx
        return Inertia::render('Applications/Edit', [
            'application' => $jobApplication,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'company' => 'required|string|max:255',
            'status' => 'required|in:applied,interview,offer,rejected',
            'url' => 'nullable|url',
            'applied_at' => 'required|date',
            'interview_notes' => 'nullable|string',
            'resume' => 'nullable|file|mimes:pdf,doc,docx|max:5120',
            'screenshot' => 'nullable|image|max:5120',
            'location' => 'nullable|string|max:255',
            'salary' => 'nullable|string|max:255',
            'job_type' => 'nullable|in:full-time,part-time,contract,internship,freelance',
            'remote_policy' => 'nullable|in:remote,hybrid,on-site',
        ]);

        $data = $validated;
        unset($data['resume'], $data['screenshot']);

        // Set defaults if missing
        $data['job_type'] = $data['job_type'] ?? 'full-time';
        $data['remote_policy'] = $data['remote_policy'] ?? 'on-site';

        if ($request->hasFile('resume')) {
            $upload = $this->cloudinary->upload($request->file('resume')->getRealPath(), 'resumes');
            $data['resume_url'] = $upload['url'];
            $data['resume_public_id'] = $upload['public_id'];
        }

        if ($request->hasFile('screenshot')) {
            $upload = $this->cloudinary->upload($request->file('screenshot')->getRealPath(), 'screenshots');
            $data['screenshot_url'] = $upload['url'];
            $data['screenshot_public_id'] = $upload['public_id'];
        }

        $request->user()->jobApplications()->create($data);

        return redirect()->route('job-applications.index')
            ->with('success', 'Application added successfully!');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, JobApplication $jobApplication)
    {
        // Ensure the job belongs to the user
        if ($jobApplication->user_id !== $request->user()->id) {
            abort(403);
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'company' => 'required|string|max:255',
            'status' => 'required|in:applied,interview,offer,rejected',
            'url' => 'nullable|url',
            'applied_at' => 'required|date',
            'interview_notes' => 'nullable|string',
            'resume' => 'nullable|file|mimes:pdf,doc,docx|max:5120',
            'screenshot' => 'nullable|image|max:5120',
            'location' => 'nullable|string|max:255',
            'salary' => 'nullable|string|max:255',
            'job_type' => 'nullable|in:full-time,part-time,contract,internship,freelance',
            'remote_policy' => 'nullable|in:remote,hybrid,on-site',
        ]);

        $data = $validated;
        unset($data['resume'], $data['screenshot']);

        if ($request->hasFile('resume')) {
            // Delete old one if exists
            $this->cloudinary->delete($jobApplication->resume_public_id);

            $upload = $this->cloudinary->upload($request->file('resume')->getRealPath(), 'resumes');
            $data['resume_url'] = $upload['url'];
            $data['resume_public_id'] = $upload['public_id'];
        }

        if ($request->hasFile('screenshot')) {
            $this->cloudinary->delete($jobApplication->screenshot_public_id);

            $upload = $this->cloudinary->upload($request->file('screenshot')->getRealPath(), 'screenshots');
            $data['screenshot_url'] = $upload['url'];
            $data['screenshot_public_id'] = $upload['public_id'];
        }

        $jobApplication->update($data);

        return redirect()->route('job-applications.index')
            ->with('success', 'Application updated!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, JobApplication $jobApplication)
    {
        if ($jobApplication->user_id !== $request->user()->id) {
            abort(403);
        }

        // Cleanup cloud storage
        $this->cloudinary->delete($jobApplication->resume_public_id);
        $this->cloudinary->delete($jobApplication->screenshot_public_id);

        $jobApplication->delete();

        return redirect()->route('job-applications.index')
            ->with('success', 'Application deleted');
    }
}
