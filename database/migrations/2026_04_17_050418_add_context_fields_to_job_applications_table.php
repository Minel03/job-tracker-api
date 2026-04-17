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
            $table->string('location')->nullable()->after('company');
            $table->string('salary')->nullable()->after('location');
            $table->string('job_type')->nullable()->after('salary'); // full-time, part-time, contract, internship
            $table->string('remote_policy')->nullable()->after('job_type'); // remote, hybrid, on-site
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('job_applications', function (Blueprint $table) {
            $table->dropColumn(['location', 'salary', 'job_type', 'remote_policy']);
        });
    }
};
