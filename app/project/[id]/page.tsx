'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Share2, Coins, Download, Eye } from 'lucide-react';
import { getProjectById } from '../../lib/models';
import { Project } from '../../lib/types';
import { designSystem } from '../../lib/design-system';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { VideoPlayer } from '../../components/ui/video-player';

export default function ProjectPage() {
  const params = useParams();
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      const projectData = getProjectById(params.id as string);
      setProject(projectData || null);
      setLoading(false);
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading project...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <h2 className={`text-2xl font-bold text-[${designSystem.colors.text}]`}>
            Project Not Found
          </h2>
          <p className={`text-[${designSystem.colors.muted}]`}>
            The project you're looking for doesn't exist.
          </p>
          <Link href="/dashboard">
            <Button>Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.back()}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </Button>
          <div>
            <h1 className={`text-3xl font-bold text-[${designSystem.colors.text}]`}>
              {project.propertyName}
            </h1>
            <p className={`text-lg text-[${designSystem.colors.muted}]`}>
              {project.propertyAddress}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="flex items-center space-x-2">
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </Button>
          <Button variant="outline" size="sm" className="flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Download</span>
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Video Section */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Eye className={`w-5 h-5 text-[${designSystem.colors.primary}]`} />
                <span>Video Tour</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {project.videoUrl ? (
                <VideoPlayer
                  src={project.videoUrl}
                  poster={project.mediaUrls[0]}
                  showControls={true}
                  autoPlay={false}
                  muted={false}
                />
              ) : (
                <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                    <p className="text-gray-600">Generating video tour...</p>
                    <p className="text-sm text-gray-500">This may take a few minutes</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Property Details */}
          <Card>
            <CardHeader>
              <CardTitle>Property Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Description</h4>
                <p className={`text-[${designSystem.colors.muted}]`}>
                  {project.description}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Template Used</h4>
                  <span className={`inline-block px-3 py-1 bg-[${designSystem.colors.primary}]/10 text-[${designSystem.colors.primary}] rounded-full text-sm`}>
                    {project.templateId}
                  </span>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Created</h4>
                  <p className={`text-[${designSystem.colors.muted}]`}>
                    {new Date(project.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Tokenization Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Coins className={`w-5 h-5 text-[${designSystem.colors.primary}]`} />
                <span>Tokenization</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {project.tokenAddress ? (
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="font-medium text-green-800">Tokenized</span>
                    </div>
                    <p className="text-sm text-green-700 mb-2">
                      This property has been successfully tokenized.
                    </p>
                    <div className="text-xs text-green-600">
                      <p>Token: {project.tokenSymbol}</p>
                      <p>Address: {project.tokenAddress.slice(0, 10)}...</p>
                    </div>
                  </div>
                  <Button className="w-full">
                    View Token Details
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span className="font-medium text-yellow-800">Not Tokenized</span>
                    </div>
                    <p className="text-sm text-yellow-700">
                      Tokenize this property to enable fractional ownership and attract investors.
                    </p>
                  </div>
                  <Link href={`/project/${project.projectId}/tokenize`}>
                    <Button className="w-full">
                      Tokenize Property
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Media Gallery */}
          {project.mediaUrls.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Media Gallery</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {project.mediaUrls.map((url, index) => (
                    <div key={index} className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={url}
                        alt={`Property media ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

