//server.js
const express = require('express');
const ApiClient = require('./ApiClient'); 
const cors = require('cors');


// Crear una instancia de la aplicación Express
const app = express();

// Instanciar ApiClient apuntando a la URL de la API
const apiClient = new ApiClient('http://localhost:5223');

// Middleware para parsear JSON en el cuerpo de las solicitudes
app.use(express.json());

app.use(cors());

// Hacer que el servidor escuche en un puerto específico
app.listen(5000, () => {
    console.log("El servidor está escuchando en el puerto 5000...");
    
});

// Definir una ruta en tu servidor que buscará los eventos en la API externa
app.get('/ApiEventos', async (req, res) => {
    try {
        // Utilizar ApiClient para obtener los datos de la API externa
        const eventos2 = await apiClient.get('/Evento/ListarEventos');
        console.log(eventos2); // Aquí puedes ver los datos obtenidos
        // Enviar los datos de los eventos como respuesta en formato JSON
        res.json(eventos2);
    } catch (error) {
        // Manejar errores y enviar una respuesta
        console.error(`Error obteniendo eventos: ${error}`);
        res.status(500).send(`Error obteniendo eventos: ${error}`);
    }
});

// Definir una respuesta para la ruta raíz
app.get('/', (req, res) => {
    res.send('Bienvenido al servidor de Express, Joe Cordero');
});

app.post('/CreateEvento', async (req, res) => {
    try {
        // Extraer los datos del evento del cuerpo de la solicitud
        const { titulo, fecha, lugar, descripcion, hora } = req.body;
        
        // Construir la URL con parámetros de consulta
        const queryParams = new URLSearchParams({ Titulo: titulo, Fecha: fecha, Lugar: lugar, Descripcion: descripcion, Hora: hora }).toString();
        const url = `/Evento/RegistrarEvento?${queryParams}`;

        // Utilizar ApiClient para enviar los datos del evento a la API externa
        const nuevoEvento = await apiClient.post(url);
        console.log(nuevoEvento); // Aquí puedes ver los datos del evento creado

        // Enviar los datos del nuevo evento como respuesta en formato JSON
        res.json(nuevoEvento);
    } catch (error) {
        // Manejar errores y enviar una respuesta con código de estado 500
        console.error(`Error creando el evento: ${error}`);
        res.status(500).send(`Error creando el evento: ${error}`);
    }
});

app.put('/UpdateEvento/:id', async (req, res) => {
    console.log(req.body);
    try {
        // Extraer los datos del evento y el ID del cuerpo de la solicitud
        const { id, titulo, fecha, lugar, descripcion, hora } = req.body;
        
        // Verificar que el id está presente
        if (!id) {
            return res.status(400).send('ID del evento es requerido.');
        }

        // Construir la URL con parámetros de consulta, incluido el ID del evento
        const queryParams = new URLSearchParams({
            id, // Asegúrate de que el nombre del parámetro coincida con lo que tu API espera
            Titulo: titulo,
            Fecha: fecha,
            Lugar: lugar,
            Descripcion: descripcion,
            Hora: hora
        }).toString();
        console.log(queryParams)
        
        // Si tu API .NET espera recibir los parámetros en la cadena de consulta de una solicitud PUT
        const url = `/Evento/EditarEvento?${queryParams}`;

        // Utilizar ApiClient para enviar los datos del evento a la API externa
        const eventoActualizado = await apiClient.put(url);
        
        // Enviar los datos del evento actualizado como respuesta en formato JSON
        res.json(eventoActualizado);
    } catch (error) {
        // Manejar errores y enviar una respuesta con código de estado 500
        console.error(`Error actualizando el evento: ${error}`);
        res.status(500).send(`Error actualizando el evento: ${error.message}`);
    }
});

app.delete('/DeleteEvento/:id', async (req, res) => {
    try {
        // Extraer el ID del evento de los parámetros de la ruta
        const { id } = req.params;
        
        // Construir la URL con parámetros de consulta
        const queryParams = new URLSearchParams({ id }).toString();
        const url = `/Evento/EliminarEvento?${queryParams}`;
        console.log(url);

        // Utilizar ApiClient para eliminar el evento
        const eventoEliminado = await apiClient.delete(url);
        
        // Enviar los datos del evento eliminado como respuesta en formato JSON
        res.json(eventoEliminado);
    } catch (error) {
        console.error(`Error eliminando el evento: ${error}`);
        res.status(500).send(`Error eliminando el evento: ${error.message}`);
    }
});
