import React, { useState, useEffect } from "react";
import "./App.css";

const pictogramsData = [
  { name: 'Yo', url: 'https://api.arasaac.org/api/pictograms/6632?download=false&plural=false&color=true' }, 
  { name: 'Tú', url: 'https://api.arasaac.org/api/pictograms/6625?download=false&plural=false&color=true' }, 
  { name: 'Él', url: 'https://api.arasaac.org/api/pictograms/6481?download=false&plural=false&color=true' }, 
  { name: 'Nosotros', url: 'https://api.arasaac.org/api/pictograms/32306?download=false&plural=false&color=true' },
  { name: 'Ellos', url: 'https://api.arasaac.org/api/pictograms/31906?download=false&plural=false&color=true' }, 
  { name: 'QUERER', url: 'https://api.arasaac.org/api/pictograms/5441?download=false&plural=false&color=true' }, 
  { name: 'CORRER', url: 'https://api.arasaac.org/api/pictograms/6465?download=false&plural=false&color=true' }, 
  { name: 'COMER', url: 'https://api.arasaac.org/api/pictograms/6456?download=false&plural=false&color=true' },
  { name: 'NECESITAR', url: 'https://api.arasaac.org/api/pictograms/37160?download=false&plural=false&color=true' },
];

const answersData = [
  { name: 'Yo', url: 'https://api.arasaac.org/api/pictograms/6632?download=false&plural=false&color=true' }, 
  { name: 'Tú', url: 'https://api.arasaac.org/api/pictograms/6625?download=false&plural=false&color=true' }, 
  { name: 'Él', url: 'https://api.arasaac.org/api/pictograms/6481?download=false&plural=false&color=true' }, 
  { name: 'Nosotros', url: 'https://api.arasaac.org/api/pictograms/32306?download=false&plural=false&color=true' },
  { name: 'Ellos', url: 'https://api.arasaac.org/api/pictograms/31906?download=false&plural=false&color=true' }, 
  { name: 'QUERER', url: 'https://api.arasaac.org/api/pictograms/5441?download=false&plural=false&color=true' }, 
  { name: 'CORRER', url: 'https://api.arasaac.org/api/pictograms/6465?download=false&plural=false&color=true' }, 
  { name: 'COMER', url: 'https://api.arasaac.org/api/pictograms/6456?download=false&plural=false&color=true' },
  { name: 'NECESITAR', url: 'https://api.arasaac.org/api/pictograms/37160?download=false&plural=false&color=true' },
];

function App() {
  const [currentPictograms, setCurrentPictograms] = useState([]);
  const [currentPictogram, setCurrentPictogram] = useState(null);
  const [difficulty, setDifficulty] = useState("Fácil");
  const [synthesis, setSynthesis] = useState(null);

  useEffect(() => {
    getRandomPictograms(difficulty);

    // Inicializa la síntesis de voz
    const synthesis = window.speechSynthesis;
    setSynthesis(synthesis);
  }, [difficulty]);

  const getRandomPictograms = (selectedDifficulty) => {
    let numberOfPictograms = 3; // Por defecto, se inicia con 3 pictogramas para "Fácil"
    
    if (selectedDifficulty === "Normal") {
      numberOfPictograms = 5;
    } else if (selectedDifficulty === "Difícil") {
      numberOfPictograms = 7;
    }

    const shuffledPictograms = shuffleArray(pictogramsData).slice(0, numberOfPictograms);
    setCurrentPictograms(shuffledPictograms);
    getRandomPictogram(shuffledPictograms);
  };

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  const getRandomPictogram = (pictograms) => {
    if (pictograms.length > 0) {
      const randomIndex = Math.floor(Math.random() * pictograms.length);
      const randomPictogram = pictograms[randomIndex];
      setCurrentPictogram(randomPictogram);
    } else {
      setCurrentPictogram(null);
    }
  };

  const handleMouseOver = (textToSpeak) => {
    if (synthesis) {
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      synthesis.speak(utterance);
    }
  };

  const checkAnswer = (imageName) => {
    if (currentPictogram && currentPictogram.name === imageName) {
      alert("¡Muy bien!");

      // Elimina el pictograma correcto de la lista
      const updatedPictograms = currentPictograms.filter(pictogram => pictogram.name !== imageName);
      setCurrentPictograms(updatedPictograms);

      if (updatedPictograms.length > 0) {
        // Si quedan pictogramas, selecciona uno nuevo
        getRandomPictogram(updatedPictograms);
      } else {
        // Si no quedan pictogramas, has completado el juego
        alert("¡Has completado el juego!");
        setDifficulty("Fácil"); // Reinicia el juego con la dificultad "Fácil" (puedes ajustar esto)
        getRandomPictograms("Fácil");
      }
    } else {
      alert("Incorrecto. Intenta de nuevo.");
    }
  };

  return (
    <div className="App">
      <h1>Juego de Reconocimiento</h1>
      <div>
        <label>
          Selecciona la dificultad:
          <select onChange={(e) => setDifficulty(e.target.value)}>
            <option value="Fácil">Fácil</option>
            <option value="Normal">Normal</option>
            <option value="Difícil">Difícil</option>
          </select>
        </label>
      </div>
      {currentPictogram && (
        <div>
          <h2>¿Qué pictograma representa esta palabra?</h2>
          <img
            src={answersData.find(item => item.name === currentPictogram.name)?.url}
            alt={currentPictogram.name}
            onMouseOver={() => handleMouseOver(currentPictogram.name)}
            onClick={() => checkAnswer(currentPictogram.name)}
          />
          <div className="images">
            {currentPictograms.map((pictogram) => (
              <img
                key={pictogram.name}
                src={pictogram.url}
                alt={pictogram.name}
                onMouseOver={() => handleMouseOver(pictogram.name)}
                onClick={() => checkAnswer(pictogram.name)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
