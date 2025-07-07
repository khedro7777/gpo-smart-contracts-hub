
import { useState, useEffect } from 'react';

interface UserPoints {
  available_points: number;
  total_points: number;
  held_points: number;
}

export const useUserPoints = () => {
  const [userPoints, setUserPoints] = useState<UserPoints | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading user points
    setTimeout(() => {
      setUserPoints({
        available_points: 1500,
        total_points: 2000,
        held_points: 500
      });
      setLoading(false);
    }, 500);
  }, []);

  return {
    userPoints,
    loading
  };
};
