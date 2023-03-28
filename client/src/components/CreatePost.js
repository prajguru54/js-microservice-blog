import axios from "axios";
import React, { useState } from "react";

const CreatePost = () => {
  const [title, setTitle] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    axios.post("http://localhost:4000/posts", {
      title,
    });

    setTitle("");
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Post title</label>
          <input
            className="form-control"
            placeholder="type here"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          ></input>
          <button className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
