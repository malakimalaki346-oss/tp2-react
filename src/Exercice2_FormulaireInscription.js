import React, { useState } from 'react';

function Exercice2_FormulaireInscription() {
  // État pour les champs du formulaire
  const [formData, setFormData] = useState({
    prenom: '',
    email: ''
  });
  
  // État pour les erreurs de validation
  const [erreurs, setErreurs] = useState({
    prenom: '',
    email: ''
  });
  
  // État pour l'historique des inscriptions
  const [historique, setHistorique] = useState([]);
  const [derniereInscription, setDerniereInscription] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    if (erreurs[name]) {
      setErreurs({
        ...erreurs,
        [name]: ''
      });
    }
  };

  const validerFormulaire = () => {
    const nouvellesErreurs = {};
    let formulaireValide = true;
    
    // Validation du prénom avec des règles spécifiques
    if (!formData.prenom.trim()) {
      nouvellesErreurs.prenom = 'Veuillez entrer votre prénom';
      formulaireValide = false;
    } else if (formData.prenom.length < 3) {
      nouvellesErreurs.prenom = 'Le prénom doit contenir au moins 3 caractères';
      formulaireValide = false;
    } else if (formData.prenom.length > 20) {
      nouvellesErreurs.prenom = 'Le prénom ne peut pas dépasser 20 caractères';
      formulaireValide = false;
    } else if (!/^[a-zA-ZÀ-ÿ\s-]+$/.test(formData.prenom)) {
      nouvellesErreurs.prenom = 'Utilisez uniquement des lettres et des tirets';
      formulaireValide = false;
    }
    
    // Validation de l'email avec des règles spécifiques
    if (!formData.email.trim()) {
      nouvellesErreurs.email = "L'adresse email est obligatoire";
      formulaireValide = false;
    } else if (!formData.email.includes('@')) {
      nouvellesErreurs.email = "Le symbole @ est manquant";
      formulaireValide = false;
    } else if (formData.email.split('@')[0].length < 3) {
      nouvellesErreurs.email = "La partie locale de l'email est trop courte";
      formulaireValide = false;
    } else if (!formData.email.includes('.') || formData.email.indexOf('.') === formData.email.length - 1) {
      nouvellesErreurs.email = "Domaine email invalide (ex: .com, .fr, .ma)";
      formulaireValide = false;
    }
    
    setErreurs(nouvellesErreurs);
    return formulaireValide;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validerFormulaire()) {
      const messageAlerte = `✅ Félicitations ${formData.prenom} !\n\n📧 Email enregistré : ${formData.email}\n\n📅 Date d'inscription : ${new Date().toLocaleString()}\n\nMerci de vous être inscrit(e) !`;
      
      alert(messageAlerte);
      
      const nouvelleInscription = {
        id: Date.now(),
        prenom: formData.prenom,
        email: formData.email,
        date: new Date().toLocaleString()
      };
      
      setHistorique([nouvelleInscription, ...historique].slice(0, 15));
      setDerniereInscription(nouvelleInscription);
      
      setFormData({
        prenom: '',
        email: ''
      });
    } else {
      alert('❌ Merci de corriger les erreurs dans le formulaire');
    }
  };

  const effacerHistorique = () => {
    setHistorique([]);
    setDerniereInscription(null);
    alert('🗑️ L\'historique a été effacé');
  };

  return (
    <div className="exercice-card exercice2">
      <h2>📝 Exercice 2 : Formulaire d'Enregistrement</h2>
      <p className="sous-titre">Saisissez vos coordonnées pour recevoir les alertes</p>
      
      <form onSubmit={handleSubmit} className="formulaire-inscription">
        <div className="groupe-form">
          <label htmlFor="prenom">Prénom complet :</label>
          <input
            type="text"
            id="prenom"
            name="prenom"
            value={formData.prenom}
            onChange={handleChange}
            placeholder="Ex: Mohammed, Fatima, Amine..."
            className={erreurs.prenom ? 'erreur' : ''}
          />
          {erreurs.prenom && <span className="message-erreur">{erreurs.prenom}</span>}
        </div>
        
        <div className="groupe-form">
          <label htmlFor="email">Adresse email :</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="exemple@domaine.ma"
            className={erreurs.email ? 'erreur' : ''}
          />
          {erreurs.email && <span className="message-erreur">{erreurs.email}</span>}
        </div>
        
        <div className="actions-form">
          <button type="submit" className="btn-inscrire">
            ✨ Valider l'inscription
          </button>
          <button 
            type="button" 
            onClick={() => {
              setFormData({ prenom: '', email: '' });
              setErreurs({ prenom: '', email: '' });
            }}
            className="btn-effacer"
          >
            🗑️ Vider les champs
          </button>
        </div>
      </form>
      
      {derniereInscription && (
        <div className="derniere-inscription">
          <h3>🆕 Dernier enregistrement :</h3>
          <div className="carte-inscription">
            <p><strong>👤 Participant :</strong> {derniereInscription.prenom}</p>
            <p><strong>📧 Contact :</strong> {derniereInscription.email}</p>
            <p><strong>⏰ Horodatage :</strong> {derniereInscription.date}</p>
          </div>
        </div>
      )}
      
      {historique.length > 0 && (
        <div className="historique-inscriptions">
          <div className="historique-header">
            <h3>📜 Liste des inscriptions ({historique.length})</h3>
            <button onClick={effacerHistorique} className="btn-effacer-historique">
              🗑️ Supprimer l'historique
            </button>
          </div>
          <ul className="liste-inscriptions">
            {historique.map(inscription => (
              <li key={inscription.id} className="item-inscription">
                <span className="prenom">{inscription.prenom}</span>
                <span className="email">{inscription.email}</span>
                <span className="date">{inscription.date}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      <div className="explication">
        <h3>💡 Fonctionnement :</h3>
        <ul>
          <li>✅ <strong>useState</strong> : Gère les valeurs du formulaire</li>
          <li>✅ <strong>onChange</strong> : Met à jour en temps réel (formulaire contrôlé)</li>
          <li>✅ <strong>onSubmit</strong> : Valide et affiche l'alerte de confirmation</li>
          <li>✅ <strong>Validation</strong> : Contrôle la longueur et le format des champs</li>
          <li>✅ <strong>alert()</strong> : Affiche un récapitulatif des données saisies</li>
        </ul>
      </div>
    </div>
  );
}

export default Exercice2_FormulaireInscription;