import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateEvento() {
    const [titulo, setTitulo] = useState('');
    const [fecha, setFecha] = useState('');
    const [lugar, setLugar] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [hora, setHora] = useState('');
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        axios.post('http://localhost:5000/CreateEvento', { titulo, fecha, lugar, descripcion, hora })
            .then(res => {
                console.log(res);
                navigate('/');
            })
            .catch(err => console.log('aqui muere'+err+'aqui muere'));
    }

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <form onSubmit={handleSubmit}>
                    <h2>Añadir Evento</h2>
                    <div className="mb-2">
                        <label htmlFor="titulo">Titulo</label>
                        <input type="text" id="titulo" placeholder="Ingresar título" className="form-control"
                               onChange={e => setTitulo(e.target.value)} value={titulo} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="fecha">Fecha</label>
                        <input type="date" id="fecha" className="form-control"
                               onChange={e => setFecha(e.target.value)} value={fecha} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="lugar">Lugar</label>
                        <input type="text" id="lugar" placeholder="Ingresar lugar" className="form-control"
                               onChange={e => setLugar(e.target.value)} value={lugar} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="descripcion">Descripcion</label>
                        <input type="text" id="descripcion" placeholder="Ingresar descripción" className="form-control"
                               onChange={e => setDescripcion(e.target.value)} value={descripcion} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="hora">Hora</label>
                        <input type="time" id="hora" className="form-control"
                               onChange={e => setHora(e.target.value)} value={hora} />
                    </div>
                    <button type="submit" className="btn btn-success">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default CreateEvento;
