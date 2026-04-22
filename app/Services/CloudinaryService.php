<?php

namespace App\Services;

use Cloudinary\Cloudinary;
use Cloudinary\Configuration\Configuration;

class CloudinaryService
{
    protected $cloudinary;

    protected function getClient()
    {
        if ($this->cloudinary) {
            return $this->cloudinary;
        }

        $config = config('services.cloudinary');

        if (empty($config['cloud_name']) || empty($config['api_key']) || empty($config['api_secret'])) {
            return null;
        }

        $this->cloudinary = new Cloudinary([
            'cloud' => [
                'cloud_name' => $config['cloud_name'],
                'api_key'    => $config['api_key'],
                'api_secret' => $config['api_secret'],
            ],
            'url' => [
                'secure' => true
            ]
        ]);

        return $this->cloudinary;
    }

    /**
     * Upload a file to Cloudinary.
     *
     * @param string $filePath
     * @param string $folder
     * @return array|null
     */
    public function upload($filePath, $folder = 'job-tracker')
    {
        try {
            $client = $this->getClient();

            if (!$client) {
                return null;
            }

            $result = $client->uploadApi()->upload($filePath, [
                'folder' => $folder,
                'resource_type' => 'auto',
            ]);

            if (!$result || !isset($result['secure_url'])) {
                return null;
            }

            return [
                'url' => $result['secure_url'],
                'public_id' => $result['public_id'] ?? null,
            ];
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error('Cloudinary Upload Error: ' . $e->getMessage());
            return null;
        }
    }

    /**
     * Delete a file from Cloudinary.
     *
     * @param string $publicId
     * @return void
     */
    public function delete($publicId)
    {
        if (!$publicId) {
            return;
        }

        $client = $this->getClient();

        if ($client) {
            $client->uploadApi()->destroy($publicId);
        }
    }
}
