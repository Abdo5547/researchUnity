import React, { useEffect, useState } from "react";
import { Modal, Fade, Backdrop, Box, Typography, List, ListItem, ListItemText, Button } from "@mui/material";
import axios from "axios";

const ModalRefView = ({ open, handleClose }) => {

  const [data, setData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Aucun token trouvé. Veuillez vous connecter.");
      return;
    }

    fetch("http://127.0.0.1:8000/api/nearusers/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
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
  },);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            maxWidth: 800,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h4" component="h2" gutterBottom>
            People you mighy know
          </Typography>
          {data && data.length > 0 ? (
            <List>
              {data.map((reference, index) => (
                <ListItem key={index}>
                  <ListItemText primary={reference.title} secondary={reference.author} />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="body1">No references exist</Typography>
          )}
          <Button onClick={handleClose} color="secondary">Close</Button>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ModalRefView;
