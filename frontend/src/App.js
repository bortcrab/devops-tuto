import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [logs, setLogs] = useState([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  // URL de la API Django
  const API_URL = 'http://localhost:8000/api/logs/';

  // Función para obtener datos
  const fetchLogs = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setLogs(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Cargar datos al iniciar
  useEffect(() => {
    fetchLogs();
  }, []);

  // Función para enviar datos
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, message }),
      });
      // Limpiar formulario y recargar lista
      setName('');
      setMessage('');
      fetchLogs();
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  return (
    <div className="App" style={{ padding: "20px" }}>
      <h1>DevOps Demo: Django + React</h1>
      
      <div style={{ marginBottom: "20px", border: "1px solid #ccc", padding: "10px" }}>
        <h2>Registrar Usuario</h2>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Nombre" 
            value={name} 
            onChange={e => setName(e.target.value)} 
            style={{ marginRight: "10px" }}
            required
          />
          <input 
            type="text" 
            placeholder="Mensaje" 
            value={message} 
            onChange={e => setMessage(e.target.value)} 
            style={{ marginRight: "10px" }}
            required
          />
          <button type="submit">Enviar a BD Postgres</button>
        </form>
      </div>

      <div>
        <h2>Registros en BD:</h2>
        <ul>
          {logs.map(log => (
            <li key={log.id}>
              <strong>{log.name}:</strong> {log.message}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;