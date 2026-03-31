import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, CheckCircle } from "lucide-react";

export default function NationalIDUpload() {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleContinue = () => {
    // Here you could upload the file to the server
    // For now, just navigate to next step
    navigate('/buyer-dashboard/verification/upload-keb');
  };

  return (
    <div className="min-h-screen bg-green-50 flex justify-center p-6">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-xl p-8">

        {/* Top Step Indicator */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-green-600 text-white font-semibold">
              1
            </div>
            <span className="text-gray-700 font-medium">National ID</span>
          </div>

          <div className="text-sm text-gray-500">Step 1 of 3</div>
        </div>

                {/* Progress header */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Step 1 of 3</span>
            <span>33% Complete</span>
          </div>
          <div className="w-full bg-gray-200 h-2 rounded-full">
            <div className="bg-green-600 h-2 rounded-full" style={{ width: "33%" }}></div>
          </div>
        </div>


        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-900 mb-2 text-center">
          Upload Your National ID
        </h2>

        <p className="text-gray-600 text-center mb-6">
          Please upload a clear photo of your government-issued National ID.
          Make sure all information is readable.
        </p>

        {/* Upload Box */}
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
          <Upload className="mx-auto text-gray-400 mb-3" size={32} />

          <p className="text-gray-600 mb-2">Drag and drop your file here</p>
          <p className="text-gray-400 mb-4">or</p>

          <label className="bg-green-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-green-800">
            Choose File
            <input type="file" className="hidden" onChange={handleFileChange} />
          </label>

          <p className="text-gray-400 text-sm mt-4">
            Supported formats: JPG, PNG, PDF — Max size 10MB
          </p>
        </div>

        {/* Tips Box */}
        <div className="mt-6 bg-green-50 p-4 rounded-lg">
          <h4 className="font-semibold text-green-700 mb-2">Tips for a good photo</h4>
          <ul className="space-y-1 text-sm text-blue-900">
            <li className="flex items-center gap-2">
              <CheckCircle size={16} className="text-green-600" /> Ensure the whole document is visible
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle size={16} className="text-green-600" /> Avoid glare and reflections
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle size={16} className="text-green-600" /> Take photos in good lighting
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle size={16} className="text-green-600" /> Make sure the text is readable
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mt-8">
          <button className="text-gray-600 hover:underline">Back</button>

          <button
            onClick={handleContinue}
            disabled={!file}
            className={`px-6 py-2 rounded-lg text-white 
            ${file ? "bg-green-600 hover:bg-green-800" : "bg-gray-300 cursor-not-allowed"}`}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
