import React, { useState, useEffect } from "react";
import "../Question/Afficher/Afficher.css";
import axios from "axios";
import AspectRatio from "@mui/joy/AspectRatio";
import Stack from "@mui/joy/Stack";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Skeleton from "@mui/joy/Skeleton";
import Typography from "@mui/joy/Typography";
import Box from "@mui/material/Box";
import { useLocation } from "react-router-dom";
import AfficherQues from "./AfficherQues";

const ProfileQuestions = () => {

  const location = useLocation();
  


  const [pub, setPub] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Aucun token trouvé. Veuillez vous connecter.");
      return;
    }

    fetch("http://127.0.0.1:8000/api/userlistquest/", {
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
        setPub(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données :", error);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{marginTop:'-150px'}}>
      {pub && pub.length > 0 ? (
        pub.map((e) => <AfficherQues key={e.id} donner={e} />)
      ) : (
        <p style={{marginLeft:"200px",marginTop:"80px"}}>No questions</p>
      )}
    </div>
  );
};

export default ProfileQuestions;



