import React, { useState, useEffect } from 'react';

function CompteurEffet() {
  const [compteur, setCompteur] = useState(0);
  const [estActif, setEstActif] = useState(false);
  const [message, setMessage] = useState('');
  const [secondes, setSecondes] = useState(0);

  // useEffect 1 : S'exécute à chaque fois que compteur change
  useEffect(() => {
    if (compteur > 0) {
      setMessage(`Le compteur a changé : ${compteur}`);
    }
    
    // Timer pour effacer le message après 2 secondes
    const timer = setTimeout(() => {
      setMessage('');
    }, 2000);
    
    // Cleanup function
    return () => clearTimeout(timer);
  }, [compteur]); // Dépendance : compteur

  // useEffect 2 : Timer qui s'incrémente chaque seconde si actif
  useEffect(() => {
    let intervalId;
    
    if (estActif) {
      intervalId = setInterval(() => {
        setSecondes(prev => prev + 1);
      }, 1000);
    }
    
    // Cleanup pour arrêter l'intervalle
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [estActif]); // Dépendance : estActif

  // useEffect 3 : S'exécute une seule fois au montage
  useEffect(() => {
    console.log('Composant CompteurEffet monté');
    
    // Message de bienvenue
    setMessage('Bienvenue ! Le compteur avec effet est prêt');
    
    // Cleanup au démontage
    return () => {
      console.log('Composant CompteurEffet démonté');
    };
  }, []); // Dépendance vide - une seule fois

  const demarrerCompteur = () => {
    setEstActif(true);
    setMessage('⏱️ Compteur démarré !');
  };

  const arreterCompteur = () => {
    setEstActif(false);
    setMessage('⏸️ Compteur arrêté');
  };

  const reinitialiserTout = () => {
    setCompteur(0);
    setSecondes(0);
    setEstActif(false);
    setMessage('🔄 Tout a été réinitialisé');
  };

  return (
    <div className="compteur-effet-card">
      <h2>⏰ Compteur avec useEffect</h2>
      
      {message && (
        <div className="message-flottant">
          {message}
        </div>
      )}
      
      <div className="deux-colonnes">
        <div className="colonne">
          <h3>Compteur manuel</h3>
          <div className="valeur-compteur large">
            <span className="nombre">{compteur}</span>
          </div>
          <div className="groupe-boutons">
            <button onClick={() => setCompteur(compteur - 1)} className="btn">-1</button>
            <button onClick={() => setCompteur(0)} className="btn secondaire">0</button>
            <button onClick={() => setCompteur(compteur + 1)} className="btn">+1</button>
          </div>
        </div>
        
        <div className="colonne">
          <h3>Chronomètre automatique</h3>
          <div className="valeur-compteur large">
            <span className="nombre">{secondes}</span>
            <span className="unite">secondes</span>
          </div>
          <div className="groupe-boutons">
            {!estActif ? (
              <button onClick={demarrerCompteur} className="btn succes">
                ▶️ Démarrer
              </button>
            ) : (
              <button onClick={arreterCompteur} className="btn danger">
                ⏸️ Arrêter
              </button>
            )}
          </div>
        </div>
      </div>
      
      <div className="info-effet">
        <h3>💡 useEffect en action :</h3>
        <ul>
          <li>✓ Le message apparaît quand le compteur change</li>
          <li>✓ Le chronomètre utilise setInterval avec cleanup</li>
          <li>✓ Le message de bienvenue s'affiche au montage</li>
        </ul>
      </div>
      
      <button onClick={reinitialiserTout} className="btn secondaire plein">
        🔄 Réinitialiser tout
      </button>
    </div>
  );
}

export default CompteurEffet;