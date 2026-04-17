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
            Company: {$jobApplication->company}
            Position: {$jobApplication->title}
            My current notes: {$jobApplication->interview_notes}

            Based on this information, provide:
            1. 5 tailored interview questions specifically for this role and company.
            2. For each question, provide a brief 'Key Consideration' or what the interviewer is looking for.
            3. A one-sentence 'Winning Strategy' for this interview.

            Format the response in clean Markdown.";

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
        ]);

        $data = $validated;
        unset($data['resume'], $data['screenshot']);

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
