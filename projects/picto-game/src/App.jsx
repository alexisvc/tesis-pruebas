import React, { useState, useEffect } from "react";
import "./App.css";
import GameHeader from "./components/GameHeader";
import PictogramQuestion from "./components/PictogramQuestion";
import PictogramOptions from "./components/PictogramOptions";
import confetti from "canvas-confetti";

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

function App() {
  const [currentPictograms, setCurrentPictograms] = useState([]);
  const [currentPictogram, setCurrentPictogram] = useState(null);
  const [difficulty, setDifficulty] = useState("Fácil");
  const [synthesis, setSynthesis] = useState(null);
  const [lives, setLives] = useState(5);
  const [points, setPoints] = useState(0);
  const [badges, setBadges] = useState(0);

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
      // Configura la velocidad de lectura más lenta (0.7 es un valor de ejemplo, puedes ajustarlo)
      utterance.rate = 0.5;
      synthesis.speak(utterance);
    }
  };

  const checkAnswer = (imageName) => {
    if (currentPictogram && currentPictogram.name === imageName) {
      confetti(); // Dispara los confettis
      //alert("¡Muy bien!");

      // Aumentar los puntos en 1
      setPoints(points + 1);

      // Agregar una insignia si es necesario
      if (points + 1 >= 5 && (points + 1) % 5 === 0) {
        setBadges(badges + 1);
      }

      // Elimina el pictograma correcto de la lista
      const updatedPictograms = currentPictograms.filter(pictogram => pictogram.name !== imageName);
      setCurrentPictograms(updatedPictograms);

      if (updatedPictograms.length > 0) {
        // Si quedan pictogramas, selecciona uno nuevo
        getRandomPictogram(updatedPictograms);
      } else {
        // Si no quedan pictogramas, has completado el juego
        alert("¡Has completado el juego!");

        // Aumentar las insignias al completar el juego
        setBadges(badges + 1);

        setDifficulty("Fácil"); // Reinicia el juego con la dificultad "Fácil" (puedes ajustar esto)
        getRandomPictograms("Fácil");
      }
    } else {
      alert("Incorrecto. Intenta de nuevo.");

      // Disminuir una vida
      setLives(lives - 1);

      // Comprobar si se han agotado todas las vidas
      if (lives - 1 === 0) {
        alert("¡Has perdido todas tus vidas!");
        // Puedes agregar aquí lógica para reiniciar el juego si lo deseas
      }
    }
  };

  return (
    <div className="App">
      <h1 className="game-title">Juego de Reconocimiento</h1>

      {/* Selección de dificultad */}
      <div className="difficulty-selector">
        <label htmlFor="difficulty">Dificultad:</label>
        <select
          id="difficulty"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="Fácil">Fácil</option>
          <option value="Normal">Normal</option>
          <option value="Difícil">Difícil</option>
        </select>
      </div>

      <GameHeader lives={lives} points={points} badges={badges} />
      <PictogramQuestion
        currentPictogram={currentPictogram}
        handleMouseOver={handleMouseOver}
        checkAnswer={checkAnswer}
      />
      <PictogramOptions
        currentPictograms={currentPictograms}
        handleMouseOver={handleMouseOver}
        checkAnswer={checkAnswer}
      />
    </div>
  );
}

export default App;