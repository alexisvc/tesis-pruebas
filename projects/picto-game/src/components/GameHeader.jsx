import React from "react";
import "./GameHeader.css"; // Importa el archivo CSS aquí

function GameHeader({ lives, points, badges }) {
  return (
    <div className="game-info">
      <div className="game-stats">
        <div className="stat">
          <span className="stat-label">Vidas:</span>
          <span className="stat-value">{lives}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Puntos:</span>
          <span className="stat-value">{points}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Insignias:</span>
          <span className="stat-value">{badges}</span>
        </div>
      </div>
    </div>
  );
}

export default GameHeader;
