import React, { useState } from 'react';

function MessageBouton({ messageParent, onEnvoyerMessage }) {
 
  const [messageLocal, setMessageLocal] = useState('');
  const [messagesEnvoyes, setMessagesEnvoyes] = useState([]);
  
 
  const etudiants = [
    { id: 1, nom: 'Nait Haddou', prenom: 'Malak', message: 'Salut ! Je suis Malak, étudiante en Licence' },
    { id: 2, nom: 'Raoui', prenom: 'Houssam', message: 'Bonjour ! Houssam, passionné de code' },
    { id: 3, nom: 'Taoui', prenom: 'Mehdi', message: 'Coucou ! Mehdi, je découvre React' },
    { id: 4, nom: 'Taki', prenom: 'Kawtar', message: 'Hey ! Kawtar, future développeuse' }
  ];

  
  const envoyerMessageAuParent = () => {
    if (messageLocal.trim()) {
      
      onEnvoyerMessage(messageLocal);
      
      
      const nouveauMessage = {
        id: Date.now(),
        texte: messageLocal,
        date: new Date().toLocaleString(),
        expediteur: 'Enfant'
      };
      
      setMessagesEnvoyes([nouveauMessage, ...messagesEnvoyes]);
      setMessageLocal('');
      
      
      const historique = localStorage.getItem('historiqueMessages');
      const historiqueArray = historique ? JSON.parse(historique) : [];
      historiqueArray.push(nouveauMessage);
      localStorage.setItem('historiqueMessages', JSON.stringify(historiqueArray));
    }
  };

  
  const envoyerMessageEtudiant = (etudiant) => {
    onEnvoyerMessage(`${etudiant.prenom} ${etudiant.nom} : ${etudiant.message}`);
    
    const nouveauMessage = {
      id: Date.now(),
      texte: etudiant.message,
      date: new Date().toLocaleString(),
      expediteur: etudiant.prenom
    };
    
    setMessagesEnvoyes([nouveauMessage, ...messagesEnvoyes]);
  };

  
  const effacerHistorique = () => {
    setMessagesEnvoyes([]);
    localStorage.removeItem('historiqueMessages');
  };

  return (
    <div className="message-card">
      <h2>💬 Communication Parent-Enfant</h2>
      <p className="sous-titre">
        Flux unidirectionnel : L'enfant envoie des messages au parent
      </p>
      
      <div className="communication-demo">
        <div className="parent-section">
          <h3>👨‍👩‍👧 Parent (App.js)</h3>
          <div className="message-parent">
            <strong>Message reçu du parent :</strong>
            <p className="message-contenu">
              {messageParent || "Aucun message reçu du parent pour l'instant"}
            </p>
          </div>
        </div>
        
        <div className="enfant-section">
          <h3>👶 Enfant (MessageBouton.js)</h3>
          
          <div className="envoyer-message">
            <input
              type="text"
              value={messageLocal}
              onChange={(e) => setMessageLocal(e.target.value)}
              placeholder="Écrivez votre message..."
              className="input-message"
            />
            <button onClick={envoyerMessageAuParent} className="btn-envoyer">
              📤 Envoyer au parent
            </button>
          </div>
          
          <div className="messages-predefinis">
            <p><strong>Messages pré-définis :</strong></p>
            <div className="liste-etudiants">
              {etudiants.map(etudiant => (
                <button
                  key={etudiant.id}
                  onClick={() => envoyerMessageEtudiant(etudiant)}
                  className="btn-etudiant"
                >
                  👤 {etudiant.prenom}
                </button>
              ))}
            </div>
          </div>
          
          <div className="historique-messages">
            <div className="historique-header">
              <h3>📜 Historique des messages envoyés</h3>
              {messagesEnvoyes.length > 0 && (
                <button onClick={effacerHistorique} className="btn-effacer">
                  🗑️ Effacer
                </button>
              )}
            </div>
            
            {messagesEnvoyes.length === 0 ? (
              <p className="aucun-message">Aucun message envoyé pour le moment</p>
            ) : (
              <ul className="liste-messages">
                {messagesEnvoyes.map(msg => (
                  <li key={msg.id} className="message-item">
                    <div className="message-header">
                      <span className="expediteur">{msg.expediteur}</span>
                      <span className="date">{msg.date}</span>
                    </div>
                    <p className="texte">{msg.texte}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
      
      <div className="explication-flux">
        <h4>🔄 Explication du flux unidirectionnel :</h4>
        <ol>
          <li>
            <strong>Données descendent :</strong> Le parent (App.js) envoie 
            <code>messageParent</code> comme prop à l'enfant
          </li>
          <li>
            <strong>Événements remontent :</strong> L'enfant appelle 
            <code>onEnvoyerMessage()</code> pour remonter les données au parent
          </li>
          <li>
            <strong>État partagé :</strong> Le parent peut modifier son état 
            et le re-descendre vers l'enfant
          </li>
        </ol>
      </div>   
    </div>
  );
}

export default MessageBouton;