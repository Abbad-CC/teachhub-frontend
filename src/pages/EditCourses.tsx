import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import type { RootState } from '../store';
import { Upload, Link, ArrowLeft, Save } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  email: string;
}

interface Enrollment {
  id: string;
  studentId: string;
  courseId: string;
  enrolledAt: string;
  student: Student;
}

interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  demoVideoUrl: string;
  published: boolean;
  teacherId: string;
  createdAt: string;
  updatedAt: string;
  enrollments: Enrollment[];
}

const EditCourse: React.FC = () => {
  const { state } = useLocation();
  const course: Course = state?.course;
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
  const [previewVideoUrl, setPreviewVideoUrl] = useState('');

  // Pre-populate form data when course is available
  useEffect(() => {
    if (course) {
      setFormData({
        title: course.title || '',
        description: course.description || '',
        price: course.price?.toString() || '',
        demoVideoUrl: course.demoVideoUrl || ''
      });
      setPreviewVideoUrl(course.demoVideoUrl || '');
    }
  }, [course]);

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
      // Create preview URL for the new file
      const fileUrl = URL.createObjectURL(file);
      setPreviewVideoUrl(fileUrl);
    }
  };

  const handleVideoUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData(prev => ({ ...prev, demoVideoUrl: value }));
    setPreviewVideoUrl(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!token || !course?.id) {
      toast.error('Authentication or course data required');
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

    if (videoInputType === 'file' && !videoFile && !course.demoVideoUrl) {
      toast.error('Please select a video file or provide a URL');
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
      } else if (videoInputType === 'url') {
        submitFormData.append('demoVideoUrl', formData.demoVideoUrl);
      }

      const response = await fetch(`http://localhost:5000/api/courses/${course.id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: submitFormData,
      });

      const data = await response.json();
      
      if (response.ok) {
        toast.success('Course updated successfully!');
        setTimeout(() => {
          navigate('/teacher-dashboard');
        }, 2000);
      } else {
        toast.error(data.error || 'Failed to update course');
      }
    } catch (error) {
      toast.error('Error updating course');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/teacher-dashboard');
  };

  if (!course) {
    return <p className="p-6">No course data found.</p>;
  }

  return (
    <div className="mx-auto max-w-6xl p-6 bg-white rounded shadow">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition"
        >
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>
      </div>

      <h1 className="text-2xl font-bold mb-6">Edit Course: {course.title}</h1>

      <div className="md:flex lg:flex gap-6 sm:block">
        {/* Left Side - Form */}
        <div className="w-2/3">
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
                Course Price ($) *
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
                  Upload New File
                </button>
              </div>

              {/* Video URL Input */}
              {videoInputType === 'url' && (
                <input
                  type="url"
                  name="demoVideoUrl"
                  value={formData.demoVideoUrl}
                  onChange={handleVideoUrlChange}
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

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition ${
                  loading
                    ? 'bg-gray-400 cursor-not-allowed text-white'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                <Save size={16} />
                {loading ? 'Updating Course...' : 'Update Course'}
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

        {/* Right Side - Preview and Course Info */}
        <div className="w-1/3 flex flex-col gap-6 border-l pl-6">
          {/* Video Preview */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Current Video Preview</h3>
            {previewVideoUrl ? (
              <video 
                src={previewVideoUrl} 
                controls 
                className="w-full mb-4 rounded border"
                key={previewVideoUrl} // Force re-render when URL changes
              />
            ) : (
              <div className="w-full h-48 bg-gray-100 rounded border flex items-center justify-center">
                <p className="text-gray-500">No video available</p>
              </div>
            )}
          </div>

          {/* Course Status Info */}
          <div className="space-y-3">
            <div className="text-sm text-gray-600">
              Status: {course.published ? (
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Published</span>
              ) : (
                <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">Draft</span>
              )}
            </div>
            <div className="text-sm text-gray-600">
              Students Enrolled: {course.enrollments?.length || 0}
            </div>
            <div className="text-sm text-gray-600">
              Created: {new Date(course.createdAt).toLocaleDateString()}
            </div>
            <div className="text-sm text-gray-600">
              Last Updated: {new Date(course.updatedAt).toLocaleDateString()}
            </div>
          </div>

          {/* Enrolled Students Preview */}
          {course.enrollments && course.enrollments.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Enrolled Students</h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {course.enrollments.slice(0, 3).map((enrollment) => (
                  <div key={enrollment.student.id} className="p-3 bg-gray-50 rounded border">
                    <p className="font-medium text-sm">{enrollment.student.name}</p>
                    <p className="text-xs text-gray-600">{enrollment.student.email}</p>
                  </div>
                ))}
                {course.enrollments.length > 3 && (
                  <p className="text-sm text-gray-500">
                    +{course.enrollments.length - 3} more students
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditCourse;