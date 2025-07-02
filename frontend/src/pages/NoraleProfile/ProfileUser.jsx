import React, { useState, useEffect } from "react";
import { AspectRatio, Box, Button, Card, Grid, Typography } from "@mui/joy";
import { Stack, Tab, Tabs } from "@mui/material";
import maleImage from "../../components/AppAppBar/profile_mal.jpg";
import femaleImage from "../../components/AppAppBar/profile_female.png";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function ProfileUser() {
  const location = useLocation();
  const storedUserId = localStorage.getItem("userId");
  const idu = location.state?.userId || storedUserId;
  const nvid = parseInt(idu, 10);

  useEffect(() => {
    if (idu) {
      localStorage.setItem("userId", idu);
    } else {
      console.error("No user ID found.");
    }
  }, [idu]);

  const [tabValue, setTabValue] = useState(0);
  const [pub, setPub] = useState([]);
  const [quest, setQuest] = useState([]);
  const [value, setValue] = useState(0);
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

  console.log(users);

  const [data, setData] = useState(null); // Initialisez avec les données

  // Fake data for similar users

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

       
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données :", error);
      });
  }, []);

  console.log(people);

  const [isFollowing, setIsFollowing] = useState({});

  const handleClick = (id) => {
    setIsFollowing((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const navigate = useNavigate();

  const userdetail = users.user;
  if (!userdetail) {
    return null;
  }

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
        }}>
        <Grid item xs={12} md={8}>
          <Card sx={{ width: "800px" }}>
            <Box sx={{ mb: 1 }}>
              <Typography level="title-md">Personal info</Typography>
            </Box>
            <Stack
              direction="row"
              spacing={3}
              sx={{ display: { xs: "none", md: "flex" }, my: 1 }}>
              <AspectRatio
                ratio="1"
                maxHeight={300}
                sx={{ flex: 1, minWidth: 120, borderRadius: "100%" }}>
                <img
                  src={userdetail.gender === "Male" ? maleImage : femaleImage}
                  srcSet="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286&dpr=2 2x"
                  loading="lazy"
                  alt=""
                />
              </AspectRatio>
              <Stack spacing={2} sx={{ flexGrow: 1 }}>
                <Stack direction="row" spacing={2}>
                  <Typography>Name:</Typography>
                  <Typography>{`${userdetail.first_name} ${userdetail.last_name}`}</Typography>
                </Stack>
                <Stack direction="row" spacing={2}>
                  <Typography>Email:</Typography>
                  <Typography>{userdetail.email}</Typography>
                </Stack>
                <Stack direction="row" spacing={2}>
                  <Typography>Institution:</Typography>
                  <Typography>{userdetail.institution}</Typography>
                </Stack>
                <Stack direction="row" spacing={2}>
                  <Typography>Faculty:</Typography>
                  <Typography>{userdetail.faculte}</Typography>
                </Stack>
                <Stack direction="row" spacing={2}>
                  <Typography>Department:</Typography>
                  <Typography>{userdetail.departement}</Typography>
                </Stack>
                <Stack direction="row" spacing={2}>
                  <Typography>Degree:</Typography>
                  <Typography>{userdetail.degree}</Typography>
                </Stack>
                <Stack direction="row" spacing={2}>
                  <Typography>Region:</Typography>
                  <Typography>{userdetail.region}</Typography>
                </Stack>
              </Stack>
            </Stack>
          </Card>
        </Grid>

        
      </Grid>
    </Box>
  );
}
