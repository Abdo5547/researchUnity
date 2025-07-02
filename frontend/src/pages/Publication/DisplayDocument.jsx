import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const DisplayDocument = () => {
  const { id } = useParams();
  const documentId = parseInt(id);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true); // État pour le chargement
  const [downloaded, setDownloaded] = useState(false); // État pour suivre le téléchargement
  const [downloading, setDownloading] = useState(false); // État pour suivre si le téléchargement est en cours

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || downloaded || downloading) { // Vérifie si le téléchargement est déjà en cours ou terminé
      setLoading(false); // Si oui, arrêtez le chargement
      return;
    }

    setDownloading(true); // Met à jour l'état pour indiquer que le téléchargement est en cours

    // Requête pour télécharger le document PDF
    axios({
      url: `http://127.0.0.1:8000/api/publications/${documentId}/download/`,
      method: 'GET',
      responseType: 'arraybuffer',  // Indique que la réponse est un tableau d'octets (pour un fichier PDF)
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then((response) => {
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
      setDownloaded(true); // Met à jour l'état pour indiquer que le téléchargement est terminé
    })
    .catch((error) => {
      console.error("Erreur lors du téléchargement du document :", error);
    })
    .finally(() => {
      setDownloading(false); // Met à jour l'état pour indiquer que le téléchargement est terminé
      setLoading(false); // Mettre le chargement à false une fois que le téléchargement est terminé
    });
  }, [documentId, downloaded, downloading]);

  if (loading) {
    return <div>Loading...</div>; // Afficher l'indicateur de chargement
  }

  return navigate("/home/home"); // Pas besoin de retourner de contenu dans ce cas
};

export default DisplayDocument;
