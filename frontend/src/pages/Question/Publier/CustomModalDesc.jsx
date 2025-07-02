import React, { useState } from "react";
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
} from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import the styles
import FileUploadIcon from "@mui/icons-material/FileUpload";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import axios from "axios";
import { convert } from 'html-to-text';


const CustomModalQues = ({ open, handleClose, content }) => {
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);

  const handleDescriptionChange = (value) => {
   
    setDescription(value);
  };
  const type = "Question"

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };


  const handleSubmit = async () => {
    console.log(description)
    console.log(type)
    const plainString = convert(description);
    const formData = new FormData();
    formData.append('titre', title);
    formData.append('contenu', plainString);
    formData.append('type', type);


    if (file) {
      formData.append('document', file);
    }

    // Récupérez le token depuis le local storage
    const token = localStorage.getItem('token');

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/creatquest/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `token ${token}`, // Ajoutez le token dans les en-têtes
        },
      });
      
      console.log('Data sent successfully:', response.data);
      handleClose(); // Fermez la modal après la soumission réussie
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}>
      <Fade in={open}>
        <Box
        onSubmit={handleSubmit}
        method="post"
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
          <Typography variant="h4" component="h2">
            Ask a technical question
          </Typography>
          <Typography variant="subtitle1" sx={{ mt: 2 }}>
            Enter a clear and concise question that others will easily
            understand. Learn more Please provide any details researchers may
            need to answer your question.
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            label="Question"
            margin="normal"
            color="secondary"
            value={title}
            onChange={handleTitleChange}

          />
          <ReactQuill
            vlue={description}
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
            style={{ height: "200px", marginTop: "16px", marginBottom: "75px" }} // Set height to 250px
          />

          <Stack
            direction="row"
            spacing={2}
            sx={{ mt: 2 }}
            justifyContent="space-between"
            marginTop={100}>
            <IconButton component="label" size="small" sx={{ color: "black" }}>
              <AttachFileIcon color="secondary" />
              Add files
              <input type="file" hidden />
            </IconButton>
            <Stack direction="row" spacing={2}>
              <Button variant="contained" color="secondary" size="small" onClick={handleSubmit}>
                Add
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                size="small"
                onClick={handleClose}>
                Cancel
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Fade>
    </Modal>
  );
};

export default CustomModalQues;
