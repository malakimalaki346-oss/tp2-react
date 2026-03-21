import React, { useState, useEffect } from 'react';

function Exercice3_CompteurTitre() {
  const [nombreActions, setNombreActions] = useState(0);
  const [valeurIncrement, setValeurIncrement] = useState(1);
  const [traceOperations, setTraceOperations] = useState([]);
  const [themeActuel, setThemeActuel] = useState('default');

  // Messages personnalisés selon le nombre d'actions
  const obtenirMessageSelonActions = (actions) => {
    if (actions === 0) return "Prêt à commencer l'aventure React";
    if (actions < 3) return "Premiers pas prometteurs!";
    if (actions < 7) return "La courbe d'apprentissage s'envole!";
    if (actions < 12) return "Vous maîtrisez les fondamentaux!";
    if (actions < 20) return "Expert en développement React!";
    if (actions < 35) return "Architecte d'applications web!";
    if (actions < 50) return "Gourou du code moderne!";
    return "Légende vivante du développement! 🏆";
  };

  // Définir un thème visuel basé sur le nombre d'actions
  const definirTheme = (actions) => {
    if (actions < 5) return 'debutant';
    if (actions < 15) return 'intermediaire';
    if (actions < 30) return 'avance';
    if (actions < 45) return 'expert';
    return 'maitre';
  };

  // Effet pour changer le titre et le thème
  useEffect(() => {
    const theme = definirTheme(nombreActions);
    setThemeActuel(theme);
    
    // Personnalisation du titre selon le contexte
    const messagesTitre = {
      debutant: `🚀 ${nombreActions} action${nombreActions > 1 ? 's' : ''} - Phase d'apprentissage`,
      intermediaire: `⚡ ${nombreActions} action${nombreActions > 1 ? 's' : ''} - Progression constante`,
      avance: `🎯 ${nombreActions} action${nombreActions > 1 ? 's' : ''} - Maîtrise avancée`,
      expert: `💎 ${nombreActions} action${nombreActions > 1 ? 's' : ''} - Excellence technique`,
      maitre: `🏆 ${nombreActions} action${nombreActions > 1 ? 's' : ''} - Légende absolue`
    };
    
    const messageSpecifique = obtenirMessageSelonActions(nombreActions);
    
    if (nombreActions === 0) {
      document.title = "TP React - Interface interactive";
    } else {
      document.title = `${messagesTitre[theme]} | ${messageSpecifique}`;
    }
    
    // Nettoyage lors du démontage
    return () => {
      if (nombreActions === 0) {
        document.title = "Application React";
      }
    };
  }, [nombreActions]);

  const executerAction = (type) => {
    let nouvelleValeur;
    let incrementUtilise = type === 'increment' ? valeurIncrement : -valeurIncrement;
    
    if (type === 'increment') {
      nouvelleValeur = nombreActions + valeurIncrement;
    } else {
      if (nombreActions - valeurIncrement >= 0) {
        nouvelleValeur = nombreActions - valeurIncrement;
      } else {
        alert("⚠️ Le compteur ne peut pas devenir négatif");
        return;
      }
    }
    
    setNombreActions(nouvelleValeur);
    
    // Enregistrement dans l'historique
    const nouvelleTrace = {
      id: Date.now(),
      valeur: nouvelleValeur,
      delta: incrementUtilise,
      timestamp: new Date().toLocaleTimeString(),
      message: incrementUtilise > 0 ? `+${incrementUtilise}` : `${incrementUtilise}`
    };
    
    setTraceOperations([nouvelleTrace, ...traceOperations].slice(0, 12));
  };

  const reinitialiserComplet = () => {
    setNombreActions(0);
    setTraceOperations([]);
    setValeurIncrement(1);
    document.title = "TP React - Prêt pour un nouveau départ";
    setTimeout(() => {
      if (nombreActions === 0) {
        document.title = "TP React - Interface interactive";
      }
    }, 2000);
  };

  const modifierIncrement = (valeur) => {
    setValeurIncrement(valeur);
  };

  // Styles dynamiques selon le thème
  const getThemeClass = () => {
    switch(themeActuel) {
      case 'debutant': return 'theme-debutant';
      case 'intermediaire': return 'theme-intermediaire';
      case 'avance': return 'theme-avance';
      case 'expert': return 'theme-expert';
      case 'maitre': return 'theme-maitre';
      default: return '';
    }
  };

  // Fonction pour obtenir le texte au pluriel
  const getPluriel = (nombre) => {
    return nombre > 1 ? 's' : '';
  };

  return (
    <div className={`exercice-card exercice3 ${getThemeClass()}`}>
      <h2>📝 Exercice 3 : Compteur Dynamique</h2>
      <p className="sous-titre">
        Les actions modifient le titre de l'onglet (regardez en haut!)
      </p>
      
      <div className="compteur-principal">
        <div className="valeur-compteur large">
          <span className="nombre">{nombreActions}</span>
          <span className="unite">action{getPluriel(nombreActions)}</span>
        </div>
        
        <div className="message-personnalise">
          {obtenirMessageSelonActions(nombreActions)}
        </div>
        
        <div className="badge-niveau">
          Niveau: <strong>{themeActuel.toUpperCase()}</strong>
        </div>
        
        <div className="controles-increment">
          <span className="label">Pas d'incrémentation :</span>
          <div className="boutons-increment">
            <button 
              onClick={() => modifierIncrement(1)}
              className={valeurIncrement === 1 ? 'actif' : ''}
            >
              Unitaire
            </button>
            <button 
              onClick={() => modifierIncrement(3)}
              className={valeurIncrement === 3 ? 'actif' : ''}
            >
              Triple
            </button>
            <button 
              onClick={() => modifierIncrement(5)}
              className={valeurIncrement === 5 ? 'actif' : ''}
            >
              Quintuple
            </button>
            <button 
              onClick={() => modifierIncrement(10)}
              className={valeurIncrement === 10 ? 'actif' : ''}
            >
              Décuple
            </button>
          </div>
        </div>
        
        <div className="groupe-boutons">
          <button onClick={() => executerAction('decrement')} className="btn-retirer">
            -{valeurIncrement}
          </button>
          <button onClick={reinitialiserComplet} className="btn-reinitialiser">
            🔄 Remise à zéro
          </button>
          <button onClick={() => executerAction('increment')} className="btn-ajouter">
            +{valeurIncrement}
          </button>
        </div>
      </div>
      
      {traceOperations.length > 0 && (
        <div className="historique-clics">
          <h3>📊 Journal des opérations (12 dernières) :</h3>
          <ul className="liste-historique">
            {traceOperations.map(entry => (
              <li key={entry.id} className={entry.delta > 0 ? 'positif' : 'negatif'}>
                <span className="action">
                  {entry.delta > 0 ? `+${entry.delta}` : `${entry.delta}`}
                </span>
                <span className="valeur">→ {entry.valeur} action{getPluriel(entry.valeur)}</span>
                <span className="temps">{entry.timestamp}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      <div className="explication">
        <h3>💡 Fonctionnement :</h3>
        <ul>
          <li>✅ <strong>useState</strong> : Gère le compteur, l'incrément et l'historique</li>
          <li>✅ <strong>useEffect</strong> : Surveille <code>nombreActions</code> pour mettre à jour le titre</li>
          <li>✅ <strong>document.title</strong> : Change dynamiquement selon le nombre d'actions</li>
          <li>✅ <strong>Thème visuel</strong> : S'adapte au niveau de progression</li>
          <li>✅ <strong>Messages contextuels</strong> : Encouragent la progression</li>
        </ul>
        <div className="info-titre">
          <h4>🎯 Observation importante :</h4>
          <p>Le titre de l'onglet du navigateur change à chaque action!</p>
          <p>💡 Conseil : Alternez entre les onglets pour voir l'effet de useEffect</p>
        </div>
      </div>
    </div>
  );
}

export default Exercice3_CompteurTitre;