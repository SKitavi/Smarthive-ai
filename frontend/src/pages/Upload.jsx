// pages/Upload.js

import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setSelectedFile(event.dataTransfer.files[0]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select a file to upload");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setLoading(true)
      const response = await axios.post("http://localhost:5000/api/hierarchical", formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        }
      });

      if (response.status === 200) {
        toast.success("File uploaded successfully");
        setSelectedFile(null);
        setUploadProgress(0);
        navigate('/dashboard')
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload file");
      setUploadProgress(0);
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Upload</h1>

      {/* Drag and Drop Area */}
      <div
        className="border-2 border-dashed border-gray-300 p-4 rounded-lg text-center cursor-pointer mb-4"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <p className="text-gray-600">
          Drag & drop your file here, or{" "}
          <label className="text-blue-500 cursor-pointer">
            click to select a file
            <input
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept=".xls,.xlsx"
            />
          </label>
        </p>
      </div>

      {/* File Details and Upload Button */}
      {selectedFile && (
        <div className="mb-4">
          <p className="text-gray-700">Selected file: {selectedFile.name}</p>
          <button
            className="mt-2 bg-blue-500 text-white py-2 px-4 rounded"
            onClick={handleUpload}
          >
            {uploadProgress === 100? "Predicting...": "Upload"}
          </button>
        </div>
      )}

      {/* Upload Progress */}
      {uploadProgress > 0 && (
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full">
            <div
              className="bg-blue-500 text-xs font-medium text-white text-center p-1 leading-none rounded-full"
              style={{ width: `${uploadProgress}%` }}
            >
              {uploadProgress}%
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Upload;
