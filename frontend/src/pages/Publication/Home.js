import React, { useEffect, useState } from "react";
import axios from "axios";
import Homeee from "./Homeee";
import { Box, Button, Card, Grid, Typography } from "@mui/joy";
import maleImage from "../../components/AppAppBar/profile_mal.jpg";
import femaleImage from "../../components/AppAppBar/profile_female.png";
import { useNavigate } from "react-router-dom";
import { publicationTypes } from "./data";
import "./SearchBar.css";
import { Autocomplete, TextField } from "@mui/material";
import { toast } from "react-toastify";

const Home = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [isSearchClicked, setIsSearchClicked] = useState(false); // État pour savoir si le bouton de recherche a été cliqué
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  const handleSearch = async () => {
    // Préparer les données pour l'envoi à l'API
    const searchData = [title || 0, author || 0, type || 0];
    console.log(searchData);
    try {
      // Envoyer les données à l'API
      console.log(searchData);
      const response = await axios.post(
        "http://127.0.0.1:8000/api/search-publications/",
        {
          titre: title,
          auteur: author,
          type: type,
        },
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        }
      );
      setFilteredData(response.data);
      setIsSearchClicked(true); // Mettre à jour l'état pour indiquer que le bouton de recherche a été cliqué
      console.log(filteredData);
    } catch (error) {
      console.error("Erreur lors de la recherche :", error);
      // Ajoutez ici votre logique pour gérer les erreurs
    }
  };

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
      .then((data) => {
        const sortedData = data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        console.log(sortedData);
        setData(sortedData);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données :", error);
      });
  }, []);

  const [save, setSave] = useState(false);

  const [followw, setFolloww] = useState(false);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [type, setType] = useState("");

  const [people, setPeople] = useState([]);
  const [follow, setFollow] = useState([]);
  const [d, setD] = useState([]);

  console.log(people);

  const [isFollowing, setIsFollowing] = useState({});

  const handleClick = (id) => {
    setIsFollowing((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Aucun token trouvé. Veuillez vous connecter.");
      return;
    }
    fetch("http://127.0.0.1:8000/api/followers/", {
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
        const firstThreePeople = data.slice(0, 5);
        setFollow(data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données :", error);
      });
  }, []);
  console.log(follow)

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Aucun token trouvé. Veuillez vous connecter.");
      return;
    }
    fetch("http://127.0.0.1:8000/api/nearusers/", {
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
        setPeople(data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données :", error);
      });
  }, []);

  const [followStatus, setFollowStatus] = useState({});

  useEffect(() => {
    // Récupérer l'état de suivi depuis localStorage à l'initialisation
    const savedFollows = JSON.parse(localStorage.getItem("savedFollows")) || {};
    setFollowStatus(savedFollows);
  }, []);
  // Fonction pour basculer l'état de follow/unfollow et envoyer à l'API
  const toggleFollow = async (personId) => {
    try {
      const newFollowState = !followStatus[personId];
      // Mettre à jour l'état de suivi localement
      setFollowStatus((prevStatus) => ({
        ...prevStatus,
        [personId]: newFollowState,
      }));
      // Mettre à jour localStorage avec le nouvel état de suivi
      localStorage.setItem(
        "savedFollows",
        JSON.stringify({
          ...followStatus,
          [personId]: newFollowState,
        })
      );

      // Envoyer une requête à l'API pour mettre à jour l'état de suivi dans la base de données
      if (newFollowState) {
        const response = await axios.post(
          `http://127.0.0.1:8000/api/followuser/`,
          {
            person_id: personId,
          },
          {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log("Follow request sent successfully:", response.data);
        // Optionnel : Utilisez une librairie comme 'toast' pour afficher un message à l'utilisateur
        // toast.success("Followed person successfully!");
      } else{
        const response = await axios({
          method: "delete",
          url: `http://127.0.0.1:8000/api/unfollowuser/`,
          data: {
            person_id: personId,
          },
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        });
        console.log("Recommendation removed successfully:", response.data);
        toast.info("Recommendation removed successfully!");
      }
    } catch (error) {
      console.error("Error handling follow request:", error);
      // Optionnel : Utilisez une librairie comme 'toast' pour afficher un message d'erreur à l'utilisateur
      // toast.error("An error occurred while handling the follow request.");
    }
  };


  console.log(people)

  return (
    <Box
      sx={{
        flex: 1,
        width: "100%",
        marginTop: "40px",
        backgroundColor: "#fbfbfb",
      }}>
      <div className="search-bar-container">
        <Box p={3} borderRadius={2} width="70%" className="search-bar-box">
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                label="Title / Keyword"
                variant="outlined"
                size="small"
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                label="Author / Affiliation / Email"
                variant="outlined"
                size="small"
                fullWidth
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Autocomplete
                id="publication-type"
                options={publicationTypes}
                getOptionLabel={(option) => option.label}
                value={
                  publicationTypes.find((option) => option.value === type) ||
                  null
                }
                onChange={(event, newValue) => {
                  setType(newValue ? newValue.value : "");
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Type"
                    variant="outlined"
                    size="small"
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              container
              justifyContent="flex-end">
              <Button
                variant="contained"
                color="secondary"
                size="large"
                onClick={handleSearch}
                fullWidth={window.innerWidth < 600} // Button will be full width on small screens
              >
                Search
              </Button>
            </Grid>
          </Grid>
        </Box>
      </div>

      <Grid
        container
        spacing={4}
        sx={{
          maxWidth: "1200px",
          mx: "auto",
          px: { xs: 2, md: 2 },
          py: { xs: 2, md: 3 },
        }}>
        <Grid item xs={12} md={8}>
          <Grid item xs={12} md={8}>
            <Grid item xs={12} md={8}>
              {isSearchClicked ? (
                filteredData.length === 0 ? (
                  <Typography sx={{ marginTop: "100px" }}>
                    No publications matching your criteria
                  </Typography>
                ) : (
                  filteredData.map((publication, index) => (
                    <Homeee key={index} donner={publication} />
                  ))
                )
              ) : (
                data &&
                data.map((publication, index) => (
                  <Homeee key={index} donner={publication} />
                ))
              )}
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ width: "300px", ml: 15, mt: 8 }}>
            <Box>
              <Typography level="title-md">People you might know</Typography>
            </Box>
            <Box sx={{ pl: 2 }}>
              {people &&
                people.map((person) => (
                  <Box
                    key={person.id}
                    sx={{ display: "flex", alignItems: "center", py: 1 }}>
                    <img
                      src={person.gender === "Male" ? maleImage : femaleImage}
                      alt={person.name}
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        marginRight: 10,
                      }}
                    />
                    <Typography>
                      {person.first_name} {person.last_name}
                    </Typography>
                    <Button
                      variant="contained"
                      color={followStatus[person.id] ? "secondary" : "primary"}
                      onClick={() => toggleFollow(person.id)}
                      style={{ marginLeft: "auto" }} // Pour aligner le bouton à droite
                    >
                      {followStatus[person.id] ? "Unfollow" : "Follow"}
                    </Button>

                    {/* Bouton Follow/Unfollow pour chaque personne */}
                    
                  </Box>
                ))}
            </Box>
          </Card>
          <Card sx={{ mt: 5, width: "300px", ml: 15 }}>
            <Box>
              <Typography level="title-md">Followed</Typography>
            </Box>
            <Box sx={{ pl: 2 }}>
              {follow &&
                follow.map((followed) => (
                  <Box
                    key={followed.id}
                    sx={{ display: "flex", alignItems: "center", py: 1 }}>
                    <img
                      src={followed.gender === "Male" ? maleImage : femaleImage}
                      alt={followed.name}
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        marginRight: 10,
                      }}
                    />
                    <Typography>
                      {followed.first_name} {followed.last_name}
                    </Typography>
                  
                  </Box>
                ))}
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
