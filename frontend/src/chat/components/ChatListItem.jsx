import * as React from 'react';
import Box from '@mui/joy/Box';
import ListDivider from '@mui/joy/ListDivider';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import CircularProgress from '@mui/material/CircularProgress'; // Importer CircularProgress pour le spinner de chargement
import { useState, useEffect } from 'react';

export default function ChatListItem(props) {
  const { id, sender, messages, selectedprjId, setSelectedprj } = props;

  const selected = selectedprjId === id;

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
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données :", error);
        setLoading(false); // Fin du chargement même en cas d'erreur
      });
  }, []);
  console.log(projettt)

  const trouverProjetParID = (id1) => {
    return projettt.find(projet => projet.id === id1);
  }
  
  const sep = trouverProjetParID(id);

  const formatMessageDate = (date) => {
    const messageDate = new Date(date);
    const now = new Date();
    const diff = now - messageDate;
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) {
      return 'Just now';
    } else if (minutes < 60) {
      return `${minutes} mins ago`;
    } else if (minutes < 1440) {
      return `${Math.floor(minutes / 60)} hours ago`;
    } else {
      return messageDate.toLocaleDateString();
    }
  };

  return (
    <React.Fragment>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
          <CircularProgress /> {/* Afficher un spinner de chargement */}
        </Box>
      ) : (
        <>
          <ListItem>
            <ListItemButton
              onClick={() => {
                setSelectedprj({ id, sender, messages });
              }}
              selected={selected}
              color="neutral"
              sx={{
                flexDirection: 'column',
                alignItems: 'initial',
                gap: 5,
              }}
            >
              <Stack direction="row" spacing={1.5}>
                <Box sx={{ flex: 3, margin: "100px" }}>
                  <Typography level="title-sm">PROJET : {sep ? sep.titre : "Projet introuvable"}</Typography>
                </Box>
                <Box
                  sx={{
                    lineHeight: 1.5,
                    textAlign: 'right',
                  }}
                >
                </Box>
              </Stack>
            </ListItemButton>
          </ListItem>
          <ListDivider sx={{ margin: 1 }} />
        </>
      )}
    </React.Fragment>
  );
}
