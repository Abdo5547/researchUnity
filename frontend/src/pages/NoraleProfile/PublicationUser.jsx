import React, { useState, useEffect } from "react";
import AffPublicationUser from "./AffPublicationUser";
import { useLocation } from "react-router-dom";

const ProfilePublication = () => {
  const location = useLocation();
  const storedUserId = localStorage.getItem("userId");
  const nvid = storedUserId;
  console.log(nvid);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Ajout de l'état pour le chargement

  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Aucun token trouvé. Veuillez vous connecter.");
      return;
    }
    fetch(`http://127.0.0.1:8000/api/profileuser/?user_id=${nvid}`, {
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
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données :", error);
      });
  }, []);

  const pub=users.publications

  return (
    <div style={{ marginTop: "-470px" , marginLeft:"100px"}}>
      {/* Affichage de l'indicateur de chargement si les données sont en cours de chargement */}
      {loading && <p>Chargement en cours...</p>}
      {!loading &&
        users.publications&&
        users.publications.map((publication, index) => (
          <AffPublicationUser key={index} donner={publication} />
        ))}
    </div>
  );
};

export default ProfilePublication;
