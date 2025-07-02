import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Checkbox from "@mui/material/Checkbox";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";


// Importez la liste des types de publication
import { keywords, publicationTypes } from "./data";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const Publication = () => {
  const [data, setData] = useState([]);


  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/users/")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) =>
        console.error("Erreur lors de la récupération des données :", error)
      );
  }, []);
  
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items = Array.from(selectedAuthors);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setSelectedAuthors(items);
  };

  const [userData, setUserData] = useState(null);

  const receiveDataFromChild = (data) => {
    console.log("Data received in parent:", data);
    const formattedData = data.map((item) => ({
      firstLetter: item.firstName[0].toUpperCase(),
      name: `${item.firstName} ${item.lastName}`,
      firstName: item.firstName,
    }));
    setUserData(formattedData);
  };

  const [type, setType] = useState("");
  const [document, setDocument] = useState(null);
  const [titre, setTitre] = useState("");
  const [doi, setDoi] = useState("");
  const [date, setDate] = useState(null);
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState(null);

  const navigate = useNavigate();

  const authorsString = selectedAuthors.map((auteur) => auteur.nom).join("_");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Formatez les auteurs sélectionnés en une structure JSON avec la clé "nom"
    const formData = new FormData();
    formData.append("type", type);
    formData.append("titre", titre);
    formData.append("document", document);
    formData.append("doi", doi);
    formData.append("date", date ? date.format("YYYY-MM-DD") : null);
    formData.append("auteur", authorsString);
    console.log(selectedTags)
    const keywordsString = selectedTags.join("_");console.log(keywordsString)
    formData.append("keywords", keywordsString);
    

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/creatpub/",
        formData
      );

      console.log(response.data);
    } catch (error) {
      console.error("Erreur de requête POST:", error);
      if (error.response) {
        console.error("Erreur de réponse du serveur:", error.response.data);
      } else if (error.request) {
        console.error("Aucune réponse reçue:", error.request);
      } else {
        console.error("Erreur de configuration de la requête:", error.message);
      }
    }
  };

  const defaultTheme = createTheme();

  const getKeywordsByDomain = (selectedDomain) => {
    const selectedCategory = keywords.find(
      (category) => category.domain === selectedDomain
    );
    return selectedCategory ? selectedCategory.keywords : [];
  };

  const handleDomainChange = (event, newValue) => {
    setSelectedDomain(newValue);
    setSelectedTags([]); // Réinitialiser les tags lorsque le domaine est changé
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          <Typography component="h1" variant="h4">
            Publication
          </Typography>

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
            method="post"
            color="secondary">
            <Grid container spacing={2}>



              <Grid item xs={12}>
              <DragDropContext onDragEnd={onDragEnd}>
                  <Droppable droppableId="authors">
                    {(provided) => (
                      <ul {...provided.droppableProps} ref={provided.innerRef}>
                        {selectedAuthors.map((author, index) => (
                          <Draggable
                            key={author.email}
                            draggableId={author.email}
                            index={index}>
                            {(provided) => (
                              <li
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}>
                                <Checkbox
                                  style={{ marginRight: 8 }}
                                  checked={true}
                                />
                                <img
                                  src={author.image}
                                  alt="Avatar"
                                  style={{
                                    width: 30,
                                    height: 30,
                                    borderRadius: "50%",
                                    marginRight: 8,
                                  }}
                                />
                                {`${author.first_name} ${author.last_name}`}
                              </li>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </ul>
                    )}
                  </Droppable>
                </DragDropContext>
              </Grid>{/**autors */}
            </Grid>

            <Button
              type="submit"
              color="secondary"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}>
              Publish
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Publication;
