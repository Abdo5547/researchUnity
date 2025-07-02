import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";


const PublicationDetail = () => {
  const [publication, setPublication] = useState([]);
 // Initialisez avec les données


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Aucun token trouvé. Veuillez vous connecter.");
      return;
    }
    fetch("http://127.0.0.1:8000/api/listpub/", {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des données");
        }
        return response.json();
      })
      .then((data) =>  setPublication(data))
      .catch((error) => {
        console.error("Erreur lors de la récupération des données :", error);
      });
  }, []);


  const { id } = useParams();

  const publicationId = parseInt(id, 10);

  const publicationdetail = publication.find(pub => pub.id === publicationId);
  console.log(publicationdetail)


  // Affichage des détails de la publication
  return (
    <div style={{marginTop:"100px"}}>
      
      <h1>{publicationdetail.title}</h1>
      <h1>{publicationdetail.type}</h1>
      <h1>{publicationdetail.mainAuteur.first_name}</h1>


    
    </div>
  );
};

export default PublicationDetail;
