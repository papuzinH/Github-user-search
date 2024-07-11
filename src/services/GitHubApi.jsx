const BASE_URL = "https://api.github.com";

//Función para buscar usuario por nombre
export const searchUser = async (username) => {
    const response = await fetch(`${BASE_URL}/search/users?q=${username}`);
    if(!response.ok){
        throw new Error("Usuario no encontrado");
    }
    return response.json();
}