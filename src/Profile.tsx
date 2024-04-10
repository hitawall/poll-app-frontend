// Profile.tsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface UserData {
  username: string;
  email: string;
}

function Profile() {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
//         const res = await axios.get('/api/profile');
        setUserData(res.data); // set user data on success
      } catch (err) {
        console.error(err.response.data); // handle error
      }
    };
    fetchProfileData();
  }, []);

  return (
    <div>
      <h1>Profile</h1>
      {userData && (
        <div>
          <p>Username: {userData.username}</p>
          <p>Email: {userData.email}</p>
        </div>
      )}
    </div>
  );
}

export default Profile;
