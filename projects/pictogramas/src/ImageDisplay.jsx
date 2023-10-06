import React, { useState } from 'react';
import { createPictogram } from "./services/pictograms/createPictogram.js";
import './ImageDisplay.css';

export function ImageDisplay({ images }) {
  const [selectedImages, setSelectedImages] = useState([]);
  const [speaking, setSpeaking] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [nameValue, setNameValue] = useState("");
  const [categoryValue, setCategoryValue] = useState("");
  const [urlValue, setUrlValue] = useState("");

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

    const handleSubmit = (e) => {
      e.preventDefault(); // Evita la recarga de la página
      const pictogramToAdd = {
        name: nameValue,
        category: categoryValue, // Utiliza el valor de category
        url: urlValue, // Utiliza el valor de url
      };
  
      createPictogram(pictogramToAdd)
        .then((newPictogram) => {
          //setPictograms((prevPictograms) => [...prevPictograms, newPictogram]);
          setNameValue("");
          setCategoryValue(""); // Limpia el valor del campo de categoría
          setUrlValue(""); // Limpia el valor del campo de URL
        })
        .catch((error) => {
          console.error("Error al crear el pictograma:", error);
          // Aquí puedes mostrar un mensaje de error al usuario si lo deseas
        });
    };

    const handleChange = (e) => {
      setNameValue(e.target.value);
    };

  return (
    <div className="container">
      <button onClick={() => setShowForm(true)}>Personalizar</button>
      {showForm && (
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="name" onChange={handleChange} value={nameValue} />
          <br />
          <input
            type="text"
            placeholder="Category"
            value={categoryValue}
            onChange={(e) => setCategoryValue(e.target.value)}
          />
          <br />
          <input
            type="text"
            placeholder="URL"
            value={urlValue}
            onChange={(e) => setUrlValue(e.target.value)}
          />
          <br />
          <button>Crear pictograma</button>
        </form>
      )}
      {/* Div superior para pictogramas seleccionados y botones */}
      <div className="selected-images-and-buttons">
        <div className="selected-images">
          {selectedImages.map((image, index) => (
            <div key={index} className="card">
              <img src={image.url} alt={image.alt} />
              <p>{image.alt}</p>
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
