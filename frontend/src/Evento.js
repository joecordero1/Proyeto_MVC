import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function VistaEventos() {
    const [eventos, setEventos] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/ApiEventos')

            .then(res => {
                console.log(res.data); // Esto mostrará los datos en la consola
                setEventos(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    const handleDelete = async (id) => {
        try {
          await axios.delete(`http://localhost:5000/DeleteEvento/${id}`);
            // Llama a una función que recargue la lista de eventos del servidor
            fetchEventos();
        } catch (err) {
            console.log(err);
        }
    };
    
    // Función para cargar los eventos
    const fetchEventos = async () => {
        try {
            const response = await axios.get('http://localhost:5000/ApiEventos');
            setEventos(response.data);
        } catch (err) {
            console.log(err);
        }
    };
    
    useEffect(() => {
        fetchEventos();
    }, []);
    
    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className='w-50 bg-white rounded p-3'>
        <Link to= "./CreateEvento" className="btn btn-success">Añadir +</Link>
        <table className="table">
          <thead>
            <tr>
              <th>Titulo</th>
              <th>Lugar</th>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Descripcion</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {
                eventos.map((data, i) => (
                    <tr key={i}>
                        <td>{data.titulo}</td>
                        <td>{data.lugar}</td>
                        <td>{data.fecha}</td>
                        <td>{data.hora}</td>
                        <td>{data.descripcion}</td>
                        <td>
                          <Link to={`UpdateEvento/${data.idEvento}`} className='btn btn-primary'> Update</Link>
                          <button className='btn btn-danger ms-2' onClick={ e=> handleDelete(data.idEvento)}> Delete</button>
                        </td>
                    </tr>
                ))
            }
          </tbody>
        </table>
      </div>
    </div>
    )

}

export default VistaEventos;