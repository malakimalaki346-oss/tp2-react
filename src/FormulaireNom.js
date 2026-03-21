import React, { useState } from 'react';

function FormulaireNom() {
  // État pour les données du formulaire
  const [etudiant, setEtudiant] = useState({
    nom: '',
    prenom: '',
    email: '',
    filiere: 'informatique',
    niveau: 'L3'
  });
  
  const [erreurs, setErreurs] = useState({});
  const [soumissionReussie, setSoumissionReussie] = useState(false);
  const [donneesEnvoyees, setDonneesEnvoyees] = useState(null);

  // Gestionnaire onChange - formulaire contrôlé
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Mettre à jour l'état
    setEtudiant({
      ...etudiant,
      [name]: value
    });
    
    // Effacer l'erreur pour ce champ si elle existe
    if (erreurs[name]) {
      setErreurs({
        ...erreurs,
        [name]: ''
      });
    }
  };

  // Validation du formulaire
  const validerFormulaire = () => {
    const nouvellesErreurs = {};
    
    if (!etudiant.nom.trim()) {
      nouvellesErreurs.nom = 'Le nom est requis';
    } else if (etudiant.nom.length < 2) {
      nouvellesErreurs.nom = 'Le nom doit contenir au moins 2 caractères';
    }
    
    if (!etudiant.prenom.trim()) {
      nouvellesErreurs.prenom = 'Le prénom est requis';
    } else if (etudiant.prenom.length < 2) {
      nouvellesErreurs.prenom = 'Le prénom doit contenir au moins 2 caractères';
    }
    
    if (!etudiant.email.trim()) {
      nouvellesErreurs.email = "L'email est requis";
    } else if (!etudiant.email.includes('@')) {
      nouvellesErreurs.email = "L'email doit contenir @";
    } else if (!etudiant.email.includes('.')) {
      nouvellesErreurs.email = "L'email doit contenir un domaine valide";
    }
    
    setErreurs(nouvellesErreurs);
    return Object.keys(nouvellesErreurs).length === 0;
  };

  // Gestionnaire onSubmit
  const handleSubmit = (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    
    if (validerFormulaire()) {
      // Envoyer les données
      setDonneesEnvoyees({ ...etudiant });
      setSoumissionReussie(true);
      
      // Réinitialiser le formulaire après 3 secondes (optionnel)
      setTimeout(() => {
        setSoumissionReussie(false);
      }, 5000);
    }
  };

  const reinitialiserFormulaire = () => {
    setEtudiant({
      nom: '',
      prenom: '',
      email: '',
      filiere: 'informatique',
      niveau: 'L3'
    });
    setErreurs({});
    setSoumissionReussie(false);
    setDonneesEnvoyees(null);
  };

  return (
    <div className="formulaire-card">
      <h2>📝 Formulaire d'inscription</h2>
      <p className="sous-titre">Remplissez vos informations (formulaire contrôlé)</p>
      
      {soumissionReussie && donneesEnvoyees && (
        <div className="alerte-succes">
          <strong>✅ Inscription réussie !</strong>
          <p>Bienvenue {donneesEnvoyees.prenom} {donneesEnvoyees.nom} !</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="groupe-form">
          <label htmlFor="nom">Nom :</label>
          <input
            type="text"
            id="nom"
            name="nom"
            value={etudiant.nom}
            onChange={handleChange}
            placeholder="Votre nom"
            className={erreurs.nom ? 'erreur' : ''}
          />
          {erreurs.nom && <span className="message-erreur">{erreurs.nom}</span>}
        </div>
        
        <div className="groupe-form">
          <label htmlFor="prenom">Prénom :</label>
          <input
            type="text"
            id="prenom"
            name="prenom"
            value={etudiant.prenom}
            onChange={handleChange}
            placeholder="Votre prénom"
            className={erreurs.prenom ? 'erreur' : ''}
          />
          {erreurs.prenom && <span className="message-erreur">{erreurs.prenom}</span>}
        </div>
        
        <div className="groupe-form">
          <label htmlFor="email">Email :</label>
          <input
            type="email"
            id="email"
            name="email"
            value={etudiant.email}
            onChange={handleChange}
            placeholder="malak@email.com"
            className={erreurs.email ? 'erreur' : ''}
          />
          {erreurs.email && <span className="message-erreur">{erreurs.email}</span>}
        </div>
        
        <div className="groupe-form">
          <label htmlFor="filiere">Filière :</label>
          <select
            id="filiere"
            name="filiere"
            value={etudiant.filiere}
            onChange={handleChange}
          >
            <option value="informatique">💻 Informatique</option>
            <option value="genie-civil">🏗️ Génie Civil</option>
            <option value="genie-electrique">⚡ Génie Électrique</option>
            <option value="mathematiques">📐 Mathématiques</option>
          </select>
        </div>
        
        <div className="groupe-form">
          <label>Niveau d'étude :</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="niveau"
                value="L1"
                checked={etudiant.niveau === 'L1'}
                onChange={handleChange}
              />
              Licence 1
            </label>
            <label>
              <input
                type="radio"
                name="niveau"
                value="L2"
                checked={etudiant.niveau === 'L2'}
                onChange={handleChange}
              />
              Licence 2
            </label>
            <label>
              <input
                type="radio"
                name="niveau"
                value="L3"
                checked={etudiant.niveau === 'L3'}
                onChange={handleChange}
              />
              Licence 3
            </label>
            <label>
              <input
                type="radio"
                name="niveau"
                value="M1"
                checked={etudiant.niveau === 'M1'}
                onChange={handleChange}
              />
              Master 1
            </label>
          </div>
        </div>
        
        <div className="actions-form">
          <button type="submit" className="btn-submit">
            ✅ S'inscrire
          </button>
          <button 
            type="button" 
            onClick={reinitialiserFormulaire}
            className="btn-reset"
          >
            🔄 Réinitialiser
          </button>
        </div>
      </form>
      
      {donneesEnvoyees && (
        <div className="apercu-donnees">
          <h3>📋 Aperçu des données envoyées :</h3>
          <div className="carte-info">
            <p><strong>Nom complet :</strong> {donneesEnvoyees.prenom} {donneesEnvoyees.nom}</p>
            <p><strong>Email :</strong> {donneesEnvoyees.email}</p>
            <p><strong>Filière :</strong> {donneesEnvoyees.filiere}</p>
            <p><strong>Niveau :</strong> {donneesEnvoyees.niveau}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default FormulaireNom;