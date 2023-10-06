import React from "react";

function PictogramOptions({ currentPictograms, handleMouseOver, checkAnswer }) {
  return (
    <div className="images">
      {currentPictograms.map((pictogram) => (
        <div key={pictogram.name}>
          <img src={pictogram.url} alt={pictogram.name} onClick={() => checkAnswer(pictogram.name)}/>
          <div>
            <button onClick={() => handleMouseOver(pictogram.name)}>🔊</button>  
            {/*<button onClick={() => checkAnswer(pictogram.name)}>✔️</button>*/}
          </div>
        </div>
      ))}
    </div>
  );
}

export default PictogramOptions;
