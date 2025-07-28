import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const Hometwo = () => {
  const [avatar, setAvatar] = useState(null);
  const [message, setMessage] = useState('');
  const [profiles, setProfiles] = useState([]);

  const handleFileChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!avatar) {
      setMessage('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('avatar', avatar);

    try {
      const response = await axios.post(
        'http://localhost:8000/api/profile/create/',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log(response.data);
      setMessage(response.data.message || 'Upload successful!');
      fetchProfiles(); // Refresh profiles after upload
    } catch (error) {
      console.error(error);
      setMessage('Upload failed');
    }
  };

  const fetchProfiles = async () => {
    try {
      // Fix: Use the correct endpoint for fetching all profiles
      const response = await axios.get('http://localhost:8000/api/profile/all/');
      console.log('Fetched profiles:', response.data);
      // Fix: Use the correct data structure from the API response
      setProfiles(response.data.profiles || []);
    } catch (error) {
      console.error('Error fetching profiles:', error);
      setProfiles([]);
    }
  };

  useEffect(() => {
    fetchProfiles(); // Fetch once on mount
  }, []);

  return (
    <div>
      <h2>Upload Avatar (Axios)</h2>
      <form onSubmit={handleUpload}>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      <p>{message}</p>

      <h3>All Uploaded Profiles</h3>
      <ul>
        {profiles.map((profile) => (
          <li key={profile.id}>
            <img
              src={`http://localhost:8000${profile.avatar}`}
              alt={`avatar ${profile.id}`}
              width="100"
              onError={(e) => {
                console.log('Image failed to load:', profile.avatar);
                e.target.style.display = 'none';
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}