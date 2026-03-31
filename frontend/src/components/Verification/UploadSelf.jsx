import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import { CheckCircle } from "lucide-react";

export default function SelfieCapture() {
  const webcamRef = useRef(null);
  const navigate = useNavigate();

  const [cameraOpen, setCameraOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [continueEnabled, setContinueEnabled] = useState(false);

  const handleOpenCamera = () => {
    setCameraOpen(true);
    setCapturedImage(null);
    setContinueEnabled(false);
  };

  const handleCloseCamera = () => {
    setCameraOpen(false);
    setCapturedImage(null);
    setContinueEnabled(false);
  };

  const captureSelfie = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    setContinueEnabled(true);
    setCameraOpen(false);
  };

  const handleComplete = async () => {
    // Here you would submit all the verification data to the backend
    // For now, we'll just navigate back to profile
    // In a real app, this would send the files to the server and set verification status to pending
    
    // Simulate API call
    try {
      const token = localStorage.getItem('token');
      // Submit verification request to backend
      const response = await fetch('http://localhost:5000/api/verification/submit', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          // Include the uploaded files data
          status: 'pending' // Admin will approve later
        })
      });
      
      if (response.ok) {
        alert('Verification submitted successfully! Please wait for admin approval.');
        navigate('/buyer-dashboard/profile');
      } else {
        alert('Failed to submit verification. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting verification:', error);
      alert('Error submitting verification. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-green-50 flex justify-center p-6">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-xl p-8">

                {/* Top Step Indicator */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-green-600 text-white font-semibold">
              3
            </div>
            <span className="text-gray-700 font-medium">Selfie</span>
          </div>

          <div className="text-sm text-gray-500">Step 3 of 3</div>
        </div>

                {/* Progress header */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Step 3 of 3</span>
            <span>100% Complete</span>
          </div>
          <div className="w-full bg-gray-200 h-2 rounded-full">
            <div className="bg-green-600 h-2 rounded-full" style={{ width: "100%" }}></div>
          </div>
        </div>


        {/* Header */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-2 text-center">
          Take a Selfie
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Take a real-time selfie so we can confirm your identity.
        </p>

        {/* Camera or Preview */}
        <div className="bg-black rounded-xl p-4 flex justify-center mb-6 relative">
          {!cameraOpen && !capturedImage && (
            <div className="text-center text-gray-300 py-16">
              <p>Camera is off</p>
            </div>
          )}

          {cameraOpen && (
            <Webcam
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="rounded-lg w-full"
            />
          )}

          {capturedImage && (
            <img
              src={capturedImage}
              alt="Captured selfie"
              className="rounded-lg w-full"
            />
          )}
        </div>

        {/* Camera Buttons */}
        <div className="flex justify-center gap-4 mb-6">
          {!cameraOpen && !capturedImage && (
            <button
              onClick={handleOpenCamera}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Ready
            </button>
          )}

          {cameraOpen && (
            <>
              <button
                onClick={captureSelfie}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Capture Selfie
              </button>

              <button
                onClick={handleCloseCamera}
                className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Close Camera
              </button>
            </>
          )}

          {capturedImage && (
            <button
              onClick={handleOpenCamera}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Retake
            </button>
          )}
        </div>

        {/* Tips Box */}
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <h4 className="font-semibold text-blue-700 mb-2">Tips for Best Results</h4>
          <ul className="space-y-1 text-sm text-blue-900">
            <li className="flex items-center gap-2">
              <CheckCircle size={16} className="text-green-600" /> Look straight at the camera
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle size={16} className="text-green-600" /> Remove hats, sunglasses, or face coverings
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle size={16} className="text-green-600" /> Ensure good lighting
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle size={16} className="text-green-600" /> Keep your entire face inside the frame
            </li>
          </ul>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-between mt-4">
          <button className="text-gray-600 hover:underline">Back</button>

          <button
            onClick={handleComplete}
            disabled={!continueEnabled}
            className={`px-6 py-2 rounded-lg text-white 
              ${continueEnabled ? "bg-green-600 hover:bg-green-800" : "bg-gray-300 cursor-not-allowed"}`}
          >
            Complete
          </button>
        </div>
      </div>
    </div>
  );
}
