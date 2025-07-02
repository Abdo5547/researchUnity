// src/Notifications.js
import React from 'react';
import { Container, List, ListItem, ListItemAvatar, Avatar, ListItemText, Typography, Divider } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AppAppBar from '../../components/AppAppBar/AppAppBar'; // Assurez-vous que le chemin est correct

const Notifications = () => {
  return (
    <>
      <AppAppBar />

      <Container>
        <Typography variant="h4" gutterBottom>
          Notifications
        </Typography>
        <List>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <NotificationsIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Ayoub Hamdani started following your updates."
              secondary="Feb 24"
            />
          </ListItem>
          <Divider />
          {/* Ajoutez d'autres éléments de liste ici si nécessaire */}
        </List>
      </Container>
    </>
  );
};

export default Notifications;
