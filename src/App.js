import React, { useState } from 'react';
import './App.css';
import Compteur from './Compteur';
import CompteurEffet from './CompteurEffet';
import FormulaireNom from './FormulaireNom';
import MessageBouton from './MessageBouton';
import Exercice1AffichageDynamique from './Exercice1_AffichageDynamique';
import Exercice2FormulaireInscription from './Exercice2_FormulaireInscription';
import Exercice3CompteurTitre from './Exercice3_CompteurTitre';

function App() {
  // État pour la navigation
  const [pageActive, setPageActive] = useState('accueil');
  
  // État partagé pour MessageBouton
  const [messageParent, setMessageParent] = useState('');

  const recevoirMessageEnfant = (message) => {
    setMessageParent(message);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🎓 TP React - Gestion d'État</h1>
        <p>useState | useEffect | Formulaires contrôlés | Flux unidirectionnel</p>
      </header>
      
      {/* Navigation avec tous les onglets */}
      <nav className="navigation">
        <button 
          className={pageActive === 'accueil' ? 'actif' : ''}
          onClick={() => setPageActive('accueil')}
        >
          🏠 Accueil
        </button>
        <button 
          className={pageActive === 'compteur' ? 'actif' : ''}
          onClick={() => setPageActive('compteur')}
        >
          🔢 Compteur
        </button>
        <button 
          className={pageActive === 'compteurEffet' ? 'actif' : ''}
          onClick={() => setPageActive('compteurEffet')}
        >
          ⏰ Compteur avec Effet
        </button>
        <button 
          className={pageActive === 'formulaire' ? 'actif' : ''}
          onClick={() => setPageActive('formulaire')}
        >
          📝 Formulaire
        </button>
        <button 
          className={pageActive === 'message' ? 'actif' : ''}
          onClick={() => setPageActive('message')}
        >
          💬 Message
        </button>
        <button 
          className={pageActive === 'exo1' ? 'actif' : ''}
          onClick={() => setPageActive('exo1')}
        >
          ✨ Exo 1
        </button>
        <button 
          className={pageActive === 'exo2' ? 'actif' : ''}
          onClick={() => setPageActive('exo2')}
        >
          📋 Exo 2
        </button>
        <button 
          className={pageActive === 'exo3' ? 'actif' : ''}
          onClick={() => setPageActive('exo3')}
        >
          🎯 Exo 3
        </button>
      </nav>
      
      <main className="main-content">
        {/* Page d'accueil */}
        {pageActive === 'accueil' && (
          <div className="accueil">
            <h2>Bienvenue dans le TP React</h2>
            <p>Choisissez un exercice dans le menu ci-dessus</p>
            <div className="exercices-liste">
              <h3>📚 Exercices disponibles :</h3>
              <ul>
                <li>✅ Compteur simple - useState et onClick</li>
                <li>✅ Compteur avec useEffect - Gestion des effets</li>
                <li>✅ Formulaire contrôlé - onChange et onSubmit</li>
                <li>✅ Communication parent-enfant - Flux unidirectionnel</li>
                <li>✅ <strong>Exercice 1</strong> - Affichage dynamique (texte qui change à chaque clic)</li>
                <li>✅ <strong>Exercice 2</strong> - Formulaire d'inscription (prénom + email avec alerte)</li>
                <li>✅ <strong>Exercice 3</strong> - Compteur avec titre dynamique (useEffect + document.title)</li>
              </ul>
            </div>
          </div>
        )}
        
        {/* Composants principaux */}
        {pageActive === 'compteur' && <Compteur />}
        {pageActive === 'compteurEffet' && <CompteurEffet />}
        {pageActive === 'formulaire' && <FormulaireNom />}
        {pageActive === 'message' && (
          <MessageBouton 
            messageParent={messageParent}
            onEnvoyerMessage={recevoirMessageEnfant}
          />
        )}
        
        {/* Exercices pratiques */}
        {pageActive === 'exo1' && <Exercice1AffichageDynamique />}
        {pageActive === 'exo2' && <Exercice2FormulaireInscription />}
        {pageActive === 'exo3' && <Exercice3CompteurTitre />}
      </main>
      
      <footer className="App-footer">
        <p>📊 Flux unidirectionnel : Les données descendent, les événements remontent</p>
        <p>👩‍🎓 Projet réalisé par : <strong>Malak NAIT HADDOU</strong></p>
      </footer>
    </div>
  );
}

export default App;