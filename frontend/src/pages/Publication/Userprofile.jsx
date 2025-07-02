import React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import imageMale from "../../components/AppAppBar/profile_mal.jpg";
import imageFemale from "../../components/AppAppBar/profile_female.png";
import { useNavigate } from "react-router-dom";

const Userprofile = ({ donner, index }) => {


  const navigate = useNavigate();

  const navUser = () => {
    const lid = donner.id
    localStorage.setItem("userId", lid);
    navigate("/Home/Profile/ProfileUser", {
      state: {
        userId: donner.id,
      },
    });
  };

  return (
    <Box
    height={25}
    width={150}
    my={4}
    display="flex"
    alignItems="center"
    gap={1}
    p={1}
    sx={{ marginTop: "50px", cursor: "pointer" }}
    onClick={navUser}
  >
    <Avatar src={donner.gender === "Male" ? imageMale : imageFemale} />
    <small>
      {donner.first_name} {donner.last_name}
    </small>
  </Box>
  
  );
};

export default Userprofile;
