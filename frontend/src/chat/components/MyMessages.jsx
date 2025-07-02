import * as React from "react";
import Sheet from "@mui/joy/Sheet";
import CircularProgress from "@mui/material/CircularProgress"; // Importer CircularProgress pour le spinner de chargement
import Box from "@mui/material/Box"; // Importer Box pour le conteneur du spinner

import MessagesPane from "./MessagesPane";
import ChatsPane from "./ChatsPane";
import { useEffect, useState } from "react";
import axios from "axios";

export default function MyProfile() {
  const [message, setMessage] = useState([]);
  const [chat, setChat] = useState([]);
  const [projettt, setProjettt] = useState([]);
  const [loading, setLoading] = useState(true); // État de chargement

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Aucun token trouvé. Veuillez vous connecter.");
      setLoading(false);
      return;
    }
    fetch("http://127.0.0.1:8000/api/projects/", {
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
        setProjettt(data);
        setLoading(false); // Fin du chargement
        if (data.length > 0) {
          setSelectedProjet(data[0]);
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données :", error);
        setLoading(false); // Fin du chargement même en cas d'erreur
      });
  }, []);
  console.log(projettt)

  const [selectedProjet, setSelectedProjet] = useState(null);

  return (
    <Sheet
      sx={{
        flex: 1,
        width: "100%",
        mx: "auto",
        pt: { xs: "var(--Header-height)", sm: -1 },
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "minmax(min-content, min(30%, 400px)) 1fr",
        },
      }}
    >
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress /> {/* Afficher un spinner de chargement */}
        </Box>
      ) : (
        <>
          <Sheet
            sx={{
              position: { xs: "fixed", sm: "sticky" },
              transform: {
                xs: "translateX(calc(100% * (var(--MessagesPane-slideIn, 0) - 1)))",
                sm: "none",
              },
              transition: "transform 0.4s, width 0.4s",
              zIndex: 100,
              width: "100%",
              top: 52,
            }}
          >
            <ChatsPane
              prj={projettt}
              selectedprjId={selectedProjet?.id}
              setSelectedprj={setSelectedProjet}
            />
          </Sheet>
          <MessagesPane prjo={selectedProjet} id={selectedProjet} />
        </>
      )}
    </Sheet>
  );
}
