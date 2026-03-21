import React, { useState } from 'react';

function Compteur() {
  // Gestion de l'état local avec useState
  const [nombre, setNombre] = useState(0);
  const [historique, setHistorique] = useState([]);

  // Gestionnaires d'événements onClick
  const incrementer = () => {
    const nouveauNombre = nombre + 1;
    setNombre(nouveauNombre);
    ajouterHistorique(`+1 : ${nouveauNombre}`);
  };

  const decrementer = () => {
    const nouveauNombre = nombre - 1;
    setNombre(nouveauNombre);
    ajouterHistorique(`-1 : ${nouveauNombre}`);
  };

  const multiplier = () => {
    const nouveauNombre = nombre * 2;
    setNombre(nouveauNombre);
    ajouterHistorique(`×2 : ${nouveauNombre}`);
  };

  const reinitialiser = () => {
    setNombre(0);
    ajouterHistorique(`Réinitialisé : 0`);
  };

  const ajouterHistorique = (action) => {
    setHistorique([action, ...historique].slice(0, 5)); // Garde les 5 dernières actions
  };

  return (
    <div className="compteur-card">
      <h2>🔢 Compteur Interactif</h2>
      
      <div className="valeur-compteur">
        <span className="nombre">{nombre}</span>
      </div>
      
      <div className="groupe-boutons">
        <button onClick={decrementer} className="btn danger">-1</button>
        <button onClick={reinitialiser} className="btn secondaire">Réinitialiser</button>
        <button onClick={incrementer} className="btn succes">+1</button>
        <button onClick={multiplier} className="btn primaire">×2</button>
      </div>
      
      {historique.length > 0 && (
        <div className="historique">
          <h3>📜 Dernières actions :</h3>
          <ul>
            {historique.map((action, index) => (
              <li key={index}>{action}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Compteur;