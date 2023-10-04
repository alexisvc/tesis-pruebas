import React from "react";

function PictogramOptions({ currentPictograms, handleMouseOver, checkAnswer }) {
  return (
    <div className="images">
      {currentPictograms.map((pictogram) => (
        <div key={pictogram.name}>
          <img src={pictogram.url} alt={pictogram.name} />
          <div>
            <button onClick={() => handleMouseOver(pictogram.name)}>Leer</button>
            <button onClick={() => checkAnswer(pictogram.name)}>Responder</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PictogramOptions;