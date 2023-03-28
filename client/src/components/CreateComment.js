import React, { useState } from "react";
import axios from "axios";

const CreateComment = (props) => {
  const [text, setText] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    axios.post(`http://localhost:4001/posts/${props.postId}/comments`, {
      text,
    });
    setText('')
  };

  // const result = await fetch(
  //   `http://localhost:4001/posts/${props.postId}/comments`,
  //   {
  //     method: "POST",
  //     headers: {
  //       contentType: "application/json",
  //     },
  //     // body: { text: comment }, --> payload: [object Object]
  //     // body: JSON.stringify({ text: comment }), --> Request body: {}
  //     // body: JSON.stringify({ "text": comment }), --> Request body: {}
  //     // body: { "text": comment }, --> payload: [object Object]
  //     body: JSON.stringify({ text: comment }),
  //   }
  // );
  // console.log({ text: comment })
  // console.log(JSON.stringify({ text: comment }))

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Comment</label>
          <input
            className="form-control"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default CreateComment;
