export const loginService = async (email, password) => {
  if (!email || !password) {
    throw new Error('Datos incompletos');
  }

  return {
    id: 1,
    name: 'Angie Alba',
    email,
    token: 'fake-token-123',
  };
};
