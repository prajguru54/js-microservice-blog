import React from "react";

const ListComments = ({ comments }) => {

  const renderComments = comments.map(comment=>{
    return <li key = {comment.id}>{comment.commentText}</li>
  })
  
  return <ul>{renderComments}</ul>;
};

export default ListComments;
