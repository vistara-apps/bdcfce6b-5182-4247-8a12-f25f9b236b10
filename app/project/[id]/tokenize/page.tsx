'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Coins, DollarSign, Users, Zap } from 'lucide-react';
import { getProjectById, createTokenOffering } from '../../../lib/models';
import { Project, CreateTokenOfferingForm } from '../../../lib/types';
import { designSystem } from '../../../lib/design-system';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { TextInput } from '../../../components/ui/text-input';

export default function TokenizePage() {
  const params = useParams();
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<CreateTokenOfferingForm>({
    projectId: '',
    totalTokens: 1000,
    pricePerToken: 10,
    tokenSymbol: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (params.id) {
      const projectData = getProjectById(params.id as string);
      setProject(projectData || null);
      setLoading(false);

      if (projectData) {
        setFormData(prev => ({
          ...prev,
          projectId: projectData.projectId,
          tokenSymbol: projectData.propertyName.replace(/\s+/g, '').toUpperCase().slice(0, 5),
        }));
      }
    }
  }, [params.id]);

  const handleInputChange = (field: keyof CreateTokenOfferingForm, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!formData.tokenSymbol || formData.totalTokens <= 0 || formData.pricePerToken <= 0) {
      alert('Please fill in all required fields with valid values');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate token deployment delay
      setTimeout(() => {
        const tokenOffering = createTokenOffering({
          ...formData,
          tokenAddress: `0x${Math.random().toString(16).substr(2, 40)}`,
          tokensAvailable: formData.totalTokens,
          status: 'active',
        });

        // Update project with token info
        if (project) {
          // In a real app, this would update the project in the database
          project.tokenAddress = tokenOffering.tokenAddress;
          project.tokenSymbol = formData.tokenSymbol;
        }

        router.push(`/project/${params.id}`);
      }, 3000);

    } catch (error) {
      console.error('Error creating token offering:', error);
      alert('Failed to create token offering. Please try again.');
      setIsSubmitting(false);
    }
  };

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

  if (project.tokenAddress) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <h2 className={`text-2xl font-bold text-[${designSystem.colors.text}]`}>
            Already Tokenized
          </h2>
          <p className={`text-[${designSystem.colors.muted}]`}>
            This property has already been tokenized.
          </p>
          <Link href={`/project/${project.projectId}`}>
            <Button>View Project</Button>
          </Link>
        </div>
      </div>
    );
  }

  const totalValue = formData.totalTokens * formData.pricePerToken;

  return (
    <div className="max-w-4xl mx-auto py-8 space-y-8">
      {/* Header */}
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
            Tokenize Property
          </h1>
          <p className={`text-lg text-[${designSystem.colors.muted}]`}>
            {project.propertyName} - {project.propertyAddress}
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Tokenization Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Coins className={`w-5 h-5 text-[${designSystem.colors.primary}]`} />
              <span>Token Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <TextInput
                label="Token Symbol"
                value={formData.tokenSymbol}
                onChange={(e) => handleInputChange('tokenSymbol', e.target.value.toUpperCase())}
                placeholder="e.g., PROP1"
                withLabel
                required
                maxLength={5}
              />

              <div className="grid grid-cols-2 gap-4">
                <TextInput
                  label="Total Tokens"
                  type="number"
                  value={formData.totalTokens}
                  onChange={(e) => handleInputChange('totalTokens', parseInt(e.target.value) || 0)}
                  withLabel
                  required
                  min="1"
                />

                <TextInput
                  label="Price per Token ($)"
                  type="number"
                  step="0.01"
                  value={formData.pricePerToken}
                  onChange={(e) => handleInputChange('pricePerToken', parseFloat(e.target.value) || 0)}
                  withLabel
                  required
                  min="0.01"
                />
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Total Property Value:</span>
                  <span className="text-2xl font-bold text-blue-600">
                    ${totalValue.toLocaleString()}
                  </span>
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full"
              >
                {isSubmitting ? 'Deploying Token...' : 'Deploy Token Contract'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Benefits & Preview */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tokenization Benefits</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <DollarSign className={`w-5 h-5 text-[${designSystem.colors.accent}] mt-0.5`} />
                <div>
                  <h4 className="font-medium">Fractional Ownership</h4>
                  <p className="text-sm text-gray-600">
                    Allow investors to own fractions of your property through tokens.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Users className={`w-5 h-5 text-[${designSystem.colors.accent}] mt-0.5`} />
                <div>
                  <h4 className="font-medium">Broader Investor Reach</h4>
                  <p className="text-sm text-gray-600">
                    Attract a wider pool of investors who can invest smaller amounts.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Zap className={`w-5 h-5 text-[${designSystem.colors.accent}] mt-0.5`} />
                <div>
                  <h4 className="font-medium">Liquidity</h4>
                  <p className="text-sm text-gray-600">
                    Tokens can be traded on decentralized exchanges for liquidity.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Farcaster Frame Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg p-4 bg-gray-50">
                <div className="text-center space-y-3">
                  <div className="w-full h-32 bg-gray-200 rounded flex items-center justify-center">
                    <span className="text-gray-500 text-sm">Video Thumbnail</span>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">{project.propertyName}</h4>
                    <p className="text-sm text-gray-600">{project.propertyAddress}</p>
                    <div className="flex justify-center space-x-2">
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                      <Button size="sm">
                        Invest Now ({formData.tokenSymbol})
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                This is how your tokenized property will appear in Farcaster feeds.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

