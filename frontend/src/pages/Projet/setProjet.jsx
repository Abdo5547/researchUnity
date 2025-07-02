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
import { styled } from "@mui/material/styles";
import Autocomplete from "@mui/material/Autocomplete";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import CheckBoxIconxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Checkbox from "@mui/material/Checkbox";
import { Avatar } from "@mui/joy";
import imageMale from "../../components/AppAppBar/profile_mal.jpg";
import imageFemale from "../../components/AppAppBar/profile_female.png";

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

const SetProjet = () => {
  const [nomProjet, setNomProjet] = useState("");
  const [description, setDescription] = useState("");
  const [professeur, setProfesseur] = useState("");
  const [membres, setMembres] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [data, setData] = useState([]);

  const icon = <CheckBoxIconxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

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
  console.log(data);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(nomProjet);
    console.log(description)
    console.log(membres);

    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `token ${token}`,
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post(
        "http://127.0.0.1:8000/api/addproject/",
        {
          titre: nomProjet,
          contenu: description,
          membres_ids: membres,
        },
        config
      );

      console.log(response.data);

      toast.success("Project successfully created!", {
        position: "top-right",
        autoClose: 6000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
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

  const handleTagsChange = (event, newValue) => {
    if (newValue.length > 6) {
      alert("Vous ne pouvez sélectionner que 6 tags au maximum");
    } else {
      setSelectedTags(newValue);
    }
  };

  return (
    <>
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
            Project Form
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
                <TextField
                  color="secondary"
                  required
                  fullWidth
                  variant="standard"
                  id="nomProjet"
                  label="Project Name"
                  name="nomProjet"
                  value={nomProjet}
                  onChange={(e) => setNomProjet(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  color="secondary"
                  required
                  fullWidth
                  multiline // Ajoutez cette ligne pour permettre plusieurs lignes
                  rows={4}
                  variant="standard"
                  id="description"
                  label="Project Description"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <Autocomplete
                  multiple
                  color="secondary"
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
                    console.log(newValue.map((auteur) => auteur.id));

                    const selectedIds = newValue.map((auteur) => auteur.id);
                    setMembres(selectedIds);
                  }}
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <Checkbox
                        checkedIcon={<CheckBoxIcon />}
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
                  )}
                  style={{ width: 500 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Authors"
                      placeholder="Add Author"
                      required
                      color="secondary"
                      variant="standard"
                    />
                  )}
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              color="secondary"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}>
              Create Project
            </Button>
          </Box>
        </Box>
      </Container>
      <ToastContainer />
    </>
  );
};

export default SetProjet;
