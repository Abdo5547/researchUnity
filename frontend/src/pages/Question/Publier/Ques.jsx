import React, { useState, useEffect } from "react";
import "./SetQuestion.css";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Button,
  Stack,
  Avatar,
  Box,
  Tabs,
  Tab,
} from "@mui/material";
import profile from "../../../components/AppAppBar/profile_mal.jpg";
import CustomModal from "./CustomModalQues"; // Assurez-vous que le chemin est correct
import CustomModalQues from "./CustomModalQues";
import CustomModalDesc from "./CustomModalDesc";

const Ques = () => {
  
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [modalContent1, setModalContent1] = useState("Ask a technical question");
  const [modalContent2, setModalContent2] = useState("Start a discussion");
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const tabPaths = ["/Home/Question/QuestionInterest", "/Home/Question/QuestionFollow", "/Home/Question/QuestionLiked"];

  useEffect(() => {
    // Set the initial value based on the current path
    const currentPath = window.location.pathname;
    const currentTab = tabPaths.indexOf(currentPath);
    setValue(currentTab === -1 ? 0 : currentTab);
  }, []);

  const handleOpen1 = () => {
    console.log(5545)
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
    setModalContent1("");
  };

  const handleOpen2 = () => {
    console.log(1234)
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
    setModalContent2("");
  };

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
    navigate(tabPaths[newValue]);
  };

  return (
    <div className="containerr">
      <div style={{ justifyContent: "center", width: "1000px", marginLeft: "50px" }}>
        <Typography variant="subtitle1">
          Ask a technical question to get answers from experts, or start a scientific discussion with your peers.
        </Typography>
        <Stack direction="row" spacing={3} margin={1}>
          <Avatar src={profile} style={{ margin: "10px" }}></Avatar>
          <Button
            sx={{ height: "50px" }}
            variant="contained"
            size="small"
            color="secondary"
            onClick={handleOpen1}
          >
            Ask a technical question
          </Button>
          <Button
            sx={{ height: "50px" }}
            variant="outlined"
            size="small"
            color="secondary"
            onClick={handleOpen2}
          >
            Start a discussion
          </Button>
        </Stack>
        <Typography variant="subtitle1">
          Questions we think you can answer
        </Typography>
        <Box sx={{ display: { xs: "none", md: "flex", fontSize: "small" } }}>
          <Box sx={{ width: "100%" }}>
            <Box
              sx={{
                borderBottom: 0,
                borderColor: "divider",
                marginTop: "17px",
                marginLeft: "15px",
              }}
            >
              <Tabs
                value={value}
                onChange={handleTabChange}
                indicatorColor="secondary"
                textColor="secondary"
              >
                <Tab label="Questions we think you can answer" />
                <Tab label="Questions you follow" />
                <Tab label="Questions you liked" />
              </Tabs>
            </Box>
          </Box>
        </Box>
      </div>
      <CustomModalDesc open={open1} handleClose={handleClose1} content={modalContent1} />
      <CustomModalQues open={open2} handleClose={handleClose2} content={modalContent2} />
    </div>
  );
};

export default Ques;
