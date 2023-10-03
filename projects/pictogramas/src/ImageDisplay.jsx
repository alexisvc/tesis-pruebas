import React, { useState } from 'react';
import './ImageDisplay.css'; // Agregamos el archivo CSS

export function ImageDisplay({ images }) {
  const [selectedImages, setSelectedImages] = useState([]);
  const [speaking, setSpeaking] = useState(false);

  const handleImageClick = (altText, imageUrl) => {
    if (!speaking) {
      const synth = window.speechSynthesis;

      if (synth) {
        const utterance = new SpeechSynthesisUtterance(altText);
        synth.speak(utterance);
      } else {
        console.error('La síntesis de voz no está soportada en este navegador.');
      }

      const image = { alt: altText, url: imageUrl };
      setSelectedImages([...selectedImages, image]);
    }
  };

  const handleDeleteLastImage = () => {
    if (!speaking && selectedImages.length > 0) {
      const updatedImages = [...selectedImages];
      updatedImages.pop(); // Elimina la última imagen del array
      setSelectedImages(updatedImages);
    }
  };

  const handleDeleteAllImages = () => {
    if (!speaking && selectedImages.length > 0) {
      setSelectedImages([]); // Borra todas las imágenes del array
    }
  };

  const handleReadSelectedImages = () => {
    if (!speaking && selectedImages.length > 0) {
      setSpeaking(true);

      const synth = window.speechSynthesis;

      if (synth) {
        synth.cancel(); // Detiene la síntesis de voz anterior si hay alguna

        selectedImages.forEach((image, index) => {
          const utterance = new SpeechSynthesisUtterance(image.alt);
          utterance.onend = () => {
            if (index === selectedImages.length - 1) {
              setSpeaking(false);
            }
          };
          setTimeout(() => synth.speak(utterance), index * 1000);
        });
      } else {
        console.error('La síntesis de voz no está soportada en este navegador.');
      }
    }
  };

  return (
    <>
      <div className="selected-images"> {/* Agregamos una clase para la disposición en fila */} {selectedImages.map((image, index) => (
        <div key={index} className="card">
          <img src={image.url} alt={image.alt} />
          <h1 style={{ textTransform: 'uppercase' }}>{image.alt}</h1> {/* Aplicamos el estilo de mayúsculas */}
        </div>
        ))}
        <div className="button-container"> {/* Agregamos una clase para el contenedor de botones */}
          <button onClick={handleDeleteLastImage} disabled={speaking}>
            Eliminar
          </button>
          <button onClick={handleDeleteAllImages} disabled={speaking}>
            Eliminar todo
          </button>
          <button onClick={handleReadSelectedImages} disabled={speaking}>
            Play
          </button>
        </div>
      </div>

      <div className="image-grid"> {/* Agregamos una clase para la cuadrícula */} {images.map((image, index) => (
        <div key={index} className="card" onClick={()=> handleImageClick(image.name, image.url)}>
          <img src={image.url} alt={image.name} />
          <h1 style={{ textTransform: 'uppercase' }}>{image.name}</h1> {/* Aplicamos el estilo de mayúsculas */}
        </div>
        ))}
      </div>
      
    </> 
  );
}
