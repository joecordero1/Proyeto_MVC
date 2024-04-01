import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateEvento from './CreateEvento';
import Evento from './Evento';
import UpdateEvento from './UpdateEvento';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Evento />} />
          <Route path="/CreateEvento" element={<CreateEvento />} />
          <Route path="/UpdateEvento/:id" element={<UpdateEvento />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
