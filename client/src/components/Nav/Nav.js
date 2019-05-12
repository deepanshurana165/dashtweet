import React from "react";
import { Link } from "react-router-dom";

export default function Nav(props) {
  return (
    <div>
      <nav className="navbar navbar-light bg-transparent position-absolute">
        <Link className="navbar-brand" to="/">
          <img
            src="https://cdn3.iconfinder.com/data/icons/christmas-cheer/128/cardinal-512.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt=""
          />
          <span className="mr-3 top-text">DashTweet</span>
        </Link>
      </nav>
    </div>
  );
}
