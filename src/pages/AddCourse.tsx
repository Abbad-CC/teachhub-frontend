import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import type { RootState } from '../store';
import { Upload, Link, ArrowLeft } from 'lucide-react';

// interface Course {
//   id: string;
//   title: string;
//   description: string;
//   price: number;
//   demoVideoUrl: string;
//   published: boolean;
//   teacherId: string;
//   createdAt: string;
//   updatedAt: string;
// }

const AddCourse: React.FC = () => {
  const { token } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    demoVideoUrl: ''
  });
  
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoInputType, setVideoInputType] = useState<'file' | 'url'>('url');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check if file is a video
      if (!file.type.startsWith('video/')) {
        toast.error('Please select a valid video file');
        return;
      }
      setVideoFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!token) {
      toast.error('Authentication required');
      return;
    }

    // Validation
    if (!formData.title.trim()) {
      toast.error('Course title is required');
      return;
    }
    
    if (!formData.description.trim()) {
      toast.error('Course description is required');
      return;
    }
    
    if (!formData.price || parseFloat(formData.price) < 0) {
      toast.error('Please enter a valid price');
      return;
    }

    if (videoInputType === 'url' && !formData.demoVideoUrl.trim()) {
      toast.error('Demo video URL is required');
      return;
    }

    if (videoInputType === 'file' && !videoFile) {
      toast.error('Please select a video file');
      return;
    }

    setLoading(true);

    try {
      const submitFormData = new FormData();
      submitFormData.append('title', formData.title);
      submitFormData.append('description', formData.description);
      submitFormData.append('price', formData.price);

      if (videoInputType === 'file' && videoFile) {
        submitFormData.append('demoVideo', videoFile);
      } else {
        submitFormData.append('demoVideoUrl', formData.demoVideoUrl);
      }

      const response = await fetch('http://localhost:5000/api/courses/', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: submitFormData,
      });

      const data = await response.json();
      
      if (response.ok) {
        toast.success('Course created successfully!');
        setTimeout(() => {
          navigate('/teacher-dashboard');
        }, 2000);
      } else {
        toast.error(data.error || 'Failed to create course');
      }
    } catch (error) {
      toast.error('Error creating course');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/teacher-dashboard');
  };

  return (
    <div className="mx-auto max-w-4xl p-6 bg-white rounded shadow">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition"
        >
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>
      </div>

      <h1 className="text-2xl font-bold mb-6">Create New Course</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Course Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Course Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter course title"
          />
        </div>

        {/* Course Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Course Description *
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter course description"
          />
        </div>

        {/* Course Price */}
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
            Course Price (Rs) *
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            required
            min="0"
            step="0.01"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="0.00"
          />
        </div>

        {/* Demo Video Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Demo Video *
          </label>
          
          {/* Video Input Type Toggle */}
          <div className="flex gap-4 mb-4">
            <button
              type="button"
              onClick={() => setVideoInputType('url')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                videoInputType === 'url'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Link size={16} />
              Video URL
            </button>
            <button
              type="button"
              onClick={() => setVideoInputType('file')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                videoInputType === 'file'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Upload size={16} />
              Upload File
            </button>
          </div>

          {/* Video URL Input */}
          {videoInputType === 'url' && (
            <input
              type="url"
              name="demoVideoUrl"
              value={formData.demoVideoUrl}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter video URL (e.g., https://example.com/video.mp4)"
            />
          )}

          {/* Video File Upload */}
          {videoInputType === 'file' && (
            <div>
              <input
                type="file"
                accept="video/*"
                onChange={handleVideoFileChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {videoFile && (
                <p className="text-sm text-gray-600 mt-2">
                  Selected file: {videoFile.name}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-3 rounded-lg font-medium transition ${
              loading
                ? 'bg-gray-400 cursor-not-allowed text-white'
                : 'bg-green-600 text-white hover:bg-green-700'
            }`}
          >
            {loading ? 'Creating Course...' : 'Create Course'}
          </button>
          
          <button
            type="button"
            onClick={handleBack}
            className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition font-medium"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCourse;