import { useEffect, useState } from "react";
import AddBook from "./AddBook";
import "./BookDetails.css";

const BooksDetails = () => {
  const [bookData, setBookData] = useState({ title: "", desc: "" });
  const [allData, setAllData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const getBookData = (title, desc) => {
    const id = Math.random().toString();
    const newBook = { id, title, description: desc };

    localStorage.setItem(id, JSON.stringify(newBook));
    setAllData((prev) => [...prev, newBook]);
    setBookData({ title, desc });
  };

  useEffect(() => {
    const data = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      try {
        const value = JSON.parse(localStorage.getItem(key));
        if (value.title && value.description) {
          data.push({ id: key, ...value });
        }
      } catch (err) {
        console.error("Invalid JSON at key:", key);
      }
    }

    setAllData(data);
  }, []);

  const handleDelete = (id) => {
    localStorage.removeItem(id);
    setAllData((prev) => prev.filter((book) => book.id !== id));
  };

  // Filter logic
  const filteredBooks = allData.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
        <input
        type="text"
        placeholder="Search by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{  display:"flex", justifyContent:"center",alignItems:"center", padding: "5px", marginTop: "10px", width: "100vh" }}
      />
      <h3>Total available books are:{allData.length}</h3>
      <h3>Matching Books Count: {filteredBooks.length}</h3>
      <AddBook onSaveData={getBookData} />

      
      <ul>
        {filteredBooks.map((book) => (
          <li key={book.id}>
            {book.title} - {book.description}
            <button onClick={() => handleDelete(book.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BooksDetails;
