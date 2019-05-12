import React from "react";
import "./tweet.css";
import GoogleFontLoader from "react-google-font-loader";

export default function Tweet(props) {
  return (
    <div className="tweet">
      <GoogleFontLoader
        fonts={[
          {
            font: "Gugi",
            weights: [400, "400i"]
          },
          {
            font: "Quicksand",
            weights: [400, 700]
          },
          {
            font: "Muli",
            weights: [900]
          },
          {
            font: "Montserrat",
            weights: [400]
          }
        ]}
        subsets={["cyrillic-ext", "greek"]}
      />
      <div className="container d-flex flex-row justify-content-center">
        <div
          className="image m-3"
          style={{ backgroundImage: `url(${props.image})` }}
        />
        <div className="text p-3 m-3 animated pulse delay-1s">
          <span className="name font-weight-bolder text-black text-uppercase">
            {props.name}
          </span>
          <br />
          <span className="username text-black">@{props.username}</span>
          <br />
          <span className="date">{props.date}</span>
          <br />
          {props.text}
        </div>
      </div>
    </div>
  );
}
