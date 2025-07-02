import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { Box, Card, Grid, Typography } from "@mui/joy";
import imageMale from "../../../../components/AppAppBar/profile_mal.jpg";
import imageFemale from "../../../../components/AppAppBar/profile_female.png";
import { ToastContainer, toast } from "react-toastify";
import { Avatar, Button, Chip } from "@mui/material";
import ButtonGroup from "@mui/material/ButtonGroup";
import IconButton from "@mui/material/IconButton";
import ShareIcon from "@mui/icons-material/Share";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { TiUserDelete, TiUserAdd } from "react-icons/ti";
import Answer from "./Commentaire";
import CommentIcon from "@mui/icons-material/Comment";
import Reply from "./Reply";
import ModaleReply from "./ModalReply";

const Commentaire = (donner) => {
  const question = donner.donner;
  console.log(question.date);
  const [Liked, setRecommended] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [modalContent1, setModalContent1] = useState(
    "Ask a technical question"
  );

  const formattedDate = (dateString) => {
    const currentDate = new Date();
    const date = new Date(dateString);
    const differenceInMilliseconds = date - currentDate;
    const differenceInDays = Math.floor(
      differenceInMilliseconds / (1000 * 60 * 60 * 24)
    );
    return `${differenceInDays} days ago`;
  };

  const handleOpen1 = () => {
    console.log(5545);
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
    setModalContent1("");
  };

  return (
    <div
      className="publication-card"
      style={{ marginTop: 25, marginBottom: 10, }}>
      <Box
        height={30}
        width="500px"
        my={0.5}
        display="flex"
        alignItems="center"
        maxWidth={1200}
        gap={3}
        p={0}>
        <Box height={50} width={60} display="block" marginRight="-30px">
          <Avatar
            src={question.auteur.gender === "Male" ? imageMale : imageFemale}
          />
        </Box>
        <Box>
          <Box height={28} width={208} display="block">
            {question.auteur.first_name} {question.auteur.last_name}
          </Box>
          <Box
            height={28}
            width={200}
            sx={{ fontSize: "small" }}
            display="block">
            added an answer
          </Box>
        </Box>
        <Box flex="1" display="flex" justifyContent="flex-end">
          <small>{formattedDate(question.date)}</small>
        </Box>
      </Box>

      <hr style={{ marginBottom: "18px" }} />

      <div style={{ marginBottom: "10px" }}></div>
      <Box maxHeight={"100px"} overflow="hidden" marginTop="20px">
        <div
          style={{
            marginBottom: "10px",
            whiteSpace: "pre-wrap",
          }}>
          <p>{question.contenu}</p>
        </div>
      </Box>

      <hr style={{ marginBottom: "18px", marginTop: "18px" }} />
      <Box
        display="flex"
        alignItems="center"
        flexDirection={{ xs: "column", sm: "row" }}
        justifyContent={{ xs: "center", sm: "space-between" }}
        padding={1}
        marginTop="-10px"
        sx={{ width: "100%", maxWidth: 900 }}>
        <Box display="flex" alignItems="center" justifyContent="left">
          <IconButton color="secondary" size="small">
            {Liked ? <AiFillLike /> : <AiOutlineLike />}
          </IconButton>
          <Typography
            variant="body2"
            sx={{
              marginRight: 2,
              cursor: "pointer",
            }}>
            {Liked ? "Liked" : "Like"}
          </Typography>
          
          <Box display="flex" justifyContent="flex-end" alignItems="center">
            <Button onClick={handleOpen1} variant="text">
              <IconButton color="secondary" size="small">
                <CommentIcon color="secondary"  />
              </IconButton>
              <Typography
                variant="body2"
                sx={{
                  marginRight: 2,
                  cursor: "pointer",
                }}>
                Reply
              </Typography>
            </Button>
          </Box>

          <ModaleReply
            open={open1}
            handleClose={handleClose1}
            content={modalContent1}
          />
        </Box>
      </Box>
      {question.reply && question.reply.length > 0
        ? question.reply.map((publication, index) => (
            <Reply key={index} donner={publication} />
          ))
        : null}
      <hr style={{ marginBottom: "-20px" }} />
    </div>
  );
};

export default Commentaire;
