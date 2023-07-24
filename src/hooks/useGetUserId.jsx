import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../provider/AuthProvider';

const useGetUserId = () => {
  const [userId, setUserId] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await axios.get(`https://ovigo-server-wheat.vercel.app/getuserId/${user?.email}`);
        setUserId(response.data.userId);
      } catch (error) {
        console.error('Error fetching user ID:', error);
      }
    };

    fetchUserId();
  }, [user?.email]);

  return userId;
};

export default useGetUserId;