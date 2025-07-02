import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

//mui material import
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import imageeee from "../../image/RUlogo.png";
import imageProfil from "./profile_mal.jpg";
import { Alert, Avatar, Stack } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import maleImage from "./profile_mal.jpg";
import femaleImage from "./profile_female.png";

import MailOutlineIcon from "@mui/icons-material/MailOutline";
import Badge from "@mui/material/Badge";

//components imports
import MessageDropDown from "./MessageDropDown/MessageDropDown";
import RequestDropDown from "./RequestDropDown/RequestDropDown";
import DropDownProfile from "./ProfilDropDown/DropDownProfil";

//notification icons
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import NotificationsIcon from "@mui/icons-material/Notifications";

import ButtonAddNew from "../ButtonAddNew/ButtonAddNew";
import Exemple from "./Exemple";




//import Home from "../../pages/sign/Home/Home";

// styling variables begin

const logoStyle = {
  width: "140px",
  height: "auto",
  cursor: "pointer",
};

const addnewstyle = {
  marginRight: "-10px",
  marginLeft: "18px",
};

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  color: "black",
};

// styling variables end


function AddProjectButton() {
  return (
    <Link to="/Home/Projet">
      <Button
        color="secondary"
        variant="contained"
        size="small"
        component="a"
        target="_blank"
        sx={addnewstyle}>
        Add Project
      </Button>
    </Link>
  );
}


function AddNewButton() {
  return (
    <Link to="/Home/Publication">
      <Button
        color="secondary"
        variant="contained"
        size="small"
        component="a"
        target="_blank"
        sx={addnewstyle}>
        Add New
      </Button>
    </Link>
  );
}



// Composant de la barre de navigation
  // Utilisez le hook useContext pour obtenir le degré de l'utilisateur
  
  


export default function AppAppBar({ mode, toggleColorMode }) {

  const [openExemple, setOpenExemple] = useState(false);
  const [inboxOpen, setInboxOpen] = useState(false);
  const [openRequest, setOpenRequest] = useState(false);
  const [openUpdates, setOpenUpdates] = useState(false);
  const [value, setValue] =useState(0);
  const [me, setMe] =useState({});


  

  const containerrRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerrRef.current &&
        !containerrRef.current.contains(event.target)
      ) {
        setOpenRequest(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setOpenExemple(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [openProfile, setOpenProfile] = useState(false);

  const containeerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containeerRef.current &&
        !containeerRef.current.contains(event.target)
      ) {
        setOpenProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navigate = useNavigate();

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 0) navigate('/Home/Home');
    if (newValue === 1) navigate('/Home/Question/QuestionInterest');
    if (newValue === 2) navigate('/Home/ProfileUser/Questions');
    if (newValue === 3) navigate("/Home/Chat/GroupeChat");
  };

  //recuperation du user authetifier 


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


  




  return (
    <div>
      <AppBar
        sx={{
          boxShadow: 0,
          bgcolor: "transparent",
          backgroundImage: "none",
          mt: 1,
        }}>
        <Container maxWidth="1g">
          <Toolbar
            variant="regular"
            sx={(theme) => ({
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderRadius: "5px",
              bgcolor:
                theme.palette.mode === "light"
                  ? "rgba(255, 255, 255, 0.4)"
                  : "rgba(0, 0, 0, 0.4)",
              backdropFilter: "blur(24px)",
              maxHeight: 20,
              border: "1px solid",
              borderColor: "divider",
              boxShadow:
                theme.palette.mode === "light"
                  ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                  : "0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)",
            })}>
            <Box
              sx={{
                flexGrow: 10,
                display: "flex",
                alignItems: "center",
                ml: "-18px",
              }}>
              {/* image begin */}
              <Link to="/home/home">
              <img
                src={imageeee}
                style={logoStyle}
                alt="logo of ResearchUnity"
              />
              </Link>
              
              {/* image end */}

              {/* link begin */}

              <Box
                sx={{ display: { xs: "none", md: "flex", fontSize: "small" } }}>
                <Box sx={{ width: "100%" }}>
                  <Box
                    sx={{
                      borderBottom: 0,
                      borderColor: "divider",
                      marginTop: "17px",
                      marginLeft: "15px",
                    }}>
                    <Tabs
                      value={value}
                      onChange={handleTabChange}
                      indicatorColor="secondary"
                      textColor="secondary">
                      <Tab label="Home" />
                      <Tab label="Question" />
                      <Tab label="profile"  />
                      <Tab label="project"  />
                    </Tabs>
                  </Box>
                </Box>
              </Box>
            </Box>

            {/* link end */}

            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 0.5,
                alignItems: "center",
              }}>
              {/* icons start */}
              <Badge color="secondary" >
                <div ref={containerrRef}>
                  <IconButton >
                    <NotificationsIcon /> {openRequest && <RequestDropDown />}
                  </IconButton>
                </div>
              </Badge>

              <Badge color="secondary" >
                <div ref={containerRef}>
                  <IconButton >
                    <MailOutlineIcon /> {openExemple && <Exemple />}
                  </IconButton>
                </div>
              </Badge>
              {/* icons end */}
              {/* image start */}
              <div ref={containeerRef}>
                <IconButton
                  size="large"
                  style={{ color: "#212121" }}
                  onClick={() => setOpenProfile((prev) => !prev)}>
                    <Avatar  src={me.gender === "Male" ? maleImage : femaleImage} />
                           </IconButton>
                {openProfile && <DropDownProfile />}
              </div>
              {/* image end */}
              {/* button start */}
              {me.degree === "PHDstudent" && <> <AddNewButton /> </> }
             {me.degree === "Professor" && (
            <>
              <AddNewButton />
              <AddProjectButton />
            </>
          )}
              {/* button endd */}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      
      
    </div>
  );
}
