import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";
import imgaeeee from "../../image/oppao.png";
import image1 from "../../image/image1.jpg";
import image2 from "../../image/image2.jpg";
import Footer from "../../components/footer/Footer";

import { Box } from "@mui/material";

const token = localStorage.getItem("token");
console.log(token);

function HomePage() {
  const logoStyle = {
    width: "200px",
    height: "auto",
    cursor: "pointer",
  };

  return (
    <div className="homeContainer">
      <nav className="navbar">
        <Link to="/" className="logo">
          <Box
            sx={{
              flexGrow: 10,
              display: "flex",
              alignItems: "center",
              ml: "-10px",
            }}>
            <img src={imgaeeee} style={logoStyle} alt="logo of ResearchUnity" />
          </Box>
        </Link>
        <div className="navLinks">
          <Link to="/SignIn" className="navButton">
            Sign In
          </Link>
          <Link to="/SignUp" className="navButton">
            Sign Up
          </Link>
        </div>
      </nav>
      <header className="headerSection">
        <div className="textContainer">
          <h1>Explore the Future of Scientific Research</h1>
          <p>
            Discover a platform where collaboration transcends borders, powered
            by technology and innovation.
          </p><br/>
          <p>
            Join a global community of researchers and scholars, working
            together to solve the world's most pressing challenges.
          </p><br/>
          <p>
            Leverage cutting-edge tools and resources to enhance your research
            and achieve groundbreaking results.
          </p><br/>
          <p>
            Experience seamless collaboration with peers from around the world,
            breaking down barriers to knowledge sharing and innovation.
          </p><br/>
          <p>
            Stay ahead of the curve with access to the latest research, trends,
            and advancements in your field.
          </p><br/>

          <p>
            Transform your research with innovative solutions and a network of
            support, ensuring your success and impact.
          </p><br/>
          <p>
            Embrace a future where research is driven by collaboration,
            innovation, and a shared vision for a better world.
          </p><br/>
        </div>
        <img src={image1} alt="Banner of Research" className="bannerImage" />
      </header>
      <header className="headerSection">
        <section className="intro">
          <h2>Our Mission</h2>
          <p>
            As part of our university project, under the guidance of Madame
             <u>Faouzia Benabbou</u> and <u>Yassir Matrane</u> our supervisor, we created
            this platform to enhance scientific communication through
            interactive tools, facilitating the exchange of ideas and the
            sharing of research within the academic community.
          </p>

          <p>
            Our goal is to bridge the gap between researchers, fostering a
            collaborative environment where knowledge and innovation thrive.
          </p>
          <p>
            By providing cutting-edge resources and a user-friendly interface,
            we aim to streamline the research process and promote
            interdisciplinary collaboration.
          </p>
          <p>
            We believe that open communication and accessibility are key to
            advancing scientific discovery and addressing global challenges.
          </p>
          <p>
            Our platform is designed to support researchers at all stages of
            their careers, offering tools that enhance productivity and
            facilitate impactful research.
          </p>
          <p>
            We are committed to creating a dynamic and inclusive space where
            ideas can be freely exchanged and new connections can be made.
          </p>
          <p>
            Through our efforts, we aspire to contribute to the global academic
            community, driving progress and innovation in science and
            technology.
          </p>
        </section>

        <img src={image2} alt="Banner of Research" className="bannerImage2" />
        <div className="textContainer">
          <section className="tools">
            <h2>Interactive Tools</h2>
            <ul >
              <li style={{ listStyleType: "square"}}>Discussion forums for dynamic idea exchange</li>
              <li style={{ listStyleType: "square"}} >
                Document sharing systems for rapid dissemination of discoveries
              </li>
              <li style={{ listStyleType: "square"}}>Networking tools to establish professional connections</li>
              <li style={{ listStyleType: "square"}}>
                Virtual collaboration spaces for real-time brainstorming
                sessions
              </li>
              <li style={{ listStyleType: "square"}}>
                Interactive visualization tools for data analysis and
                presentation
              </li>
            </ul>
            <br/>
            <p>
              These interactive tools, developed under the guidance of Madame
              Benabbou and Yassie Matrane, facilitate seamless collaboration and
              knowledge sharing within the academic community.
            </p>
          </section>
        </div>
      </header>

      <section className="quotes">
        <h2>Inspirations</h2>
        <blockquote>
          “Science is a perpetual collaboration.” - Carl Sagan
        </blockquote>
        <p>
          Carl Sagan's words remind us that progress in science is driven by the
          collective efforts of many, working together towards a common goal.
        </p>
        <blockquote>
          “The future belongs to those who believe in the beauty of their
          dreams.” - Eleanor Roosevelt
        </blockquote>
        <p>
          Eleanor Roosevelt's timeless wisdom inspires us to pursue our dreams
          with passion and determination, knowing that they have the power to
          shape our future.
        </p>
        <blockquote>
          “In the midst of chaos, there is also opportunity.” - Sun Tzu
        </blockquote>
        <p>
          Sun Tzu's insight speaks to the resilience of the human spirit,
          reminding us to seek opportunity even in the face of adversity.
        </p>
      </section>

      <section className="call-to-action">
        <h2>Join Our Community</h2>
        <p>
          Participate in the revolution of collaborative research. Sign up today
          and start exploring, sharing, and collaborating.
        </p>
        <button
          className="homeButton"
          onClick={() => (window.location.href = "/SignUp")}>
          Sign Up Now
        </button>
      </section>
      <Footer />
    </div>
  );
}

export default HomePage;
