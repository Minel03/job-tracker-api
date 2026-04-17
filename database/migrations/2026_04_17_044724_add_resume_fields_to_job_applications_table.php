<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('job_applications', function (Blueprint $table) {
            $table->string('resume_url')->nullable()->after('interview_notes');
            $table->string('resume_public_id')->nullable()->after('resume_url');
            $table->string('screenshot_url')->nullable()->after('resume_public_id');
            $table->string('screenshot_public_id')->nullable()->after('screenshot_url');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('job_applications', function (Blueprint $table) {
            $table->dropColumn(['resume_url', 'resume_public_id', 'screenshot_url', 'screenshot_public_id']);
        });
    }
};
