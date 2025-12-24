import AsyncStorage from "@react-native-async-storage/async-storage";

// Guardar dato
export const setData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log("Error guardando datos", error);
  }
};

// Obtener dato
export const getData = async (key) => {
  try {
    const data = await AsyncStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.log("Error obteniendo datos", error);
    return null;
  }
};

// Eliminar dato
export const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log("Error eliminando datos", error);
  }
};
