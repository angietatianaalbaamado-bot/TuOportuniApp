import { User } from "../models/User";

// Simula login por ahora
export const loginService = async (
  email: string,
  password: string
): Promise<User> => {
  if (email && password) {
    return {
      id: "1",
      nombre: "Angie",
      email,
      rol: "candidato",
    };
  }
  throw new Error("Credenciales inválidas");
};
