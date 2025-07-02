import React, { useState } from "react";
import { TextField, Button, Box, Autocomplete, Grid } from "@mui/material";
import "./SearchBar.css"; // Assuming you have some custom styles in SearchBar.css
import { publicationTypes } from "../../pages/Publication/data";
import axios from "axios"

const SearchBar = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [type, setType] = useState("");


  const handleSearch = async () => {
    // Préparer les données pour l'envoi à l'API
   
    const searchData = [title || 0, author || 0, type || 0];
    console.log(searchData)
    try {
    
      // Envoyer les données à l'API
      console.log(searchData)
      const response = await axios.post("votre-url-de-l-api",{
        list: searchData,
      },{
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      });
      console.log("Réponse de l'API :", response.data);
      // Ajoutez ici votre logique pour gérer la réponse de l'API
    } catch (error) {
      console.error("Erreur lors de la recherche :", error);
      // Ajoutez ici votre logique pour gérer les erreurs
    }
  };




  return (
    <div className="search-bar-container"> {/* Updated class name for container */}
      <Box
        p={3}
        borderRadius={2}
        width="70%"
        className="search-bar-box" 
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              label="Title / Keyword"
              variant="outlined"
              size="small"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              label="Author / Affiliation / Email"
              variant="outlined"
              size="small"
              fullWidth
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Autocomplete
              id="publication-type"
              options={publicationTypes}
              getOptionLabel={(option) => option.label}
              value={
                publicationTypes.find((option) => option.value === type) || null
              }
              onChange={(event, newValue) => {
                setType(newValue ? newValue.value : "");
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Type"
                  variant="outlined"
                  size="small"
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3} container justifyContent="flex-end">
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={handleSearch}
              fullWidth={window.innerWidth < 600} // Button will be full width on small screens
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default SearchBar;
