'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Video, Coins, TrendingUp } from 'lucide-react';
import { useWallet } from '../hooks/useWallet';
import { getCurrentUser, getUserProjects } from '../lib/models';
import { Project } from '../lib/types';
import { designSystem } from '../lib/design-system';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

export default function DashboardPage() {
  const { isConnected } = useWallet();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isConnected) {
      const user = getCurrentUser();
      if (user) {
        const userProjects = getUserProjects(user.userId);
        setProjects(userProjects);
      }
      setLoading(false);
    }
  }, [isConnected]);

  if (!isConnected) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <h2 className={`text-2xl font-bold text-[${designSystem.colors.text}]`}>
            Connect Your Wallet
          </h2>
          <p className={`text-[${designSystem.colors.muted}]`}>
            Please connect your wallet to access your dashboard.
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className={`text-3xl font-bold text-[${designSystem.colors.text}]`}>
            Dashboard
          </h1>
          <p className={`text-lg text-[${designSystem.colors.muted}] mt-2`}>
            Manage your video tours and tokenized properties
          </p>
        </div>
        <Link href="/create-video">
          <Button size="lg" className="flex items-center space-x-2">
            <Plus className="w-5 h-5" />
            <span>Create Video Tour</span>
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className={`p-3 bg-[${designSystem.colors.primary}]/10 rounded-lg`}>
                <Video className={`w-6 h-6 text-[${designSystem.colors.primary}]`} />
              </div>
              <div>
                <p className={`text-2xl font-bold text-[${designSystem.colors.text}]`}>
                  {projects.length}
                </p>
                <p className={`text-sm text-[${designSystem.colors.muted}]`}>
                  Video Tours Created
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className={`p-3 bg-[${designSystem.colors.accent}]/10 rounded-lg`}>
                <Coins className={`w-6 h-6 text-[${designSystem.colors.accent}]`} />
              </div>
              <div>
                <p className={`text-2xl font-bold text-[${designSystem.colors.text}]`}>
                  {projects.filter(p => p.tokenAddress).length}
                </p>
                <p className={`text-sm text-[${designSystem.colors.muted}]`}>
                  Tokenized Properties
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className={`p-3 bg-green-100 rounded-lg`}>
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className={`text-2xl font-bold text-[${designSystem.colors.text}]`}>
                  $0
                </p>
                <p className={`text-sm text-[${designSystem.colors.muted}]`}>
                  Revenue Generated
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Projects List */}
      <Card>
        <CardHeader>
          <CardTitle>Your Projects</CardTitle>
        </CardHeader>
        <CardContent>
          {projects.length === 0 ? (
            <div className="text-center py-12">
              <Video className={`w-16 h-16 mx-auto text-[${designSystem.colors.muted}] mb-4`} />
              <h3 className={`text-lg font-medium text-[${designSystem.colors.text}] mb-2`}>
                No projects yet
              </h3>
              <p className={`text-[${designSystem.colors.muted}] mb-6`}>
                Create your first video tour to get started with tokenizing real estate.
              </p>
              <Link href="/create-video">
                <Button>
                  Create Your First Video Tour
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {projects.map((project) => (
                <div
                  key={project.projectId}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 bg-[${designSystem.colors.primary}]/10 rounded-lg`}>
                      <Video className={`w-5 h-5 text-[${designSystem.colors.primary}]`} />
                    </div>
                    <div>
                      <h4 className={`font-medium text-[${designSystem.colors.text}]`}>
                        {project.propertyName}
                      </h4>
                      <p className={`text-sm text-[${designSystem.colors.muted}]`}>
                        {project.propertyAddress}
                      </p>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className={`text-xs px-2 py-1 bg-[${designSystem.colors.primary}]/10 text-[${designSystem.colors.primary}] rounded`}>
                          {project.templateId}
                        </span>
                        {project.tokenAddress && (
                          <span className={`text-xs px-2 py-1 bg-[${designSystem.colors.accent}]/10 text-[${designSystem.colors.accent}] rounded flex items-center space-x-1`}>
                            <Coins className="w-3 h-3" />
                            <span>Tokenized</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Link href={`/project/${project.projectId}`}>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </Link>
                    {!project.tokenAddress && (
                      <Link href={`/project/${project.projectId}/tokenize`}>
                        <Button variant="outline" size="sm">
                          Tokenize
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

