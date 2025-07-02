import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import image777 from '../../image/RUlogo.png';
import Footer from "../../components/footer/Footer";
import { useNavigate } from "react-router-dom";

const logoStyle = {
  width: "300px",
  height: "auto",
  cursor: "pointer",
  margin: "-100px 0px -40px 0px",
};


const defaultTheme = createTheme();

const Verification = () => {


const navigate = useNavigate()
function nav(){
navigate("/SignIn")
}


  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: 8,
          }}
        >
          <img src={image777} alt="Logo" style={logoStyle} />
          <Typography component="h1" variant="h5" sx={{ mt: 2 }}>
          Your account has been successfully registered.          </Typography>
          <Typography variant="body1" sx={{ mt: 2, textAlign: 'center' }}>
          Click on the Sign In button to log in.      </Typography>
          <Button
            variant="contained"
            color="secondary"
            sx={{ mt: 4 }}
            onClick={nav}
          >
            Sign in
          </Button>
        </Box>
      </Container>
      <Footer />
    </ThemeProvider>
  );
};

export default Verification;
