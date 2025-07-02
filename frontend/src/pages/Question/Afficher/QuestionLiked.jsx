import React, { useEffect, useState } from "react";
import "./Afficher.css";
import Question from "./Question";
import axios from "axios";
import { Box, Button, Card, Grid, Typography } from "@mui/joy";
import imageMale from "../../../components/AppAppBar/profile_mal.jpg"
import imageFemale from "../../../components/AppAppBar/profile_female.png"

const QuestionLiked = () => {
  const [data, setData] = useState([]);

  const [pub, setPub] = useState([]);
  const [me, setMe] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Aucun token trouvé. Veuillez vous connecter.");
      return;
    }

    fetch("http://127.0.0.1:8000/api/me/", {
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
      .then((data) => setMe(data))
      .catch((error) => {
        console.error("Erreur lors de la récupération des données :", error);
      });
  }, []);

  useEffect(() => {
    if (me.id) {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Aucun token trouvé. Veuillez vous connecter.");
        return;
      }
      fetch(`http://127.0.0.1:8000/api/recommended/`, {
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
        .then((data) => setPub(data))
        .catch((error) => {
          console.error("Erreur lors de la récupération des données :", error);
        });
    }
  },[[me.id]]);



  const [isFollowing, setIsFollowing] = useState({});




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
  const handleClick = (id) => {
    setIsFollowing((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (


    <Box sx={{ flex: 1, width: "100%",marginLeft:"-300px",  width: "calc(120% - 14px)"}}>
      {/* Affichage des publications */}
      <Grid
        container
 
        spacing={4}
        sx={{
         
          maxWidth: "1200px",
          mx: "auto",
          px: { xs: 2, md: 2 },
          py: { xs: 2, md: 3 },
        }}>
        {" "}
        <Grid item xs={12} md={8}>
        {pub.map((e) => (
        <Question key={e.id} donner={e} />
      ))}
        </Grid>
        
      </Grid>
    </Box>

    
  );
};



const QuestionLikeddata = [
  {
    id: 7,
    type: "Journal Article",
    title: "The Role of Microorganisms in Soil Fertility",
    date: "April 2024",
    reads: 820,
    citations: 67,
    mainAuthor: {
      firstName: "Emma",
      lastName: "Brown",
      image: "https://example.com/images/emma_brown.jpg",
    },
    coAuthors: [
      {
        firstName: "Benjamin",
        lastName: "Wilson",
        image: "https://example.com/images/benjamin_wilson.jpg",
      },
      {
        firstName: "Natalie",
        lastName: "Evans",
        image: "https://example.com/images/natalie_evans.jpg",
      },
      {
        firstName: "William",
        lastName: "Johnson",
        image: "https://example.com/images/william_johnson.jpg",
      },
    ],
  },
  {
    id: 8,
    type: "Conference Paper",
    title: "Future Prospects of Artificial Intelligence in Education",
    date: "May 2024",
    reads: 1050,
    citations: 81,
    mainAuthor: {
      firstName: "Noah",
      lastName: "Miller",
      image: "https://example.com/images/noah_miller.jpg",
    },
    coAuthors: [
      {
        firstName: "Amelia",
        lastName: "Thompson",
        image: "https://example.com/images/amelia_thompson.jpg",
      },
      {
        firstName: "Amelia",
        lastName: "Thompson",
        image: "https://example.com/images/amelia_thompson.jpg",
      },
      {
        firstName: "Amelia",
        lastName: "Thompson",
        image: "https://example.com/images/amelia_thompson.jpg",
      },
      {
        firstName: "Amelia",
        lastName: "Thompson",
        image: "https://example.com/images/amelia_thompson.jpg",
      },
      {
        firstName: "Lucy",
        lastName: "Harris",
        image: "https://example.com/images/lucy_harris.jpg",
      },
      {
        firstName: "Jack",
        lastName: "Robinson",
        image: "https://example.com/images/jack_robinson.jpg",
      },
    ],
  },
];

export default QuestionLiked;
