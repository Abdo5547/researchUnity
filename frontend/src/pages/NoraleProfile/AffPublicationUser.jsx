import React, { useState, useEffect } from "react";
import "../Publication/Home.css";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Userprofile from "../Publication/Userprofile";
import { Link, useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import image from "../../components/AppAppBar/profile_female.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import imageMale from "../../components/AppAppBar/profile_mal.jpg";
import imageFemale from "../../components/AppAppBar/profile_female.png";

const AffPublicationUser = (donner) => {
    console.log(donner)
  const res = donner.donner;
  console.log(res);
  const navigate = useNavigate();

  const navAuteur = () => {
    navigate("/Home/ProfileUser", {
      state: {
        userId: res.mainAuteur.id,
      },
    });
  };

  const navUser = () => {
    navigate("/Home/Profile/ProfileUser/", {
      state: {
        userId: res.auteurs.id,
      },
    });
  };

  const [save, setSave] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate fetching data with a delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
    const savedPublications =
      JSON.parse(localStorage.getItem("savedPublications")) || {};
    setSave(savedPublications[res.id] || false);
  }, [res.id]);

  const handleSavedClick = async () => {
    const newSaveState = !save;
    setSave(newSaveState);

    const savedPublications =
      JSON.parse(localStorage.getItem("savedPublications")) || {};
    savedPublications[res.id] = newSaveState;
    localStorage.setItem(
      "savedPublications",
      JSON.stringify(savedPublications)
    );

    try {
      if (newSaveState) {
        const response = await axios.post(
          `http://127.0.0.1:8000/api/savedpub/`,
          { publication_id: res.id },
          {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log("saved sent successfully:", response.data);
        toast.success("Publication saved successfully!");
      } else {
        const response = await axios({
          method: "delete",
          url: `http://127.0.0.1:8000/api/unsavedpub/`,
          data: { publication_id: res.id },
          headers: { Authorization: `Token ${localStorage.getItem("token")}` },
        });
        console.log("saved removed successfully:", response.data);
        toast.info("Saved removed successfully!");
      }
    } catch (error) {
      console.error("Error handling recommendation:", error);
      toast.error("An error occurred while handling the recommendation.");
    }
  };

  const renderAuthors = ({ publi }) => {
    if (!publi) {
      return null;
    }
    const authorComponents = publi.auteurs.map((author, index) => (
      <Userprofile key={index} donner={author} />
    ));

    if (publi.auteurs.length > 3) {
      return (
        <>
          {authorComponents.slice(0, 2)}
          <span style={{ marginTop: "20px", marginRight: "10px" }}>[...]</span>
          {authorComponents.slice(-1)}
        </>
      );
    }

    return authorComponents;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container">
      <div
        className="publication-card"
        style={{ marginTop: 30, marginLeft: 20, width: "calc(120% - 14px)" }}>
        <div style={{ marginBottom: "18px" }}>
          Suggested research based on your interest{" "}
        </div>
        <hr style={{ marginBottom: "18px" }} />
        <Box
          height={60}
          width="100%"
          my={0.5}
          display="flex"
          alignItems="center"
          maxWidth={1200}
          gap={3}
          p={0}
          onClick={navAuteur}
          sx={{ cursor: "pointer" }}>
          <Box height={50} width={60} display="block">
            <Avatar
              src={res.mainAuteur.gender === "Male" ? imageMale : imageFemale}
            />
          </Box>
          <Box marginLeft="-30px">
            <Box height={28} width={208} marginTop="-7.8x" display="block">
              {res.mainAuteur.first_name} {res.mainAuteur.last_name}
            </Box>
            <Box
              height={28}
              width={200}
              sx={{ fontSize: "small" }}
              marginTop=".8px"
              display="block">
              added a {res.type}
            </Box>
          </Box>
        </Box>

        <h3
          style={{
            marginBottom: "15px",
            fontWeight: "bold",
          }}>
          {res.titre}
        </h3>

        <div style={{ marginBottom: "10px" }}>
          <Button
            variant="outlined"
            color="secondary"
            size="small"
            sx={{ marginRight: "10px" }}>
            {res.type}
          </Button>
        </div>
        <small>
          {res.date} . {res.vues} Reads. {res.citations}Citations
        </small>
        <Box
          height={40}
          width={700}
          display="flex"
          alignItems="center"
          gap={1}
          p={0}
          sx={{
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          }}
          marginRight={7}>
          {renderAuthors({ publi: res })}
        </Box>
        <Box
          display="flex"
          alignItems="center"
          flexDirection={{ xs: "column", sm: "row" }}
          justifyContent={{ xs: "center", sm: "space-between" }}
          padding={1}
          marginTop={4}
          sx={{ width: "100%", maxWidth: 900 }}>
          <Box display="flex" alignItems="left" justifyContent="left">
            <Button
              display={{ xs: "flex", sm: "inline-flex" }}
              alignItems="center"
              justifyContent="left"
              color="secondary">
              Download
            </Button>
            <Typography
              variant="body2"
              sx={{
                marginLeft: "10px",
                cursor: "pointer",
                marginTop: "8px",
              }}
              onClick={handleSavedClick}>
              {save ? "Saved" : "Save"}
            </Typography>
          </Box>
          <Box
            textAlign="right"
            display="flex"
            justifyContent="flex-end"
            alignItems="center">
            <Typography
              variant="body2"
              sx={{ marginRight: "20px", cursor: "pointer" }}>
              Follow
            </Typography>
            <Typography
              variant="body2"
              sx={{ marginRight: "20px", cursor: "pointer" }}>
              Recommend
            </Typography>
            <Typography
              variant="body2"
              sx={{ marginRight: "20px", cursor: "pointer" }}>
              Share
            </Typography>
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default AffPublicationUser;
