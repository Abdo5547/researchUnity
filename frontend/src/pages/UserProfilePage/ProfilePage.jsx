import React, { useState, useEffect } from "react";
import { AspectRatio, Box, Button, Card, Grid, Typography } from "@mui/joy";
import { Stack, Tab, Tabs } from "@mui/material";
import maleImage from "../../components/AppAppBar/profile_mal.jpg";
import femaleImage from "../../components/AppAppBar/profile_female.png";
import { useNavigate } from "react-router-dom";
import NearUsers from './NearUsers';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function MyProfile() {
  const [mainAuteur, setMainAuteur] = useState({});
  const [tabValue, setTabValue] = useState(0);
  const [value, setValue] = useState(0);
  const [open1, setOpen1] = useState(false);
  const [modalContent1, setModalContent1] = useState("Ask a technical question");

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
      .then((data) => setMainAuteur(data))
      .catch((error) => {
        console.error("Erreur lors de la récupération des données :", error);
      });
  }, []);

  const [data, setData] = useState(null);

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
      .then((data) => setData(data))
      .catch((error) => {
        console.error("Erreur lors de la récupération des données :", error);
      });
  }, []);

  const tabPaths = [
    "/Home/ProfileUser/Questions",
    "/Home/ProfileUser/Publications",
    "/Home/ProfileUser/SavedListe",
    "/Home/ProfileUser/RecommandedPublications",
    "/Home/ProfileUser/FollowedPublications",
  ];

  const [isFollowing, setIsFollowing] = useState({});

  const handleClick = async (id) => {
    const newFollowState = !isFollowing[id];
    setIsFollowing((prev) => ({
      ...prev,
      [id]: newFollowState,
    }));

    const savedFollows = JSON.parse(localStorage.getItem("savedFollows")) || {};
    savedFollows[id] = newFollowState;
    localStorage.setItem("savedFollows", JSON.stringify(savedFollows));

    try {
      if (newFollowState) {
        const response = await axios.post(
          `http://127.0.0.1:8000/api/followpub/`,
          { publication_id: id },
          {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log("Follow request sent successfully:", response.data);
        toast.success("Followed successfully!");
      } else {
        const response = await axios({
          method: "delete",
          url: `http://127.0.0.1:8000/api/unfollowpub/`,
          data: { publication_id: id },
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        });
        console.log("Unfollow request sent successfully:", response.data);
        toast.info("Unfollowed successfully!");
      }
    } catch (error) {
      console.error("Error handling follow request:", error);
      toast.error("An error occurred while handling the follow request.");
    }
  };

  const navigate = useNavigate();

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
    navigate(tabPaths[newValue]);
  };

  const [people, setPeople] = useState([]);
  const [follow, setFollow] = useState([]);
  const [d, setD] = useState([]);

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
        const firstThhr = data.slice(9, 12);
        setD(firstThhr);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données :", error);
      });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Aucun token trouvé. Veuillez vous connecter.");
      return;
    }
    fetch("http://127.0.0.1:8000/api/followingusers/", {
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
        setFollow(firstThreePeople);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données :", error);
      });
  }, []);

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
        const firstThreePeople = data.slice(0, 5);
        setPeople(firstThreePeople);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données :", error);
      });
  }, []);

  const handleOpen1 = () => {
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
    setModalContent1("");
  };

  return (
    <Box sx={{ flex: 1, width: "100%", marginTop: "40px" }}>
      <Grid
        container
        spacing={4}
        sx={{
          maxWidth: "1200px",
          mx: "auto",
          px: { xs: 2, md: 6 },
          py: { xs: 2, md: 3 },
        }}
      >
        <Grid item xs={12} md={8}>
          <Card sx={{ width: "800px" }}>
            <Box sx={{ mb: 1 }}>
              <Typography level="title-md">Personal info</Typography>
            </Box>
            <Stack
              direction="row"
              spacing={3}
              sx={{ display: { xs: "none", md: "flex" }, my: 1 }}
            >
              <AspectRatio
                ratio="1"
                maxHeight={200}
                sx={{ flex: 1, minWidth: 120, borderRadius: "100%" }}
              >
                <img
                  src={mainAuteur.gender === "Male" ? maleImage : femaleImage}
                  loading="lazy"
                  alt=""
                />
              </AspectRatio>
              <Stack spacing={2} sx={{ flexGrow: 1 }}>
                <Stack direction="row" spacing={2}>
                  <Typography>Name:</Typography>
                  <Typography>{`${mainAuteur.first_name} ${mainAuteur.last_name}`}</Typography>
                </Stack>
                <Stack direction="row" spacing={2}>
                  <Typography>Email:</Typography>
                  <Typography>{mainAuteur.email}</Typography>
                </Stack>
                <Stack direction="row" spacing={2}>
                  <Typography>Institution:</Typography>
                  <Typography>{mainAuteur.institution}</Typography>
                </Stack>
                <Stack direction="row" spacing={2}>
                  <Typography>Faculty:</Typography>
                  <Typography>{mainAuteur.faculte}</Typography>
                </Stack>
                <Stack direction="row" spacing={2}>
                  <Typography>Department:</Typography>
                  <Typography>{mainAuteur.departement}</Typography>
                </Stack>
                <Stack direction="row" spacing={2}>
                  <Typography>Degree:</Typography>
                  <Typography>{mainAuteur.degree}</Typography>
                </Stack>
                <Stack direction="row" spacing={2}>
                  <Typography>Region:</Typography>
                  <Typography>{mainAuteur.region}</Typography>
                </Stack>
              </Stack>
            </Stack>
          </Card>
          <Tabs
            value={value}
            onChange={handleTabChange}
            indicatorColor="secondary"
            textColor="secondary"
          >
            <Tab label="Questions" />
            <Tab label="Publications" />
            <Tab label="Savedliste" />
            <Tab label="Recommanded " />
            <Tab label="followed" />
          </Tabs>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ width: "300px", ml: 15, mt: 8 }}>
            <Box>
              <Typography level="title-md">People you might know</Typography>
            </Box>
            <Box sx={{ pl: 2 }}>
              {people &&
                people.map((followed) => (
                  <Box
                    key={followed.id}
                    sx={{ display: "flex", alignItems: "center", py: 1 }}
                  >
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
                    <Button
                      variant="contained"
                      color={isFollowing[followed.id] ? "default" : "secondary"}
                      size="small"
                      sx={{ marginLeft: "auto" }}
                      onClick={() => handleClick(followed.id)}
                    >
                      {isFollowing[followed.id] ? "Unfollow" : "Follow"}
                    </Button>
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
                    sx={{ display: "flex", alignItems: "center", py: 1 }}
                  >
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
                    <Button
                      variant="contained"
                      color={isFollowing[followed.id] ? "default" : "secondary"}
                      size="small"
                      sx={{ marginLeft: "auto" }}
                      onClick={() => handleClick(followed.id)}
                    >
                      {isFollowing[followed.id] ? "Unfollow" : "Follow"}
                    </Button>
                  </Box>
                ))}
            </Box>
          </Card>
        </Grid>
      </Grid>
      <NearUsers open={open1} handleClose={handleClose1} content={modalContent1} />
    </Box>
  );
}
