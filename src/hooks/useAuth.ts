import { useEffect, useState } from 'react';
import { getData, setData, removeData } from '../services/storageService';
import { loginService } from '../services/auth.service';

export const useAuth = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const storedUser = await getData('user');
    if (storedUser) setUser(storedUser);
    setLoading(false);
  };

  const login = async (email: string, password: string) => {
    const userData = await loginService(email, password);
    await setData('user', userData);
    setUser(userData);
  };

  const logout = async () => {
    await removeData('user');
    setUser(null);
  };

  return {
    user,
    loading,
    login,
    logout,
  };
};
