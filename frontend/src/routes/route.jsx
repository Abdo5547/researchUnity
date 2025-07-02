import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/Home/HomePage";
import Publication from "../pages/Publication/Publication";
import PublicationDetail from "../pages/Publication/PublicationDetail";
import Authors from "../pages/Publication/Authors";
import Home from "../pages/Publication/Home";
import SignUp from "../pages/sign/SignUp";
import SignIn from "../pages/sign/SignIn";
import Notification from "../pages/Notification/Notification";
import SetQuestion from "../pages/Question/Publier/SetQuestion";
import QuestionFollow from "../pages/Question/Afficher/QuestionFollow";
import QuestionLiked from "../pages/Question/Afficher/QuestionLiked";
import QuestionInterest from "../pages/Question/Afficher/QuestionInterest";
import ForgetPassword from "../pages/sign/ForgetPassword";
import Verification from "../pages/sign/Verification";
import Message from "../chat/Message";
import RootLayout from "./RootLayout";
import RootLayout2 from "./RootLayout2";
import RootLayout3 from "./RootLayout3";
import RootLayoutMessage from "./RootLayoutMessage";
import ProfilePage from "../pages/UserProfilePage/ProfilePage";
import SetProjet from "../pages/Projet/setProjet";
import ProfileQuestion from "../pages/UserProfilePage/ProfileQuestion";
import ProfilePublication from "../pages/UserProfilePage/ProfilePublication";
import SavedListe from "../pages/UserProfilePage/SavedListe";
import RootLayoutProfile from "./RootLayoutProfile";
import ProfileUser from "../pages/NoraleProfile/ProfileUser";
import QuestionDetail from "../pages/Question/Afficher/QuestionDetail";
import DisplayDocument from "../pages/Publication/DisplayDocument";
import PublicationUser from "../pages/NoraleProfile/PublicationUser";
import QuestionUser from "../pages/NoraleProfile/QuestionUser";
import ProfilePublicationRecommanded from "../pages/UserProfilePage/ProfilePublicationsRecommanded";
import ProfilePublicationFollowed from "../pages/UserProfilePage/ProfilePublicationFollowed";

export const router = createBrowserRouter([
  {
    path: "/Home",
    element: <RootLayout />,
    children: [
      { path: "/Home/Publication", element: <Publication /> },
      { path: "/Home/Projet", element: <SetProjet /> },
      { path: "/Home/Authors", element: <Authors /> },
      {
        path: "/Home/Home/PublicationDetail/:id",
        element: <PublicationDetail />,
      },

      { path: "/Home/Home", element: <Home /> },
      { path: "/Home/Notification", element: <Notification /> },
      { path: "/Home/Profile", element: <ProfilePage /> },
      {
        path: "/Home/Question/QuestionDetail/",
        element: <QuestionDetail />,
      },
      {
        path: "/Home/Question/",
        element: <RootLayout2 />,
        children: [
          {
            path: "/Home/Question/QuestionFollow",
            element: <QuestionFollow />,
          },
          { path: "/Home/Question/QuestionLiked", element: <QuestionLiked /> },
          {
            path: "/Home/Question/QuestionInterest",
            element: <QuestionInterest />,
          },
        ],
      },
      {
        path: "/Home/ProfileUser/",
        element: <RootLayout3 />,
        children: [
          {
            path: "/Home/ProfileUser/Publications",
            element: <ProfilePublication />,
          },
          { path: "/Home/ProfileUser/Questions", element: <ProfileQuestion /> },
          { path: "/Home/ProfileUser/SavedListe", element: <SavedListe /> },
          { path: "/Home/ProfileUser/RecommandedPublications", element: <ProfilePublicationRecommanded /> },
          { path: "/Home/ProfileUser/FollowedPublications", element: <ProfilePublicationFollowed /> },

        ],
      },
      { path: "/Home/Message", element: <Message /> },
      { path: "/Home/Authors", element: <Authors /> },

      {
        path: "/Home/Profile/ProfileUser/",
        element: <RootLayoutProfile />,
        children: [
          {
            path: "/Home/Profile/ProfileUser/Publications",
            element: <PublicationUser />,
          },
          {
            path: "/Home/Profile/ProfileUser/Questions",
            element: <QuestionUser />,
          },
        ],
      },
    ],
  },
  { path: "/", element: <HomePage /> },
  { path: "/SignUp", element: <SignUp /> },
  { path: "/SignIn", element: <SignIn /> },
  { path: "/ForgetPassword", element: <ForgetPassword /> },
  { path: "/Verification", element: <Verification /> },
  { path: "/display/:id", element: <DisplayDocument /> },
  
  {
    path: "/Home/Chat/",
    element: <RootLayoutMessage />,
    children: [{ path: "/Home/Chat/GroupeChat", element: <Message /> }],
  },
  { path: "/Home/ProfileUser", element: <Verification /> },
]);
