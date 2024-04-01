const axios = require('axios');

class ApiClient {
    constructor(baseURL) {
        this.api = axios.create({
            baseURL: baseURL,
        });
    }

    // Leer - Obtener recursos
    async get(path, params = {}) {
        try {
            const response = await this.api.get(path, { params });
            return response.data;
        } catch (error) {
            console.error(`Error realizando la petición GET: ${error}`);
            throw error;
        }
    }

    // Crear - Añadir un nuevo recurso
    async post(path, data = {}) {
        try {
            const response = await this.api.post(path, data);
            return response.data;
        } catch (error) {
            console.error(`Error realizando la petición POST: ${error}`);
            throw error;
        }
    }

    // Actualizar - Modificar un recurso existente
    async put(path, data = {}) {
        try {
            const response = await this.api.put(path, data);
            return response.data;
        } catch (error) {
            console.error(`Error realizando la petición PUT: ${error}`);
            throw error;
        }
    }

    // Eliminar - Borrar un recurso
    async delete(path) {
        try {
            const response = await this.api.delete(path);
            return response.data;
        } catch (error) {
            console.error(`Error realizando la petición DELETE: ${error}`);
            throw error;
        }
    }
}

module.exports = ApiClient;
