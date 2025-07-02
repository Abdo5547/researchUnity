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

 

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);

    if (!token) {
      console.error("Aucun token trouvé. Veuillez vous connecter.");
      return;
    }

    fetch("http://127.0.0.1:8000/api/users/", {
      headers: {
        Authorization: `token ${token}`,
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



  const defaultTheme = createTheme();



  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        
        <img src="" alt="" />


      </Container>
    </ThemeProvider>
  );
};

export default Publication;

const stores = [
  {
    id: "0e2f0db1-5457-46b0-949e-8032d2f9997a",
    name: "Walmart",
    items: [
      { id: "26fd50b3-3841-496e-8b32-73636f6f4197", name: "3% Milk" },
      { id: "b0ee9d50-d0a6-46f8-96e3-7f3f0f9a2525", name: "Butter" },
    ],
    tint: 1,
  },
  {
    id: "a0c923e1-0b1d-4aa4-aef3-92d486459fe7",
    name: "Target",
    items: [
      { id: "cfe09a7d-2580-4e6e-8f5d-55e201bb3a8f", name: "Eggs" },
      { id: "83bdc738-f7e1-40b4-bca0-40c27bc0531f", name: "Bread" },
    ],
    tint: 2,
  },
  {
    id: "f4de29a0-02eb-4e39-8e8c-907bd90e2d5d",
    name: "Costco",
    items: [
      { id: "cc207918-ee1a-42d7-a7a9-06272c9d89b5", name: "Toilet Paper" },
      { id: "e9bcf4e9-308b-4ee6-b59d-7febfad666e0", name: "Chicken Breasts" },
    ],
    tint: 3,
  },
  {
    id: "87e9c30e-7c17-458d-86f2-9514e20e0624",
    name: "Kroger",
    items: [
      { id: "0bfaaefb-94a2-47f3-9a4f-60591d1538d4", name: "Apples" },
      { id: "8e261b9d-66f4-47f2-b623-5ff2b9d40de3", name: "Bananas" },
    ],
    tint: 4,
  },
  {
    id: "bc0c9b82-3b92-4a29-924a-2d44c98e54d1",
    name: "Whole Foods",
    items: [
      { id: "df3a0cf0-5f86-44c1-8611-804bf7a8a79b", name: "Organic Kale" },
      { id: "b1e2e4c7-7d2b-41c8-8012-4982b3fe4771", name: "Quinoa" },
    ],
    tint: 5,
  },
  {
    id: "c88744f3-94c3-4df5-b9a7-38c78984e1f4",
    name: "Trader Joe's",
    items: [
      { id: "7a7e32a6-cdd7-4a1f-84a3-27881d5c63a5", name: "Avocados" },
      { id: "9fd61d69-d5aa-4399-ba19-f14e09e53b02", name: "Almond Butter" },
    ],
    tint: 6,
  },
  {
    id: "e6c1ee3a-1e91-4528-82a5-18ab09bb701d",
    name: "Safeway",
    items: [
      { id: "b7b2e6a2-5d07-4d18-bfa4-628b1437d66d", name: "Ground Beef" },
      { id: "56fc232d-b2ac-4f92-87bb-05ab0ac63f9d", name: "Pasta" },
    ],
    tint: 7,
  },
  {
    id: "83d2586b-5425-46c6-af95-6e4402a92fcf",
    name: "Publix",
    items: [
      { id: "2536d7b0-2a17-4cd6-888d-ff0de287e582", name: "Orange Juice" },
      { id: "f00aef8b-bf11-4d1b-b465-f4f935faeb59", name: "Potatoes" },
    ],
    tint: 8,
  },
  {
    id: "9a94c56d-9ab2-4dd0-b7db-72dcace5a1e8",
    name: "Aldi",
    items: [
      { id: "e8b7a7d5-cdff-45c2-8cb3-01b95174045a", name: "Cereal" },
      { id: "f682f71e-99ac-4d7f-894a-20d6d36d2ae2", name: "Yogurt" },
    ],
    tint: 9,
  },
];
