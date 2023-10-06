import React from "react";

const answersData = [
    { name: 'Yo', url: 'src/assets/pictogramas-transparentes/pronombres/yo.png' }, 
    { name: 'Tú', url: 'src/assets/pictogramas-transparentes/pronombres/tú.png' }, 
    { name: 'Él', url: 'src/assets/pictogramas-transparentes/pronombres/él.png' }, 
    { name: 'Nosotros', url: 'src/assets/pictogramas-transparentes/pronombres/nosotros.png' },
    { name: 'Ellos', url: 'src/assets/pictogramas-transparentes/pronombres/ellos.png' }, 
    { name: 'Querer', url: 'src/assets/pictogramas-transparentes/acciones/querer.png' }, 
    { name: 'Correr', url: 'src/assets/pictogramas-transparentes/acciones/correr.png' }, 
    { name: 'Comer', url: 'src/assets/pictogramas-transparentes/acciones/comer.png' },
    { name: 'Necesitar', url: 'src/assets/pictogramas-transparentes/acciones/necesitar.png' },
  ];

function PictogramQuestion({ currentPictogram, handleMouseOver }) {
  return (
    currentPictogram && (
      <div>
        <h2>¿Qué pictograma representa esta palabra?</h2>
        <img
          src={answersData.find(item => item.name === currentPictogram.name)?.url}
          alt={currentPictogram.name}
        />
        <div>
            <button onClick={() => handleMouseOver(currentPictogram.name)}>🔊</button>
        </div>
      </div>
    )
  );
}

export default PictogramQuestion;
