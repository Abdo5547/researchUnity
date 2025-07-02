import React, { useState, useRef, useEffect } from "react";
import "./AfficherPQ.css";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { TiUserDelete, TiUserAdd } from "react-icons/ti";
import axios from "axios";
import image from "../../components/AppAppBar/profile_mal.jpg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

const keywords = {
  keywords: [
    "JavaScript",
    "React",
    "CSS",
    "HTML",
    "Web Development",
    "Frontend",
    "Backend",
    "Node.js",
    "Express",
    "MongoDB",
  ],
};

const AfficherQues = ({ donner }) => {
  const res = donner;

  const formattedDate = formatDateDifference(res.date);
  const [showFullContent, setShowFullContent] = useState(false);
  const [isContentOverflowing, setIsContentOverflowing] = useState(false);
  const contentRef = useRef(null);
  const [recommended, setRecommended] = useState(false);
  const [followed, setFollowed] = useState(false);



 

  useEffect(() => {
    const checkContentOverflow = () => {
      if (contentRef.current.scrollHeight > contentRef.current.clientHeight) {
        setIsContentOverflowing(true);
      } else {
        setIsContentOverflowing(false);
      }
    };

    checkContentOverflow();
    window.addEventListener("resize", checkContentOverflow);
    return () => {
      window.removeEventListener("resize", checkContentOverflow);
    };
  }, []);


  return (
    <div className="containerrr" style={{marginLeft:"100px",marginTop:"100px"}} >
       <ToastContainer />
      <div className="publication-card2" style={{marginLeft:"100px",marginTop:"100px"}} >
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
            <Avatar src={image} />
          </Box>
          <Box>
            <Box height={28} width={208} display="block">
              
              {res.auteur.first_name} {res.auteur.last_name}
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

        <Link to="">
          <h3 style={{ marginBottom: "15px", fontWeight: "bold" }}>
            {res.titre}
          </h3>
        </Link>
        <div style={{ marginBottom: "10px" }}>
          <ButtonGroup disableElevation variant="contained">
            <Button
              variant="contained"
              color="secondary"
              size="small"
              sx={{ marginRight: "10px" }}>
              New
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              size="small"
              sx={{ marginRight: "10px" }}>
              Discussion
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              size="small"
              sx={{ marginRight: "10px" }}>
              0 reply
            </Button>
          </ButtonGroup>
        </div>
        <Box
          maxHeight={showFullContent ? "none" : "100px"}
          overflow="hidden"
          marginTop="20px"
          ref={contentRef}>
          <div style={{ marginBottom: "10px", whiteSpace: "pre-wrap" }}>
            <p>{res.contenu}</p>
          </div>
        </Box>
        {isContentOverflowing && !showFullContent && (
          <Link
            to="/"
            style={{
              color: "purple",
              display: "block",
              marginBottom: "18px",
              marginTop: "18px",
            }}>
            ...Read More
          </Link>
        )}
       

        <hr style={{ marginBottom: "18px", marginTop: "18px" }} />

        <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
          {keywords.keywords.slice(0, 11 ).map((keyword, index) => (
            <Chip
              key={index}
              label={keyword}
              color="secondary"
              variant="outlined"
            />
          ))}
        </Box>

        <hr style={{ marginBottom: "18px", marginTop: "18px" }} />

        
      </div>
    </div>
  );
};

export default AfficherQues;
