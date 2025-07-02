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
import CheckBoxIconxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Checkbox from "@mui/material/Checkbox";
import { Avatar } from '@material-ui/core';
// Importez la liste des types de publication
import { keywords, publicationTypes } from "./data";
import Footer from "../../components/footer/Footer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import imageMale from "../../components/AppAppBar/profile_mal.jpg"
import imageFemale from "../../components/AppAppBar/profile_female.png"


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

const icon = <CheckBoxIconxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const Publication = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Aucun token trouvé. Veuillez vous connecter.");
      return;
    }

    fetch("http://127.0.0.1:8000/api/users/", {
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
      .then((data) => setData(data))
      .catch((error) => {
        console.error("Erreur lors de la récupération des données :", error);
      });
  }, []);


  const [type, setType] = useState("");
  const [document, setDocument] = useState(null);
  const [titre, setTitre] = useState("");
  const [doi, setDoi] = useState("");
  const [date, setDate] = useState(null);
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const authorsArray = selectedAuthors.map((author) => {
      const [firstName, lastName] = author.nom.split(" ");
      return [firstName, lastName];
    });

    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `token ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };
      const response = await axios.post(
        "http://127.0.0.1:8000/api/creatpub/",
        {
          type: type,
          document:document,
          titre: titre,
          doi: doi,
          auteurs_noms: authorsArray,
          keywords: JSON.stringify(selectedTags),
        },
        config
      );
      console.log(response.data);
      toast.success("Publication successfully published!");
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

  const handleTagsChange = (event, newValue) => {
    if (newValue.length > 15) {
      alert("Vous ne pouvez sélectionner que 15 tags au maximum");
    } else {
      setSelectedTags(newValue);
    }
  };

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
            marginTop: 15,
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
                <Autocomplete
                  color="secondary"
                  id="publication-type"
                  options={publicationTypes}
                  getOptionLabel={(option) => option.label}
                  value={
                    publicationTypes.find((option) => option.value === type) ||
                    null
                  }
                  onChange={(event, newValue) => {
                    setType(newValue ? newValue.value : "");
                  }}
                  renderInput={(params) => (
                    <TextField
                      color="secondary"
                      {...params}
                      label="Type"
                      variant="standard"
                      autoFocus
                    />
                  )}
                />
              </Grid>
              {/**type */}
              <Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent: "center" }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Button
                    color="secondary"
                    component="label"
                    variant="contained"
                    sx={{ mt: 4, mb: 2 }}
                    fullWidth
                    startIcon={<CloudUploadIcon />}>
                    Upload document
                    <VisuallyHiddenInput
                      type="file"
                      onChange={(e) => setDocument(e.target.files[0])}
                    />
                  </Button>
                  {document && (
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                      sx={{ ml: 2 }}>
                      {document.name}
                    </Typography>
                  )}
                </Box>
              </Grid>
              {/**document */}
              <Grid item xs={12}>
                <Autocomplete
                  id="domain-standard"
                  options={keywords.map((category) => category.domain)}
                  value={selectedDomain}
                  onChange={handleDomainChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      label="Domain"
                      placeholder="Sélectionnez un domaine"
                    color="secondary"
                      required
                    />
                  )}
                />
              </Grid>
              {/*key-domain */}
              <Grid item xs={12}>
                <Autocomplete
                  multiple
                  id="tags-standard"
                  options={getKeywordsByDomain(selectedDomain)}
                  value={selectedTags}
                  onChange={handleTagsChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      label="Tags"
                      placeholder="Sélectionnez jusqu'à 15  tags"
                       color="secondary"
                    />
                  )}
                />
              </Grid>
              {/*key*/}
              <Grid item xs={12}>
                <TextField
                  color="secondary"
                  required
                  fullWidth
                  variant="standard"
                  id="titre"
                  label="Titre"
                  name="titre"
                  value={titre}
                  onChange={(e) => setTitre(e.target.value)}
                />
              </Grid>
              {/**titre */}
              <Grid item xs={12}>
                <TextField
                  color="secondary"
                  fullWidth
                  name="doi"
                  label="DOI"
                  variant="standard"
                  id="doi"
                  value={doi}
                  onChange={(e) => setDoi(e.target.value)}
                />
              </Grid>
              {/**doi */}

              <Grid item xs={12}>
                <Autocomplete
                  multiple
                  id="checkboxes-tags-demo"
                  options={data}
                  disableCloseOnSelect
                  getOptionLabel={(option) =>
                    `${option.first_name} ${option.last_name}`
                  }
                  isOptionEqualToValue={(option, value) =>
                    option.email === value.email
                  }
                  onChange={(event, newValue) => {
                    const formattedAuthors = newValue.map((auteur) => ({
                      nom: `${auteur.first_name} ${auteur.last_name}`,
                    }));
                    setSelectedAuthors(formattedAuthors);
                  }}
                  renderOption={(props, option, { selected }) => (
                    console.log(option.image),
                    (
                      <li {...props}>
                        <Checkbox
                          icon={icon}
                          checkedIcon={checkedIcon}
                          style={{ marginRight: 8 }}
                          checked={selected}
                        />
                        <Avatar
                         src={option.gender === "Male" ? imageMale : imageFemale} 
                          alt={option.first_name}
                          style={{
                            width: 30,
                            height: 30,
                            borderRadius: "50%",
                            marginRight: 8,
                          }}
                        />
                        {`${option.first_name} ${option.last_name}`}
                      </li>
                    )
                  )}
                  style={{ width: 500 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Authors"
                      placeholder="Add Author"
                      required
                      variant="standard"
                       color="secondary"
                    />
                  )}
                />
              </Grid>
              {/**autors */}
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
      <ToastContainer />
    </ThemeProvider>
  );
};

export default Publication;
