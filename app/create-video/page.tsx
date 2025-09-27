'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Upload, Video, Image, MapPin, FileText } from 'lucide-react';
import { useWallet } from '../hooks/useWallet';
import { getCurrentUser, createProject } from '../lib/models';
import { CreateProjectForm } from '../lib/types';
import { designSystem } from '../lib/design-system';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { TextInput } from '../components/ui/text-input';

const VIDEO_TEMPLATES = [
  {
    id: 'template-1',
    name: 'Modern Luxury',
    description: 'Elegant template for high-end properties',
    thumbnail: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=300&h=200&fit=crop',
  },
  {
    id: 'template-2',
    name: 'Cozy Family Home',
    description: 'Warm and inviting for family-oriented properties',
    thumbnail: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=300&h=200&fit=crop',
  },
  {
    id: 'template-3',
    name: 'Urban Professional',
    description: 'Sleek design for downtown condos and apartments',
    thumbnail: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=300&h=200&fit=crop',
  },
];

export default function CreateVideoPage() {
  const router = useRouter();
  const { isConnected } = useWallet();
  const [formData, setFormData] = useState<CreateProjectForm>({
    propertyName: '',
    propertyAddress: '',
    description: '',
    mediaUrls: [],
    templateId: '',
  });
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof CreateProjectForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedFiles(prev => [...prev, ...files]);

    // In a real app, these would be uploaded to IPFS or a storage service
    // For demo purposes, we'll create blob URLs
    const urls = files.map(file => URL.createObjectURL(file));
    setFormData(prev => ({
      ...prev,
      mediaUrls: [...prev.mediaUrls, ...urls]
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!isConnected) {
      alert('Please connect your wallet first');
      return;
    }

    if (!formData.propertyName || !formData.propertyAddress || !selectedTemplate) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const user = getCurrentUser();
      if (!user) {
        throw new Error('User not found');
      }

      const newProject = createProject({
        ...formData,
        templateId: selectedTemplate,
        userId: user.userId,
      });

      // Simulate video generation delay
      setTimeout(() => {
        router.push(`/project/${newProject.projectId}`);
      }, 2000);

    } catch (error) {
      console.error('Error creating project:', error);
      alert('Failed to create project. Please try again.');
      setIsSubmitting(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <h2 className={`text-2xl font-bold text-[${designSystem.colors.text}]`}>
            Connect Your Wallet
          </h2>
          <p className={`text-[${designSystem.colors.muted}]`}>
            Please connect your wallet to create video tours.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 space-y-8">
      <div className="text-center space-y-4">
        <h1 className={`text-3xl font-bold text-[${designSystem.colors.text}]`}>
          Create Video Tour
        </h1>
        <p className={`text-lg text-[${designSystem.colors.muted}]`}>
          Generate a professional video tour for your property
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Property Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className={`w-5 h-5 text-[${designSystem.colors.primary}]`} />
              <span>Property Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <TextInput
              label="Property Name"
              value={formData.propertyName}
              onChange={(e) => handleInputChange('propertyName', e.target.value)}
              placeholder="e.g., Luxury Downtown Condo"
              withLabel
              required
            />

            <TextInput
              label="Property Address"
              value={formData.propertyAddress}
              onChange={(e) => handleInputChange('propertyAddress', e.target.value)}
              placeholder="123 Main St, City, State, ZIP"
              withLabel
              required
            />

            <div className="space-y-2">
              <label className={`text-sm font-medium text-[${designSystem.colors.text}]`}>
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Describe the property features, amenities, and highlights..."
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        {/* Media Upload */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Image className={`w-5 h-5 text-[${designSystem.colors.primary}]`} />
              <span>Property Media</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className={`w-12 h-12 mx-auto text-[${designSystem.colors.muted}] mb-4`} />
                <p className={`text-[${designSystem.colors.muted}] mb-2`}>
                  Upload property images, floor plans, and videos
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  Supported formats: JPG, PNG, MP4, PDF (max 10MB each)
                </p>
                <input
                  type="file"
                  multiple
                  accept="image/*,video/*,.pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="media-upload"
                />
                <label htmlFor="media-upload">
                  <Button type="button" variant="outline">
                    Choose Files
                  </Button>
                </label>
              </div>

              {uploadedFiles.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium">Uploaded Files:</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                        {file.type.startsWith('image/') ? (
                          <Image size={16} />
                        ) : file.type.startsWith('video/') ? (
                          <Video size={16} />
                        ) : (
                          <FileText size={16} />
                        )}
                        <span className="text-sm truncate">{file.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Template Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Video className={`w-5 h-5 text-[${designSystem.colors.primary}]`} />
              <span>Video Template</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {VIDEO_TEMPLATES.map((template) => (
                <div
                  key={template.id}
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    selectedTemplate === template.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedTemplate(template.id)}
                >
                  <img
                    src={template.thumbnail}
                    alt={template.name}
                    className="w-full h-32 object-cover rounded mb-3"
                  />
                  <h4 className="font-medium">{template.name}</h4>
                  <p className="text-sm text-gray-600">{template.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Submit */}
        <div className="flex justify-center">
          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting || !selectedTemplate}
            className="px-8"
          >
            {isSubmitting ? 'Creating Video Tour...' : 'Generate Video Tour'}
          </Button>
        </div>
      </form>
    </div>
  );
}

