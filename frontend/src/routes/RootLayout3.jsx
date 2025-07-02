import { Outlet } from "react-router-dom";
import AppAppBar from "../components/AppAppBar/AppAppBar";
import Footer from "../components/footer/Footer";
import SetQuestion from "../pages/Question/Publier/SetQuestion";
import MyProfile from "../pages/UserProfilePage/ProfilePage";

function RootLayout2() {
  return (
    <>
      <MyProfile />
      <Outlet />
    </>
  );
}
export default RootLayout2;
