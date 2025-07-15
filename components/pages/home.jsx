import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const ProfileGallery = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchProfiles = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/profile/all/');
      console.log('ProfileGallery response:', response.data);
      setProfiles(response.data.profiles || []);
      setLoading(false);
    } catch (err) {
      console.error('ProfileGallery error:', err);
      setError('Failed to fetch profiles.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  if (loading) return <p>Loading profiles...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Uploaded Avatars</h2>
      {profiles.length === 0 && <p>No profiles found.</p>}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {profiles.map((profile) => (
          <li key={profile.id} style={{ kmarginBottom: '1rem' }}>
            <img 
              className="rounded aspect-[2/3]"
              src={`http://localhost:8000/api${profile.avatar}`}
              alt={`Profile ${profile.id}`}
              style={{ width: '120px', borderRadius: '8px' }}
              onError={(e) => {
                console.log('Image failed to load:', profile.avatar);
                e.target.alt = 'Failed to load image';
                e.target.style.border = '2px solid red';
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};