import React from "react";
import { Box, Button, IconButton, Typography } from "@mui/joy";
import imageMale from "../../../../components/AppAppBar/profile_mal.jpg";
import imageFemale from "../../../../components/AppAppBar/profile_female.png";
import { Avatar } from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import ModaleReply from "./ModalReply";
import { useState } from "react";

const Reply = ({ donner }) => {
  const [open1, setOpen1] = useState(false);
  const [modalContent1, setModalContent1] = useState(
    "Ask a technical question"
  );
  const reply = donner;

  const formattedDate = (dateString) => {
    const currentDate = new Date();
    const date = new Date(dateString);
    const differenceInMilliseconds = date - currentDate;
    const differenceInDays = Math.floor(
      differenceInMilliseconds / (1000 * 60 * 60 * 24)
    );
    return `${differenceInDays} days ago`;
  };

  if (!reply || !reply.auteur) {
    return null; // Render nothing if reply or reply.auteur is null or undefined
  }

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
      style={{ marginTop: 25, marginLeft: 150 }}>
      <Box
        height={60}
        width="400px"
        my={0.5}
        display="flex"
        alignItems="center"
        maxWidth={1200}
        gap={3}
        p={0}>
        <Box height={50} width={60} display="block" marginRight="-30px">
          <Avatar
            src={reply.auteur.gender === "Male" ? imageMale : imageFemale}
          />
        </Box>
        <Box>
          <Box height={28} width={208} display="block">
            {reply.auteur.first_name} {reply.auteur.last_name}
          </Box>
          <Box
            height={28}
            width={200}
            sx={{ fontSize: "small" }}
            display="block">
            added a reply
          </Box>
        </Box>
        <Box flex="1" display="flex" justifyContent="flex-end">
          <small>{formattedDate(reply.date)}</small>
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
          <p>{reply.contenu}</p>
        </div>
      </Box>

      <hr style={{ marginBottom: "18px", marginTop: "18px" }} />
      
    </div>
  );
};

export default Reply;
