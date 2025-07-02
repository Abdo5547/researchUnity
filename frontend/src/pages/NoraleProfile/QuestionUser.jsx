import React, { useState, useEffect } from "react";
import "../Question/Afficher/Afficher.css";
import Question from "../Question/Afficher/Question";
import axios from "axios";
import AspectRatio from "@mui/joy/AspectRatio";
import Stack from "@mui/joy/Stack";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Skeleton from "@mui/joy/Skeleton";
import Typography from "@mui/joy/Typography";
import Box from "@mui/material/Box";
import AffQuestionUser from "./AffQuestionUser";
import { useLocation } from "react-router-dom";
const QuestionUser = () => {

  const location = useLocation();
  const idu = location.state.userId;
  console.log(location)
  const nvid = parseInt(idu, 10);
  console.log(nvid)


  const [pub, setPub] = useState([]);
  const [loading, setLoading] = useState(true);

  const [users, setUsers] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token && !nvid) {
      console.error("Aucun token trouvé. Veuillez vous connecter.");
      return;
    }
    fetch(`http://127.0.0.1:8000/api/profileuser/?user_id=${nvid}`, {
      
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
        setUsers(data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données :", error);
      });
  }, []);
  const quest = users.questions
  console.log(users)

  return (
    <div style={{marginTop:'-470px'}}>
      {users.questions && users.questions.length > 0 ? (
        pub.map((e) => <AffQuestionUser key={e.id} donner={e} />)
      ) : (
        <p>Aucune publication disponible.</p>
      )}
    </div>
  );
};

export default QuestionUser;
