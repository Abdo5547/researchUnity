import React, { useState, useEffect } from "react";
import "./Afficher.css";
import AppAppBar from "../../../components/AppAppBar/AppAppBar";
import Question from "./Question";
import axios from "axios";
import SetQuestion from "../Publier/SetQuestion";
import AspectRatio from "@mui/joy/AspectRatio";
import Stack from "@mui/joy/Stack";
import CardContent from "@mui/joy/CardContent";
import Skeleton from "@mui/joy/Skeleton";

import { Box, Button, Card, Grid, Typography } from "@mui/joy";
import imageMale from "../../../components/AppAppBar/profile_mal.jpg";
import imageFemale from "../../../components/AppAppBar/profile_female.png";

const QuestionInterest = () => {
  const [pub, setPub] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      console.error("Aucun token trouvé. Veuillez vous connecter.");
      return;
    }
  
    fetch("http://127.0.0.1:8000/api/listquest/", {
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
        // Sort the questions by the date field in descending order
        const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setPub(sortedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données :", error);
        setLoading(false);
      });
  }, []);

  

  const [isFollowing, setIsFollowing] = useState({});

  const handleClick = (id) => {
    setIsFollowing((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const [people, setPeople] = useState([]);
  const [follow, setFollow] = useState([]);
  const [d, setD] = useState([]);

  // Modifiez votre useEffect pour récupérer uniquement les trois premières personnes
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Aucun token trouvé. Veuillez vous connecter.");
      return;
    }
    fetch("http://127.0.0.1:8000/api/users/", {
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
        // Sélectionnez les trois premières personnes
        const firstThreePeople = data.slice(13, 16);
        setPeople(firstThreePeople);
        const firstThh = data.slice(5, 8);
        setFollow(firstThh);

        const firstThhr = data.slice(9, 12);
        setD(firstThhr);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données :", error);
      });
  }, []);

  return (
    <Box
      sx={{
        flex: 1,
        width: "100%",
        marginLeft: "-300px",
        width: "calc(120% - 14px)",
        marginTop:"-40px"
      }}>
      {/* Affichage des publications */}
      <Grid
        container
        spacing={4}
        sx={{
          maxWidth: "1200px",
          mx: "auto",
          px: { xs: 2, md: 3 },
          py: { xs: 2, md: 3 },
        }}>
        {" "}
        <Grid item xs={12} md={8}>
          {pub && pub.map((e) => (
            <Question key={e.id} donner={e} />
          ))}
        </Grid>
        
      </Grid>
    </Box>
  );
};

export default QuestionInterest;
