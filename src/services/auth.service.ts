export const loginService = async (email, password) => {
  if (!email || !password) {
    throw new Error('Datos incompletos');
  }

  // Login simulado
  return {
    id: 1,
    name: 'Angie Alba',
    email,
    token: 'fake-token-123',
  };
};
export const registerService = async (name, email, password) => {
  if (!name || !email || !password) {
    throw new Error('Datos incompletos');
  }

  // Registro simulado
  return {
    id: 2,
    name,
    email,
    token: 'fake-token-456',
  };
};