import React from "react";
import CreatePost from "./components/CreatePost";
import ListPosts from "./components/ListPosts";

const App = () => {
    return (
        <div className="container">
            <h1>Blog App</h1>
            <CreatePost/>
            <hr/>
            <ListPosts/>
        </div>
    );
};

export default App;
