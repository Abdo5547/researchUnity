import React, { useState, useEffect } from "react";
import "./Home.css";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Userprofile from "./Userprofile";
import { Link, useNavigate } from "react-router-dom";
import { Autocomplete, Grid, TextField, Typography } from "@mui/material";
import imageMale from "../../components/AppAppBar/profile_mal.jpg";
import imageFemale from "../../components/AppAppBar/profile_female.png";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { TiUserDelete, TiUserAdd } from "react-icons/ti";
import IconButton from "@mui/material/IconButton";



const Homeee = (donner) => {


  


  const res = donner.donner;

  const navigate = useNavigate();

  const navUser = () => {
    const lid = donner.id
    localStorage.setItem("userId", lid);
    navigate("/Home/Profile/ProfileUser", {
      state: {
        userId: res.mainAuteur.id,
      },
    });
  };



  const [save, setSave] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recommended, setRecommended] = useState(false);
  const [followed, setFollowed] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [type, setType] = useState("");




  const handleRecommendClick = async () => {
    const newRecommendState = !recommended;
    setRecommended(newRecommendState);

    const savedRecommendations =
      JSON.parse(localStorage.getItem("savedRecommendations")) || {};
    savedRecommendations[res.id] = newRecommendState;
    localStorage.setItem(
      "savedRecommendations",
      JSON.stringify(savedRecommendations)
    );

    try {
      if (newRecommendState) {
        const response = await axios.post(
          `http://127.0.0.1:8000/api/recommandepub/`,
          {
            publication_id: res.id,
          },
          {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log("Recommendation sent successfully:", response.data);
        toast.success("publication recommended successfully!");
      } else {
        const response = await axios({
          method: "delete",
          url: `http://127.0.0.1:8000/api/unrecommandepub/`,
          data: {
            publication_id: res.id,
          },
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        });
        console.log("Recommendation removed successfully:", response.data);
        toast.info("Recommendation removed successfully!");
      }
    } catch (error) {
      console.error("Error handling recommendation:", error);
      toast.error("An error occurred while handling the recommendation.");
    }
  };


  const handleFollowedClick = async () => {
    const newFollowState = !followed;
    setFollowed(newFollowState);

    const savedFollows = JSON.parse(localStorage.getItem("savedFollows")) || {};
    savedFollows[res.id] = newFollowState;
    localStorage.setItem("savedFollows", JSON.stringify(savedFollows));

    try {
      if (newFollowState) {
        const response = await axios.post(
          `http://127.0.0.1:8000/api/followpub/`,
          {
            publication_id: res.id,
          },
          {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log("Follow request sent successfully:", response.data);
        toast.success("Question followed successfully!");
      } else {
        const response = await axios({
          method: "delete",
          url: `http://127.0.0.1:8000/api/unfollowpub/`,
          data: {
            publication_id: res.id,
          },
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        });
        console.log("Unfollow request sent successfully:", response.data);
        toast.info("Unfollowed question successfully!");
      }
    } catch (error) {
      console.error("Error handling follow request:", error);
      toast.error("An error occurred while handling the follow request.");
    }
  };



  const handleSavedClick = async () => {
    const newSaveState = !save;
    setSave(newSaveState);
  
    const savedPublications = JSON.parse(localStorage.getItem("savedPublications")) || {};
    savedPublications[res.id] = newSaveState;
    localStorage.setItem("savedPublications", JSON.stringify(savedPublications));
  
    try {
      if (newSaveState) {
        const response = await axios.post(
          `http://127.0.0.1:8000/api/savepub/`,
          {
            publication_id: res.id,
          },
          {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log("Publication saved successfully:", response.data);
        toast.success("Publication saved successfully!");
      } else {
        const response = await axios({
          method: "delete",
          url: `http://127.0.0.1:8000/api/unsavepub/`,
          data: {
            publication_id: res.id,
          },
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        });
        console.log("Publication unsaved successfully:", response.data);
        toast.info("Publication unsaved successfully!");
      }
    } catch (error) {
      console.error("Error handling save request:", error);
      toast.error("An error occurred while handling the save request.");
    }
  };





  useEffect(() => {
    const savedRecommendations =
      JSON.parse(localStorage.getItem("savedRecommendations")) || {};
    const savedFollows = JSON.parse(localStorage.getItem("savedFollows")) || {};
    setRecommended(savedRecommendations[res.id] || false);
    setFollowed(savedFollows[res.id] || false);
  }, [res.id]);



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

  const handleDownload = () => {
    window.open(
      `http://127.0.0.1:8000/api/publications/${res.id}/download/`,
      "_blank"
    );
  };





if(!res){
  return null;
}

  return (
    <>
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
          onClick={navUser}
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

        <Link
          to={`/display/${res.id}`}
          style={{ textDecoration: "none", color: "inherit" }}>
          <h3
            style={{
              marginBottom: "15px",
              fontWeight: "bold",
              cursor: "pointer",
            }}>
            {res.titre}
          </h3>
        </Link>

        <div style={{ marginBottom: "10px" }}>
          <Button
            variant="outlined"
            color="secondary"
            size="small"
             // Appel de la fonction de téléchargement
            sx={{ marginRight: "10px" }}>
            {res.type}
          </Button>
        </div>
        <small>
          {res.date} . {res.vues} Reads . {res.citations_count} Citations
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
               
              <Typography
                variant="body2"
                sx={{ marginRight: 2, cursor: "pointer" }}
                onClick={handleSavedClick}
                color='secondary'>
                {save ? "Saved" : "Save"}
              </Typography>
          </Box>
          <Box
            textAlign="right"
            display="flex"
            justifyContent="flex-end"
            alignItems="center">
            <Box display="flex" alignItems="center" justifyContent="left">
              <IconButton onClick={handleRecommendClick} color="secondary">
                {recommended ? <AiFillLike /> : <AiOutlineLike />}
              </IconButton>
              <Typography
                variant="body2"
                sx={{
                  marginRight: 2,
                  cursor: "pointer",
                }}
                onClick={handleRecommendClick}>
                {recommended ? "Recommended" : "Recommend"}
              </Typography>
              <IconButton onClick={handleFollowedClick} color="secondary">
                {followed ? <TiUserDelete /> : <TiUserAdd />}
              </IconButton>
              <Typography
                variant="body2"
                sx={{ marginRight: 2, cursor: "pointer" }}
                onClick={handleFollowedClick}>
                {followed ? "Followed" : "Follow"}
              </Typography>
            </Box>{" "}
          </Box>
        </Box>
      </div>
    </div>
    </>
    
  );
};

export default Homeee;
