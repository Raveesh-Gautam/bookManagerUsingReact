import { useState } from "react";
import './AddBook.css';
const AddBook = (props) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    const title=event.target.title.value;
    const description=event.target.desc.value;
    if(title.trim().length===0)return ;
       if(desc.trim().length===0)return ;
    const bookData = {title,description}
    props.onSaveData(title,description);
setDesc("");
setTitle("");
    console.log(bookData);
  };
  const handleDesc = (event) => {
    setDesc(event.target.value);
  };
  const handleTitle = (event) => {
    setTitle(event.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input type="text" name="title" value={title} onChange={handleTitle} />
        <label htmlFor="desc">Description</label>
        <input type="text" name="desc"  value={desc} onChange={handleDesc} />
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AddBook;
