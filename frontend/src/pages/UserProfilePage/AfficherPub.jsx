import React from "react";
import"./AfficherPQ.css";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Userprofile from "../Publication/Userprofile";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import imageMale from "../../components/AppAppBar/profile_mal.jpg"
import imageFemale from "../../components/AppAppBar/profile_female.png"
import ModalRefView from './ModalRefView'
import ModalRefSet from './ModalRefSet'
import { useState } from "react";


const formatDateDifference = (dateString) => {
  const currentDate = new Date();
  const date = new Date(dateString);
  const differenceInMilliseconds = currentDate - date;
  const differenceInDays = Math.floor(
    differenceInMilliseconds / (1000 * 60 * 60 * 24)
  );

  if (differenceInDays === 0) {
    return "Today";
  } else if (differenceInDays === 1) {
    return "1 day ago";
  } else if (differenceInDays < 30) {
    return `${differenceInDays} days ago`;
  } else {
    const options = { month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }
};




const AfficherPub = (donner) => {
  console.log(donner.donner)
    const res = donner.donner

    const formattedDate = formatDateDifference(res.date);


    // Vérifiez si res est défini et n'est pas une fonction avant d'accéder à ses propriétés
    
 const [open2, setOpen2] = useState(false);
  const [open1, setOpen1] = useState(false);
 
  const [modalContent1, setModalContent1] = useState("Ask a technical question");
  const [modalContent2, setModalContent2] = useState("Start a discussion");
  const [selectedPublicationId, setSelectedPublicationId] = useState(null);



  const handleOpen1 = () => {
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
    setModalContent1("");
  };

  const handleOpen2 = (publicationId) => {
    console.log(selectedPublicationId)
    setOpen2(true);
  
  };

  const handleClose2 = () => {
    setOpen2(false);
    setModalContent2("");
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
  

  
  return (
    <div className="containerr" style={{marginTop:"150px",marginLeft:"100px"}}>
      <div className="publication-card" style={{  }}>
       
      <Box
          height={60}
          width="100%"
          my={0.5}
          display="flex"
          alignItems="center"
          maxWidth={800}
          gap={3}
          p={0}>
          <Box height={50} width={60} display="block" marginRight="-30px">
          <Avatar src={res.mainAuteur.gender === "Male" ? imageMale : imageFemale} />
          </Box>
          <Box>
            <Box height={28} width={208} display="block">
              
              {res.mainAuteur.first_name} {res.mainAuteur.last_name}
            </Box>
            <Box
              height={28}
              width={200}
              sx={{ fontSize: "small" }}
              display="block">
              {`added a ${res.type}`}
            </Box>
          </Box>
          <Box flex="1" display="flex" justifyContent="flex-end">
            <small>{formattedDate}</small>
          </Box>
        </Box>

        <hr style={{ marginBottom: "18px" }} />

        <Link to={`/Home/Home/PublicationDetail/${res.id}`}>
          <h3 style={{ marginBottom: "15px", fontWeight: "bold", cursor: "pointer" }}>
            {res.titre}
          </h3>
        </Link>
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
          {res.date} Date . {res.vues} Read . {res.citations_count}Citations
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
              color="secondary"
              onClick={handleOpen1}
              >
              Add refernce
            </Button>
            <Button
              display={{ xs: "flex", sm: "inline-flex" }}
              alignItems="center"
              justifyContent="left"
              color="secondary"
              onClick={() =>{handleOpen2(res.id);console.log(res.id) } }
              >
              View References
            </Button>
          
            
          </Box>
          </Box>
          
        

      </div>
      <ModalRefSet open={open1} handleClose={handleClose1} content={modalContent1} id={res.id}/>
      <ModalRefView open={open2} handleClose={handleClose2} content={modalContent2} id={res.id}  />    </div>
  );
};

export default AfficherPub;
