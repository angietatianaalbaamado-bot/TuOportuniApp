import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../models/User";
import { loginService } from "../services/auth.service";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await AsyncStorage.getItem("user");
      if (storedUser) setUser(JSON.parse(storedUser));
    };
    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    const data = await loginService(email, password);
    setUser(data);
    await AsyncStorage.setItem("user", JSON.stringify(data));
    setLoading(false);
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem("user");
  };

  return { user, login, logout, loading };
}
