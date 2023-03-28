import React, { useState, useEffect } from "react";
import CreateComment from "./CreateComment";
import ListComments from "./ListComments";

const ListPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      // const response = await axios.get('http://localhost:4000/posts')
      // return response.data
      const response = await fetch("http://localhost:4002/events");
      const data = await response.json();
      console.log("Posts...");
      console.log(Object.values(data));
      setPosts(Object.values(data));
      // console.log(posts)
      // console.log(`Fetched posts from query: ${posts}`)
    };

    fetchPosts();
  }, []);
  const renderPosts = posts.map((post) => {
    return (
      <div
        className="card"
        key={post.id}
        style={{ width: "30%", marginBottom: "20px" }}
      >
        <div className="card-body">
          <h1>{post.content}</h1>
          <ListComments key={post.id} comments={post.comments} />
          <CreateComment key={post.id} postId={post.postId} />
        </div>
      </div>
    );
  });

  return (
    <div className="d-flex justify-content-between flex-row flex-wrap">
      {renderPosts}
    </div>
  );
};

export default ListPosts;
