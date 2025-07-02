import * as React from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Fab from "@mui/material/Fab";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Avatar from "@mui/material/Avatar";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Link } from "react-router-dom";
import imageProfil from "../profile_mal.jpg";

const notifications = [
  {
    id: 1,
    primary: "User1 sent you a friend request",
    secondary: "Click to view the request",
    person: "/static/images/avatar/1.jpg",
    link: "/friend-requests",
  },
  {
    id: 2,
    primary: "User2 commented on your post",
    secondary: "Great post! Thanks for sharing.",
    person: "/static/images/avatar/2.jpg",
    link: "/comments",
  },
  {
    id: 3,
    primary: "User3 liked your photo",
    secondary: "Your photo is really awesome!",
    person: "/static/images/avatar/3.jpg",
    link: "/likes",
  },
  // Add more notifications as needed
];

const allstyle = {
  position: "absolute",
  top: "3.2rem",
  right: "-7.8rem",
  width: "350px",
  height: "300px",
  padding: " auto",
  borderRadius: "12px",
  backgroundColor: "rgb(255, 255, 255)",
  border: "1px solid rgb(219, 209, 218)",
  color: "black",
  overflow: "scroll",
};

const NotificationItem = ({ primary, secondary, person, link }) => (
  <ListItemButton component={Link} to={link}>
    <ListItemAvatar>
      <Avatar alt="Profile Picture" src={imageProfil} />
    </ListItemAvatar>
    <ListItemText primary={primary} secondary={secondary} />
  </ListItemButton>
);

export default function Example() {
  return (
    <React.Fragment>
      <div style={allstyle}>
        <Paper square sx={{ pb: "1px" }}>
          <Typography variant="h5" gutterBottom component="div" sx={{ p: 1, pb: 0 }}>
            Notifications
          </Typography>
          <List sx={{ mb: 1 }}>
            {notifications.map((notification) => (
              <React.Fragment key={notification.id}>
                {notification.id === 1 && (
                  <ListSubheader sx={{ bgcolor: "background.paper" }}>
                    Today
                  </ListSubheader>
                )}
                <NotificationItem {...notification} />
              </React.Fragment>
            ))}
            <Typography variant="h6" gutterBottom component="div" sx={{ p: 1, pb: 0 }}>
              <Link to="/all-notifications" style={{ color: "blue", fontWeight: "small", textDecoration: "underline" }}>
                View All
              </Link>
            </Typography>
          </List>
        </Paper>
      </div>
    </React.Fragment>
  );
}
