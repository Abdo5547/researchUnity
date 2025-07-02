import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import AppAppBar from "../../components/AppAppBar/AppAppBar";
import Homeee from "./Homeee";
import SearchBar from "../../components/SearchComponent/SearchBar";

axios.defaults.baseURL = 'http://127.0.0.1:8000';
axios.defaults.withCredentials = true;

const Home = () => {
  const [dataa, setDataa] = useState([]);
  const [token, setToken] = useState(null);
  const [donner, setDonner] = useState([]);

  useEffect(() => {
    const tokenFromCookie = Cookies.get('token');
    console.log(tokenFromCookie);
    if (tokenFromCookie) {
      setToken(tokenFromCookie);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/me/", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const apiData = response.data;
        setDonner(apiData);
        console.log(donner);
      } catch (error) {
        console.error("Une erreur s'est produite lors de la récupération des données :", error);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token]);

  const sortedDataer = dataer.sort((a, b) => {
    // Convert the date strings to Date objects for comparison
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB - dateA; // Sort in descending order (latest first)
  });

  return (
    <>
    <SearchBar/>
      {sortedDataer.map((e) => (
        <Homeee key={e.id} donner={e} />
      ))}
    </>
  );
};

export default Home;


 const dataer = [
  {
    id: 1,
    type: "Article",
    title: "The Impact of Quantum Computing on Cryptography",
    date: "November 2023",
    reads: 1240,
    citations: 56,
    mainAuthor: {
      firstName: "John",
      lastName: "Doe",
      image: "https://example.com/images/john_doe.jpg",
    },
    coAuthors: [
      {
        firstName: "Grace",
        lastName: "Thomas",
        image: "https://example.com/images/grace_thomas.jpg",
      },
      {
        firstName: "Sophia",
        lastName: "Walker",
        image: "https://example.com/images/sophia_walker.jpg",
      },
      {
        firstName: "Elijah",
        lastName: "Mitchell",
        image: "https://example.com/images/elijah_mitchell.jpg",
      },
    ],
  },
  {
    id: 2,
    type: "Conference Paper",
    title: "Advancements in Artificial Intelligence for Healthcare",
    date: "February 2024",
    reads: 1980,
    citations: 102,
    mainAuthor: {
      firstName: "Alice",
      lastName: "Johnson",
      image: "https://example.com/images/alice_johnson.jpg",
    },
    coAuthors: [
      {
        firstName: "Grace",
        lastName: "Thomas",
        image: "https://example.com/images/grace_thomas.jpg",
      },
      {
        firstName: "Sophia",
        lastName: "Walker",
        image: "https://example.com/images/sophia_walker.jpg",
      },
      {
        firstName: "Elijah",
        lastName: "Mitchell",
        image: "https://example.com/images/elijah_mitchell.jpg",
      },
    ],
  },
  {
    id: 3,
    type: "Book Chapter",
    title: "Machine Learning Techniques for Big Data",
    date: "May 2023",
    reads: 750,
    citations: 33,
    mainAuthor: {
      firstName: "Maria",
      lastName: "Garcia",
      image: "https://example.com/images/maria_garcia.jpg",
    },
    coAuthors: [
      {
        firstName: "Grace",
        lastName: "Thomas",
        image: "https://example.com/images/grace_thomas.jpg",
      },
      {
        firstName: "Sophia",
        lastName: "Walker",
        image: "https://example.com/images/sophia_walker.jpg",
      },
      {
        firstName: "Elijah",
        lastName: "Mitchell",
        image: "https://example.com/images/elijah_mitchell.jpg",
      },
    ],
  },
  {
    id: 4,
    type: "Journal Article",
    title: "Exploring Renewable Energy Sources for Sustainable Development",
    date: "July 2023",
    reads: 1260,
    citations: 78,
    mainAuthor: {
      firstName: "James",
      lastName: "Smith",
      image: "https://example.com/images/james_smith.jpg",
    },
    coAuthors: [
      {
        firstName: "Grace",
        lastName: "Thomas",
        image: "https://example.com/images/grace_thomas.jpg",
      },
      {
        firstName: "Sophia",
        lastName: "Walker",
        image: "https://example.com/images/sophia_walker.jpg",
      },
      {
        firstName: "Elijah",
        lastName: "Mitchell",
        image: "https://example.com/images/elijah_mitchell.jpg",
      },
    ],
  },
  {
    id: 5,
    type: "Conference Paper",
    title: "Applications of Blockchain Technology in Supply Chain Management",
    date: "September 2023",
    reads: 1550,
    citations: 92,
    mainAuthor: {
      firstName: "Sophie",
      lastName: "Johnson",
      image: "https://example.com/images/sophie_johnson.jpg",
    },
    coAuthors: [
      {
        firstName: "Grace",
        lastName: "Thomas",
        image: "https://example.com/images/grace_thomas.jpg",
      },
      {
        firstName: "Sophia",
        lastName: "Walker",
        image: "https://example.com/images/sophia_walker.jpg",
      },
      {
        firstName: "Elijah",
        lastName: "Mitchell",
        image: "https://example.com/images/elijah_mitchell.jpg",
      },
    ],
  },
  {
    id: 6,
    type: "Book Chapter",
    title:
      "Advances in Neurotechnology: Implications for Brain-Computer Interfaces",
    date: "March 2024",
    reads: 890,
    citations: 45,
    mainAuthor: {
      firstName: "Lucas",
      lastName: "Anderson",
      image: "https://example.com/images/lucas_anderson.jpg",
    },
    coAuthors: [
      {
        firstName: "Grace",
        lastName: "Thomas",
        image: "https://example.com/images/grace_thomas.jpg",
      },
      {
        firstName: "Sophia",
        lastName: "Walker",
        image: "https://example.com/images/sophia_walker.jpg",
      },
      {
        firstName: "Elijah",
        lastName: "Mitchell",
        image: "https://example.com/images/elijah_mitchell.jpg",
      },
    ],
  },
  {
    id: 7,
    type: "Journal Article",
    title: "The Role of Microorganisms in Soil Fertility",
    date: "April 2024",
    reads: 820,
    citations: 67,
    mainAuthor: {
      firstName: "Emma",
      lastName: "Brown",
      image: "https://example.com/images/emma_brown.jpg",
    },
    coAuthors: [
      {
        firstName: "Benjamin",
        lastName: "Wilson",
        image: "https://example.com/images/benjamin_wilson.jpg",
      },
      {
        firstName: "Natalie",
        lastName: "Evans",
        image: "https://example.com/images/natalie_evans.jpg",
      },
      {
        firstName: "William",
        lastName: "Johnson",
        image: "https://example.com/images/william_johnson.jpg",
      },
    ],
  },
  {
    id: 8,
    type: "Conference Paper",
    title: "Future Prospects of Artificial Intelligence in Education",
    date: "May 2024",
    reads: 1050,
    citations: 81,
    mainAuthor: {
      firstName: "Noah",
      lastName: "Miller",
      image: "https://example.com/images/noah_miller.jpg",
    },
    coAuthors: [
      {
        firstName: "Amelia",
        lastName: "Thompson",
        image: "https://example.com/images/amelia_thompson.jpg",
      },
      {
        firstName: "Amelia",
        lastName: "Thompson",
        image: "https://example.com/images/amelia_thompson.jpg",
      },
      {
        firstName: "Amelia",
        lastName: "Thompson",
        image: "https://example.com/images/amelia_thompson.jpg",
      },
      {
        firstName: "Amelia",
        lastName: "Thompson",
        image: "https://example.com/images/amelia_thompson.jpg",
      },
      {
        firstName: "Lucy",
        lastName: "Harris",
        image: "https://example.com/images/lucy_harris.jpg",
      },
      {
        firstName: "Jack",
        lastName: "Robinson",
        image: "https://example.com/images/jack_robinson.jpg",
      },
    ],
  },
];



