import React, { useState } from 'react';
import './ImageDisplay.css'; // Reemplaza 'TuArchivoDeEstilos.css' con la ubicación de tu archivo CSS

export function ImageDisplay({ images }) {
  const [selectedImages, setSelectedImages] = useState([]);
  const [speaking, setSpeaking] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = Array.from(new Set(images.map(image => image.category)));

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
      updatedImages.pop();
      setSelectedImages(updatedImages);
    }
  };

  const handleDeleteAllImages = () => {
    if (!speaking && selectedImages.length > 0) {
      setSelectedImages([]);
    }
  };

  const handleReadSelectedImages = () => {
    if (!speaking && selectedImages.length > 0) {
      setSpeaking(true);

      const synth = window.speechSynthesis;
      if (synth) {
        synth.cancel();

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

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
  };

  const filteredImages = selectedCategory
    ? images.filter(image => image.category === selectedCategory)
    : images;

  return (
    <div className="container">
      {/* Div superior para pictogramas seleccionados y botones */}
      <div className="selected-images-and-buttons">
        <div className="selected-images">
          {selectedImages.map((image, index) => (
            <div key={index} className="card">
              <img src={image.url} alt={image.alt} />
              <p style={{ textTransform: 'uppercase' }}>{image.alt}</p>
            </div>
          ))}
        </div>

        <div className="button-container">
          <button onClick={handleDeleteLastImage} disabled={speaking}>
            Eliminar
          </button>
          <button onClick={handleDeleteAllImages} disabled={speaking}>
            Eliminar todos
          </button>
          <button onClick={handleReadSelectedImages} disabled={speaking}>
            Play
          </button>
        </div>
      </div>

      {/* Grid para mostrar categorías y pictogramas */}
      <div className="grid-container">
        {/* Columna de categorías */}
        <div className="categories">
          {categories.map((category, index) => (
            <button key={index} onClick={() => handleCategoryFilter(category)}>
              {category}
            </button>
          ))}
        </div>

        {/* Columna de pictogramas */}
        <div className="image-grid">
          <div className="image-grid-inner">
            {filteredImages.map((image, index) => (
              <div key={index} className="card" onClick={() => handleImageClick(image.name, image.url)}>
                <div className="card-image">
                  <img src={image.url} alt={image.name} />
                </div>
                <p>{image.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
