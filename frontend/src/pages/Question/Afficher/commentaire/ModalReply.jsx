import React, { useState, useEffect } from "react";
import {
  Modal,
  Fade,
  Backdrop,
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  IconButton,
  CircularProgress,
} from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import the styles
import FileUploadIcon from "@mui/icons-material/FileUpload";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import axios from "axios";
import { convert } from "html-to-text";
import { Avatar } from "@mui/joy";
import imageMale from "../../../../components/AppAppBar/profile_mal.jpg";
import imageFemale from "../../../../components/AppAppBar/profile_female.png";

const ModaleReply = ({ open, handleClose, id }) => {
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [me, setMe] = useState({});
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  const handleDescriptionChange = (value) => {
    setDescription(value);
  };
  const type = "Question";

  const handleSubmit = async () => {

    const plainString = convert(description);
    const formData = new FormData();
    formData.append("contenu", plainString); 


    // Récupérez le token depuis le local storage
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/addreply/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `token ${token}`, // Ajoutez le token dans les en-têtes
          },
        }
      );

      console.log("Data sent successfully:", response.data);
      handleClose(); // Fermez la modal après la soumission réussie
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Aucun token trouvé. Veuillez vous connecter.");
      setLoading(false); // Set loading to false if no token
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
      .then((data) => {
        setMe(data);
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données :", error);
        setLoading(false); // Set loading to false on error
      });
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

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
            width: "80%", // Increased width
            maxWidth: 800,
            maxHeight: 800, // Maximum width
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Box display="flex" alignItems="center" mb={2}>
            <Avatar src={me.gender === "Male" ? imageMale : imageFemale} />
            <Typography variant="h6" ml={2}>
              {me.first_name} {me.last_name}
            </Typography>
          </Box>
          Add an reply 
          <ReactQuill
            value={description}
            onChange={handleDescriptionChange}
            theme="snow"
            modules={{
              toolbar: [
                [{ font: [] }],
                [{ size: [] }],
                ["bold", "italic", "underline", "strike", "blockquote"],
                [
                  { list: "ordered" },
                  { list: "bullet" },
                  { indent: "-1" },
                  { indent: "+1" },
                ],
                // Ajout des options de couleur de texte et d'arrière-plan
                ["clean"],
              ],
            }}
            formats={[
              "header",
              "font",
              "size",
              "bold",
              "italic",
              "underline",
              "strike",
              "blockquote",
              "list",
              "bullet",
              "indent",
              "color",
              "background", // Assurez-vous d'ajouter ces formats également
            ]}
            style={{ height: "150px", marginTop: "16px", marginBottom: "75px" }} // Set height to 250px
          />

          <Stack
            direction="row"
            spacing={2}
            sx={{ mt: 2 }}
            justifyContent="space-between"
            marginTop={100}
          >
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                color="secondary"
                size="small"
                onClick={handleSubmit}
              >
                Add
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                size="small"
                onClick={handleClose}
              >
                Cancel
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ModaleReply;
