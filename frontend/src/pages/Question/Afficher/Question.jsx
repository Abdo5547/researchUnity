import React, { useState, useRef, useEffect } from "react";
import "../../Publication/Home.css";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import { Link, useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { TiUserDelete, TiUserAdd } from "react-icons/ti";
import axios from "axios";
import image from "../../../components/AppAppBar/profile_mal.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

const Question = ({ donner }) => {
  const res = donner;
  console.log(res);

  const formattedDate = formatDateDifference(res.date);
  const [showFullContent, setShowFullContent] = useState(false);
  const [isContentOverflowing, setIsContentOverflowing] = useState(false);
  const contentRef = useRef(null);
  const [recommended, setRecommended] = useState(false);
  const [followed, setFollowed] = useState(false);
  const [toastId, setToastId] = useState(null); // State to keep track of active toast
  const navigate = useNavigate();

  useEffect(() => {
    const savedRecommendations =
      JSON.parse(localStorage.getItem("savedRecommendations")) || {};
    const savedFollows = JSON.parse(localStorage.getItem("savedFollows")) || {};
    setRecommended(savedRecommendations[res.id] || false);
    setFollowed(savedFollows[res.id] || false);
  }, [res.id]);

  const closeAllToastsExcept = (idToKeepOpen) => {
    toast.dismiss((toast) => {
      return toast.toastId !== idToKeepOpen; // Close all toasts except the one to keep open
    });
  };

  const handleRecommendClick = async () => {
    const newRecommendState = !recommended;
    setRecommended(newRecommendState);
    closeAllToastsExcept("recommend-toast-" + res.id); // Close other toasts

    const savedRecommendations =
      JSON.parse(localStorage.getItem("savedRecommendations")) || {};
    savedRecommendations[res.id] = newRecommendState;
    localStorage.setItem(
      "savedRecommendations",
      JSON.stringify(savedRecommendations)
    );

    try {
      if (newRecommendState) {
        await axios.post(
          `http://127.0.0.1:8000/api/recommend/`,
          { question_id: res.id },
          {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }
        );
      } else {
        await axios.delete(`http://127.0.0.1:8000/api/unrecommend/`, {
          data: { question_id: res.id },
          headers: { Authorization: `Token ${localStorage.getItem("token")}` },
        });
      }
    } catch (error) {
      console.error("Error handling recommendation:", error);
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
        await axios.post(
          `http://127.0.0.1:8000/api/follow/`,
          { question_id: res.id },
          {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }
        );
      } else {
        await axios.delete(`http://127.0.0.1:8000/api/unfollow/`, {
          data: { question_id: res.id },
          headers: { Authorization: `Token ${localStorage.getItem("token")}` },
        });
      }
    } catch (error) {
      console.error("Error handling follow request:", error);
    }
  };

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

  const keywordsList = (keywords) => {
    return keywords.split(",");
  };

  const nav = () => {
    navigate("/Home/Question/QuestionDetail", {
      state: { questionId: res.id },
    });
  };

  return (
    <div
      className="containerrr"
      style={{ width: "1000px", backgroundColor: "white" }}>
      <ToastContainer />
      <div className="publication-card" style={{ marginTop: 25 }}>
        <Box
          height={60}
          width="100%"
          my={0.5}
          display="flex"
          alignItems="center"
          maxWidth={1200}
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

        <h3 style={{ marginBottom: "15px", fontWeight: "bold" }} onClick={nav}>
          {res.titre}
        </h3>

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
              {res.reply} reply
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
            style={{
              color: "purple",
              display: "block",
              marginBottom: "18px",
              marginTop: "18px",
            }}>
            ...Read More
          </Link>
        )}

        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={nav}
          sx={{ marginRight: "10px" }}>
          Answer this question
        </Button>

        <hr style={{ marginBottom: "18px", marginTop: "18px" }} />

        <Box
          display="flex"
          alignItems="center"
          flexDirection={{ xs: "column", sm: "row" }}
          justifyContent={{ xs: "center", sm: "space-between" }}
          padding={1}
          marginTop={4}
          sx={{ width: "100%", maxWidth: 900 }}>
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
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default Question;
