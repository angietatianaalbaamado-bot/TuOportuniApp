import { api } from './api';

export const loginService = async (correo: string, contrasena: string) => {
  const data = await api.post('/api/auth/login', { correo, contrasena });
  if (data.token) return data;
  throw new Error(data.mensaje || 'Error al iniciar sesión');
};

export const registroService = async (
  nombre: string,
  apellido: string,
  correo: string,
  contrasena: string,
  rol: string
) => {
  const data = await api.post('/api/auth/registro', { nombre, apellido, correo, contrasena, rol });
  if (data.usuario) return data;
  throw new Error(data.mensaje || 'Error al registrarse');
};