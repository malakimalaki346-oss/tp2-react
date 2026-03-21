import React, { useState } from 'react';

function Exercice1_AffichageDynamique() {
  // État pour suivre le nombre de clics et le texte affiché
  const [nombreClics, setNombreClics] = useState(0);
  const [texteAffiche, setTexteAffiche] = useState('Appuyez sur le bouton pour découvrir le message');

  // Messages originaux inspirés de la culture marocaine
  const messages = [
    "🌞 Salam! Premier appui - Bienvenue dans votre TP!",
    "🍵 Deuxième appui - Comme un bon thé à la menthe!",
    "🏔️ Troisième appui - L'Atlas vous salue!",
    "🌊 Quatrième appui - Comme les vagues de Tanger!",
    "🏰 Cinquième appui - La magie de Fès vous accompagne!",
    "🌴 Sixième appui - Palmiers et soleil d'Agadir!",
    "🎨 Septième appui - L'artisanat marocain vous inspire!",
    "🐪 Huitième appui - La caravane du savoir avance!",
    "⭐ Neuvième appui - L'étoile de Ouarzazate brille!",
    "🎉 Dixième appui - Félicitations! Vous maîtrisez React!"
  ];

  // Messages supplémentaires pour au-delà de 10 clics
  const messagesSpeciaux = [
    "🌟 Incroyable! Vous êtes un expert React!",
    "🚀 Votre code s'envole comme un avion de la RAM!",
    "💎 Vous êtes un diamant de la programmation!",
    "🎯 Objectif atteint avec brio!",
    "🏆 Champion du clic React!"
  ];

  const handleClick = () => {
    const nouveauNombre = nombreClics + 1;
    setNombreClics(nouveauNombre);
    
    if (nouveauNombre <= messages.length) {
      setTexteAffiche(messages[nouveauNombre - 1]);
    } else {
      const indexSpecial = (nouveauNombre - messages.length - 1) % messagesSpeciaux.length;
      setTexteAffiche(`✨ ${messagesSpeciaux[indexSpecial]} (${nouveauNombre}ème appui) ✨`);
    }
  };

  const reinitialiser = () => {
    setNombreClics(0);
    setTexteAffiche("Appuyez sur le bouton pour découvrir le message");
  };

  return (
    <div className="exercice-card exercice1">
      <h2>📝 Exercice 1 : Messages Dynamiques</h2>
      <p className="sous-titre">Chaque clic révèle un nouveau message inspirant</p>
      
      <div className="zone-affichage">
        <div className="texte-dynamique">
          {texteAffiche}
        </div>
        
        <div className="stat-clics">
          <span className="label">Nombre d'appuis :</span>
          <span className="valeur">{nombreClics}</span>
        </div>
        
        <div className="groupe-boutons">
          <button onClick={handleClick} className="btn-principal">
            🖱️ Découvrir un message
          </button>
          <button onClick={reinitialiser} className="btn-secondaire">
            🔄 Recommencer
          </button>
        </div>
      </div>
      
      <div className="explication">
        <h3>💡 Fonctionnement :</h3>
        <ul>
          <li>✅ <strong>useState</strong> : Stocke le nombre d'appuis et le message actuel</li>
          <li>✅ <strong>onClick</strong> : Déclenche le changement de message à chaque appui</li>
          <li>✅ <strong>Messages variés</strong> : 10 messages différents puis des messages spéciaux</li>
          <li>✅ <strong>Réinitialisation</strong> : Remet le compteur à zéro</li>
        </ul>
      </div>
    </div>
  );
}

export default Exercice1_AffichageDynamique;