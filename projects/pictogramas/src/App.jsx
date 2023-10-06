import React, { useState, useEffect } from 'react';
import { ImageDisplay } from './ImageDisplay';
import { getAllPictograms } from "./services/notes/getAllPictograms.js";

function App() {
  const [pictogramsData, setPictogramsData] = useState([]);

  useEffect(() => {
    // Llama al servicio para obtener los pictogramas
    getAllPictograms()
      .then(data => {
        setPictogramsData(data);
      })
      .catch(error => {
        console.error('Error al obtener los pictogramas de la API', error);
      });
  }, []);

  return (
    <ImageDisplay images={pictogramsData} />
  );
}

export default App;
