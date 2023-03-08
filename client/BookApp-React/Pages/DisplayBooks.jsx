import React, { useEffect, useState } from "react";
// import fetchBooks from './GetAllBooks'
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { SpecificBooks } from "./SpecificBooks";
import { Container} from "@chakra-ui/react";

export default function DisplayBooks() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const allBooks = await axios.get("http://localhost:8080/books");
        console.log(allBooks);
        if (allBooks.status === 200) {
          setBooks(allBooks.data.books);
        } else {
          return null;
        }
      } catch (error) {
        console.log("Oh no, something went wrong", error);
      }
    };

    fetchBooks();
  }, []);

  //Eduardo map throught the books state. And display the data. Could do it here or make a new component that takes in props
  return (
    <div className="Novels">
      {books.map((item) => (
         <Link to={`/viewbooks/${item.id}`}>
       <Container border="1px" bg="Gray" p={4} color="white">
            <h1>{item.title}</h1>
            <h2>{item.genre}</h2>
            <p>{item.desc}</p>
            </Container>
       </Link>
       
      ))}
    </div>
  );
}
