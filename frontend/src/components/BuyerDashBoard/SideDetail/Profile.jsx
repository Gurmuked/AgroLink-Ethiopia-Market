import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';

// --- Verification Status Mock Data (For demonstration/placeholders) ---
// REPLACE these default values with the data structure you fetch from your API.
const DEFAULT_USER = {
  username: 'VeridianCanvas_7',
  handle: '@VeridianCanvas_7',
  email: 'contact@veridian.dev',
  user_type: 'Developer',
  is_verified: false, // Set to 'true' to see the verified state!
  profile_image_url: 'https://i.pravatar.cc/150?img=68',
  cover_image_url: 'https://images.unsplash.com/photo-1549490349-8643362c9a5a?w=1200&auto=format&fit=crop',
  bio: 'Voice lead digital experiences, mentor, and passionate about clean code and beautiful interfaces.',
  followers: '1',
  following: '323',
};

// --- Profile Picture Component with Verification Glow (The Core Feature) ---
const ProfilePicture = ({ url, isVerified, username }) => (
  <div className="relative w-36 h-36 mx-auto -mt-16 sm:-mt-20">
    
    {/* 1. The Verification Glow/Border */}
    {isVerified && (
      <div className="absolute inset-0 p-1 rounded-full bg-gradient-to-r from-green-400 to-green-600 animate-pulse-slow">
        <div className="w-full h-full rounded-full bg-white opacity-90"></div>
      </div>
    )}

    {/* 2. The Profile Image */}
    <img
      src={url}
      alt={`${username}'s profile`}
      className={`relative w-full h-full object-cover rounded-full border-4 border-green-700 shadow-xl ${isVerified ? 'z-10' : ''}`}
    />

    {/* 3. The Verification Badge Overlay */}
    {isVerified && (
      <div
        className="absolute bottom-0 right-0 transform translate-x-1 translate-y-1 bg-gradient-to-br from-green-400 to-green-600 p-1.5 rounded-full shadow-2xl z-20"
        title="Verified User"
      >
        <svg className="w-5 h-5 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 13.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    )}
  </div>
);


const ProfilePageVeridianCanvas = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          if (mounted) setError('Not logged in');
          return;
        }

        const res = await fetch('http://localhost:5000/api/users/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body.message || 'Failed to fetch profile');
        }
        const me = await res.json();
        const mapped = {
          username: me.username || DEFAULT_USER.username,
          handle: me.username ? `@${me.username}` : DEFAULT_USER.handle,
          email: me.email || DEFAULT_USER.email,
          user_type: me.user_type || DEFAULT_USER.user_type,
          is_verified: me.is_verified || DEFAULT_USER.is_verified,
          verification_status: me.verification_status || null,
          profile_image_url: me.profile_image_url || DEFAULT_USER.profile_image_url,
          cover_image_url: me.cover_image_url || DEFAULT_USER.cover_image_url,
          bio: me.bio || DEFAULT_USER.bio,
          followers: me.followers || DEFAULT_USER.followers,
          following: me.following || DEFAULT_USER.following,
          created_at: me.created_at || null,
        };
        if (mounted) setUser(mapped);
        try { localStorage.setItem('user', JSON.stringify(mapped)); } catch (e) {}
      } catch (err) {
        console.error(err);
        if (mounted) setError(err.message || 'Failed to load profile');
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, []);

  // Use the fetched user data, or fall back to defaults if not provided
  const displayUser = user || DEFAULT_USER;

  if (loading) {
    return (
      <div className="p-8 bg-green-50 min-h-screen text-gray-900">
        <div className="bg-white rounded-xl shadow-xl p-6 text-center border border-green-200">
          <p className="text-lg text-gray-600">Loading profile data...</p>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="p-8 bg-green-50 min-h-screen text-gray-900">
        <div className="bg-white rounded-xl shadow-xl p-6 text-center border border-green-200">
          <p className="text-lg text-red-600">{error || 'User not found or not logged in.'}</p>
        </div>
      </div>
    );
  }

  // --- Main Layout ---
  return (
    <div className="w-full h-[100vh] bg-green-50">
      
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden w-full mx-auto border border-green-200">
        
        {/* Cover Photo */}
        <div 
          className="h-40 sm:h-56 w-full bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${displayUser.cover_image_url})`,
            // Add the teal gradient overlay seen in the image
            background: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${displayUser.cover_image_url})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
         >
          {/* Top Bar Logo/Menu (Replicating the image) */}
          <div className="flex justify-between items-center p-4 bg-green-800 ">
            <h2 className="text-xl font-bold text-white">Profile</h2>
            <div className="space-x-4 bg-opacity-30">
               <svg className="w-6 h-6 text-gray-400 hover:text-white" fill="currentColor" viewBox="0 0 20 20">...</svg> {/* Placeholder for Menu/Settings Icons */}
            </div>
          </div>
        </div>

        {/* Profile Details Area */}
        <div className="relative p-4 sm:p-6">
          
          {/* Profile Picture */}
          <ProfilePicture 
            url={displayUser.profile_image_url} 
            isVerified={displayUser.is_verified} 
            username={displayUser.username}
          />

          {/* User Name and Verification Status */}
          <div className="text-center mt-4">
            <h1 className="text-3xl font-extrabold text-gray-900 flex items-center justify-center">
              {displayUser.username}
              {/* Inline Verification Badge next to name */}
              {displayUser.is_verified && (
                <span className="ml-2 text-green-700" title="Verified Account">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.93 2.93A8 8 0 0110 0a8 8 0 017.07 11.07A8 8 0 0110 20a8 8 0 01-7.07-8.93zM10 18a6 6 0 100-12 6 6 0 000 12zM14.71 6.71a1 1 0 00-1.42-1.42L9 11.58l-2.29-2.3a1 1 0 00-1.42 1.42l3 3a1 1 0 001.42 0l5-5z" />
                  </svg>
                </span>
              )}
            </h1>
            <p className="text-sm text-gray-600">{displayUser.handle}</p>
          </div>

          {/* Bio and Stats Section */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Bio Card (Darker background) */}
            <div className={`md:col-span-2 p-4 rounded-lg shadow-xl bg-green-50 border border-green-200`}>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">About Me</h3>
              <p className="text-gray-600 text-sm">{displayUser.bio}</p>
              <div className="mt-4 text-xs text-gray-500 space-y-1">
                <p>Email: <span className="font-medium text-green-700">{displayUser.email}</span></p>
                <p>Role: <span className="font-medium text-green-600">{displayUser.user_type}</span></p>
              </div>
            </div>

            {/* Quick Stats Card */}
            <div className={`md:col-span-1 flex flex-col justify-around p-4 rounded-lg shadow-xl bg-green-50 border border-green-200`}>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Quick Stats</h3>
              <div className="flex justify-between items-center text-center mt-2">
                <div>
                  <p className="text-2xl font-bold text-green-700">{displayUser.followers}</p>
                  <p className="text-sm text-gray-600">Followers</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600">{displayUser.following}</p>
                  <p className="text-sm text-gray-600">Following</p>
                </div>
              </div>
            </div>

          </div>

          {/* Verification Status Section */}
          {!displayUser.is_verified && displayUser.verification_status !== 'pending' && (
            <div className="mt-8 p-4 bg-green-100 border border-green-500 rounded-lg shadow-lg">
              <p className="font-bold text-green-700 text-lg mb-1">Verification Required!</p>
              <p className="text-sm text-gray-600">Complete your identity verification to get the **official verified badge** and the unique profile glow effect.</p>
              <Link to='/buyer-dashboard/verification/upload-docs'>
              <button className="mt-3 px-4 py-2 text-sm font-semibold bg-green-600 text-white rounded-md hover:bg-green-800 transition duration-150 flex items-center">
                Start Verification Process &nbsp; &rarr;
              </button>
              </Link>
            </div>
          )}

          {!displayUser.is_verified && displayUser.verification_status === 'pending' && (
            <div className="mt-8 p-4 bg-yellow-100 border border-yellow-500 rounded-lg shadow-lg">
              <p className="font-bold text-yellow-700 text-lg mb-1">Verification Pending!</p>
              <p className="text-sm text-gray-600">Your verification documents have been submitted and are under review by our admin team. Please wait for approval.</p>
            </div>
          )}

        </div>
      </div>
      
      {/* Tailwind Custom Keyframe for the slow pulse effect */}
      <style>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
};

export default ProfilePageVeridianCanvas;