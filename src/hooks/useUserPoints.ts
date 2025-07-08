
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

  const managePoints = async (action: string, amount: number) => {
    // Simulate points management
    if (!userPoints) return false;
    
    let newPoints = { ...userPoints };
    
    switch (action) {
      case 'hold':
        if (newPoints.available_points >= amount) {
          newPoints.available_points -= amount;
          newPoints.held_points += amount;
        } else {
          return false;
        }
        break;
      case 'release':
        newPoints.held_points = Math.max(0, newPoints.held_points - amount);
        newPoints.available_points += Math.min(amount, userPoints.held_points);
        break;
      case 'earn':
        newPoints.total_points += amount;
        newPoints.available_points += amount;
        break;
      case 'deduct':
        if (newPoints.available_points >= amount) {
          newPoints.available_points -= amount;
          newPoints.total_points -= amount;
        } else {
          return false;
        }
        break;
    }
    
    setUserPoints(newPoints);
    return true;
  };

  return {
    userPoints,
    loading,
    managePoints
  };
};
