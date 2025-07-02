import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

import { Box, Card, Grid, Typography } from "@mui/joy";
import imageMale from "../../../components/AppAppBar/profile_mal.jpg";
import imageFemale from "../../../components/AppAppBar/profile_female.png";
import { ToastContainer, toast } from "react-toastify";
import { Avatar, Button, Chip } from "@mui/material";
import ButtonGroup from "@mui/material/ButtonGroup";
import IconButton from "@mui/material/IconButton";
import ShareIcon from "@mui/icons-material/Share";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { TiUserDelete, TiUserAdd } from "react-icons/ti";
import Answer from "./commentaire/Commentaire";
import CommentIcon from "@mui/icons-material/Comment";
import ModaleReponse from "./ModalReponse";
import axios from "axios";

const QuestionDetail = () => {
  const location = useLocation();
  const idq = location.state.questionId;
  console.log(idq);

  const [question, setQuestion] = useState(null);
  const [pub, setPub] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recommended, setRecommended] = useState(false);
  const [followed, setFollowed] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [modalContent1, setModalContent1] = useState(
    "Ask a technical question"
  );

  const formattedDate = (dateString) => {
    const currentDate = new Date();
    const date = new Date(dateString);
    const differenceInMilliseconds = currentDate - date;
    const differenceInDays = Math.floor(
      differenceInMilliseconds / (1000 * 60 * 60 * 24)
    );
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Aucun token trouvé. Veuillez vous connecter.");
      return;
    }

    fetch("http://127.0.0.1:8000/api/listquest/", {
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
        const foundQuestion = data.find((q) => q.id === idq);
        setQuestion(foundQuestion);
        setLoading(false);

        // Effectuer des actions supplémentaires une fois que la question est récupérée
        console.log("Question récupérée :", foundQuestion);
        // Autres actions à effectuer ici...
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données :", error);
        setLoading(false);
      });
  }, []);

  console.log(question);

  const [people, setPeople] = useState([]);
  const [follow, setFollow] = useState([]);
  const [d, setD] = useState([]);

  // Modifiez votre useEffect pour récupérer uniquement les trois premières personnes
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Aucun token trouvé. Veuillez vous connecter.");
      return;
    }
    fetch("http://127.0.0.1:8000/api/users/", {
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
        // Sélectionnez les trois premières personnes
        const firstThreePeople = data.slice(13, 16);
        setPeople(firstThreePeople);
        const firstThh = data.slice(5, 8);
        setFollow(firstThh);

        const firstThhr = data.slice(9, 12);
        setD(firstThhr);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données :", error);
      });
  }, []);

  const [isFollowing, setIsFollowing] = useState({});

  const handleClick = (id) => {
    setIsFollowing((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleRecommendClick = async () => {
    const newRecommendState = !recommended;
    setRecommended(newRecommendState);

    const savedRecommendations =
      JSON.parse(localStorage.getItem("savedRecommendations")) || {};
    savedRecommendations[question.id] = newRecommendState;
    localStorage.setItem(
      "savedRecommendations",
      JSON.stringify(savedRecommendations)
    );

    try {
      if (newRecommendState) {
        const response = await axios.post(
          `http://127.0.0.1:8000/api/recommend/`,
          {
            question_id: question.id,
          },
          {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log("Recommendation sent successfully:", response.data);
        toast.success("Question recommended successfully!");
      } else {
        const response = await axios({
          method: "delete",
          url: `http://127.0.0.1:8000/api/unrecommend/`,
          data: {
            question_id: question.id,
          },
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        });
        console.log("Recommendation removed successfully:", response.data);
        toast.info("Recommendation removed successfully!");
      }
    } catch (error) {
      console.error("Error handling recommendation:", error);
      toast.error("An error occurred while handling the recommendation.");
    }
  };

  const handleFollowedClick = async () => {
    const newFollowState = !followed;
    setFollowed(newFollowState);

    const savedFollows = JSON.parse(localStorage.getItem("savedFollows")) || {};
    savedFollows[question.id] = newFollowState;
    localStorage.setItem("savedFollows", JSON.stringify(savedFollows));

    try {
      if (newFollowState) {
        const response = await axios.post(
          `http://127.0.0.1:8000/api/follow/`,
          {
            question_id: question.id,
          },
          {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log("Follow request sent successfully:", response.data);
        toast.success("Question followed successfully!");
      } else {
        const response = await axios({
          method: "delete",
          url: `http://127.0.0.1:8000/api/unfollow/`,
          data: {
            question_id: question.id,
          },
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        });
        console.log("Unfollow request sent successfully:", response.data);
        toast.info("Unfollowed question successfully!");
      }
    } catch (error) {
      console.error("Error handling follow request:", error);
      toast.error("An error occurred while handling the follow request.");
    }
  };

  useEffect(() => {
    const savedRecommendations =
      JSON.parse(localStorage.getItem("savedRecommendations")) || {};
    const savedFollows = JSON.parse(localStorage.getItem("savedFollows")) || {};
    setRecommended((question && savedRecommendations[question.id]) || false);
    setFollowed((question && savedFollows[question.id]) || false);
  });

  const handleOpen1 = () => {
    console.log(5545);
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
    setModalContent1("");
  };


  console.log(question)

  return (
    <div>
      <Box
        sx={{
          flex: 1,
          width: "1300px",
          marginLeft: "-150px",
          width: "calc(130% - 14px)",
          marginTop: "-40px"
          ,marginLeft:"150px"

        }}>
        {/* Affichage des publications */}
        <Grid
          container
          spacing={4}
          sx={{
            maxWidth: "1200px",
            mx: "auto",
            px: { xs: 2, md: 3 },
            py: { xs: 2, md: 3 },
          }}>
          {" "}
          <Grid item xs={12} md={8}>
            <ToastContainer />

            <div>
              {loading ? (
                // Afficher une indication de chargement ici
                <p>Loading...</p>
              ) : (
                <>
                  <div className="publication-card" style={{ marginTop: 25 , width:1100 }}>
                    <Box
                      height={60}
                      width="100%"
                      my={0.5}
                      display="flex"
                      alignItems="center"
                      maxWidth={1200}
                      gap={3}
                      p={0}>
                      <Box
                        height={50}
                        width={60}
                        display="block"
                        marginRight="-30px">
                        <Avatar
                          src={
                            question.auteur.gender === "Male"
                              ? imageMale
                              : imageFemale
                          }
                        />
                      </Box>
                      <Box>
                        <Box height={28} width={208} display="block">
                          {question.auteur.first_name}{" "}
                          {question.auteur.last_name}
                        </Box>
                        <Box
                          height={28}
                          width={200}
                          sx={{ fontSize: "small" }}
                          display="block">
                          {`added a ${question.type}`}
                        </Box>
                      </Box>
                      <Box flex="1" display="flex" justifyContent="flex-end">
                        <small>{formattedDate}</small>
                      </Box>
                    </Box>
                    <hr style={{ marginBottom: "18px" }} />
                    <Link
                      to={{
                        pathname: "/Home/Question/QuestionDetail",
                        state: { questionId: "lolo" },
                      }}
                      style={{ textDecoration: "none", color: "inherit" }}>
                      <h3 style={{ marginBottom: "15px", fontWeight: "bold" }}>
                        {question.titre}
                      </h3>
                    </Link>
                    <div style={{ marginBottom: "10px" }}>
                      <ButtonGroup disableElevation variant="contained">
                        <Button
                          variant="contained"
                          color="secondary"
                          size="small"
                          sx={{ marginRight: "10px" }}>
                          New
                        </Button>
                        <Button
                          variant="outlined"
                          color="secondary"
                          size="small"
                          sx={{ marginRight: "10px" }}>
                          Discussion
                        </Button>
                        <Button
                          variant="outlined"
                          color="secondary"
                          size="small"
                          sx={{ marginRight: "10px" }}>
                          {question.reply} reply
                        </Button>
                      </ButtonGroup>
                    </div>
                    <Box maxHeight={"100px"} overflow="hidden" marginTop="20px">
                      <div
                        style={{
                          marginBottom: "10px",
                          whiteSpace: "pre-wrap",
                        }}>
                        <p>{question.contenu}</p>
                      </div>
                    </Box>

                    <hr style={{ marginBottom: "18px", marginTop: "18px" }} />
                    <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
                      {question.auteur.keywords
                        .split(",")
                        .map((keyword, index) => (
                          <Chip
                            key={index}
                            label={keyword.trim()}
                            color="secondary"
                            variant="outlined"
                          />
                        ))}
                    </Box>
                    <hr style={{ marginBottom: "18px", marginTop: "18px" }} />
                    <Box
                      display="flex"
                      alignItems="center"
                      flexDirection={{ xs: "column", sm: "row" }}
                      justifyContent={{ xs: "center", sm: "space-between" }}
                      padding={1}
                      marginTop={4}
                      sx={{ width: "100%", maxWidth: 900 }}>
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="left">
                        <IconButton
                          onClick={handleRecommendClick}
                          color="secondary">
                          {recommended ? <AiFillLike /> : <AiOutlineLike />}
                        </IconButton>
                        <Typography
                          variant="body2"
                          sx={{
                            marginRight: 2,
                            cursor: "pointer",
                          }}
                          onClick={handleRecommendClick}>
                          {recommended ? "Recommended" : "Recommend"}
                        </Typography>
                        <IconButton
                          onClick={handleFollowedClick}
                          color="secondary">
                          {followed ? <TiUserDelete /> : <TiUserAdd />}
                        </IconButton>
                        <Typography
                          variant="body2"
                          sx={{ marginRight: 2, cursor: "pointer" }}
                          onClick={handleFollowedClick}>
                          {followed ? "Followed" : "Follow"}
                        </Typography>
                      </Box>
                      <Box
                        display="flex"
                        justifyContent="flex-end"
                        alignItems="center">
                        <Button onClick={handleOpen1}>
                          <IconButton color="secondary">
                            <CommentIcon />
                          </IconButton>
                          Reply
                        </Button>
                      </Box>
                    </Box>
                  </div>

                  <div
                    style={{
                      fontWeight: "bold",
                      marginLeft: "-340px",
                      marginTop: "20px",
                      marginBottom: "20px",
                      
                    }}>
                    all response
                  </div>
                  <hr style={{ marginBottom: "-20px",marginLeft: "-340px", }} />

                  {commentaire &&
                    commentaire.map((publication, index) => (
                      <Answer key={index} donner={publication} />
                    ))}
                </>
              )}
            </div>
          </Grid>
          
        </Grid>
      </Box>

      <ModaleReponse
        open={open1}
        handleClose={handleClose1}
        content={modalContent1}
      />
    </div>
  );
};

export default QuestionDetail;

const commentaire = [
  {
    id: 1,
    auteur: {
      first_name: "Alice",
      last_name: "Smith",
      gender: "Female",
    },
    contenu: "Ceci est un commentaire intéressant.",
    date: "2024-06-20",
    idQ: 2,
    reply: [
      {
        id: 1,
        contenu: "Merci pour ce commentaire!",
        date: "2024-06-21",
        idReply: 1,
      },
    ],
  },
  {
    id: 2,
    auteur: {
      first_name: "Bob",
      last_name: "Johnson",
      gender: "Male",
    },
    contenu: "Je suis d'accord avec ce qui a été dit.",
    date: "2024-06-22",
    idQ: 3,
    reply: [],
  },
  {
    id: 3,
    auteur: {
      first_name: "Eva",
      last_name: "Brown",
      gender: "Female",
    },
    contenu: "Ce sujet me passionne beaucoup.",
    date: "2024-06-25",
    idQ: 4,
    reply: [
      {
        id: 1,
        contenu: "Oui, c'est vraiment intéressant!",
        date: "2024-06-26",
        idReply: 1,
        auteur: {
          first_name: "Evaol",
          last_name: "Bdown",
          gender: "Female",
        },
      },
    ],
  },
  {
    id: 4,
    auteur: {
      first_name: "David",
      last_name: "Wilson",
      gender: "Male",
    },
    contenu: "Je ne suis pas sûr de comprendre ce point.",
    date: "2024-06-27",
    idQ: 5,
    reply: [],
  },
  {
    id: 5,
    auteur: {
      first_name: "Sophie",
      last_name: "Miller",
      gender: "Female",
    },
    contenu: "J'aimerais en savoir plus à ce sujet.",
    date: "2024-06-30",
    idQ: 6,
    reply: [
      {
        id: 1,
        contenu:
          "Je peux vous fournir plus d'informations si vous le souhaitez.",
        date: "2024-07-01",
        idReply: 1,
        auteur: {
          first_name: "Evaol",
          last_name: "Bdown",
          gender: "Female",
        },
      },
      {
        id: 2,
        contenu:
          "Je peux vous fournir plus d'informations si vous le souhaitez.",
        date: "2024-07-01",
        idReply: 1,
        auteur: {
          first_name: "Evaol",
          last_name: "Bdown",
          gender: "Female",
        },
      },
      {
        id: 2,
        contenu:
          "Je peux vous fournir plus d'informations si vous le souhaitez.",
        date: "2024-07-01",
        idReply: 1,
        auteur: {
          first_name: "Evaol",
          last_name: "Bdown",
          gender: "Female",
        },
      },
    ],
  },
];
