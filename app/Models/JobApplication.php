<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JobApplication extends Model
{
    protected $fillable = [
        'user_id',
        'title',
        'company',
        'status',
        'url',
        'applied_at',
        'interview_notes',
        'ai_prep_plan',
        'resume_url',
        'resume_public_id',
        'screenshot_url',
        'screenshot_public_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
