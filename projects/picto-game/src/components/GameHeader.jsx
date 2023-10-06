import React from "react";
import "./GameHeader.css"; // Asegúrate de que tu archivo CSS esté importado aquí

function GameHeader({ lives, points, badges }) {
  // Define los iconos de texto para vidas, puntos e insignias
  const livesIcon = "❤️".repeat(lives);
  const pointsIcon = "🌟".repeat(points);
  const badgesIcon = "🧁".repeat(badges);

  return (
    <div className="game-info">
      <div className="game-stats">
        <div className="stat">
          <span className="stat-label">Vidas: </span>
          <span className="stat-value">{livesIcon}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Puntos: </span>
          <span className="stat-value">{pointsIcon}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Insignias: </span>
          <span className="stat-value">{badgesIcon}</span>
        </div>
      </div>
    </div>
  );
}

export default GameHeader;
