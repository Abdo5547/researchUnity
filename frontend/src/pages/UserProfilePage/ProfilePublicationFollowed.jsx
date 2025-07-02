import React, { useState, useEffect } from 'react';
import AfficherPub from './AfficherPub';
import Homeee from '../Publication/Homeee';

const ProfilePublicationFollowed = () => {
    const [data, setData] = useState([]); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("Aucun token trouvé. Veuillez vous connecter.");
            return;
        }
        fetch("http://127.0.0.1:8000/api/userlistfollowed/", {
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
            const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));
            setData(sortedData);
            setLoading(false);
        })
        .catch((error) => {
            console.error("Erreur lors de la récupération des données :", error);
            setLoading(false);
        });
    }, []);

    return (
        <div style={{ marginTop:"-250px", marginLeft:"100px"}}>
            {loading && <p>Chargement en cours...</p>}

            {!loading && (!data || data.length === 0) && <p style={{marginLeft:"200px",marginTop:"80px"}}>No followed publications</p>}

            {!loading && data && data.map((publication, index) => (
                <Homeee key={index} donner={publication}  />
            ))}
        </div>
    );
}

export default ProfilePublicationFollowed;
