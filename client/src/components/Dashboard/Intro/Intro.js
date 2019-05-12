import React from "react";
import './intro.css';
export default function Intro(props) {
  console.log(props.bannerUrl)
  return (
    <div className="intro" style={{backgroundImage:props.bannerUrl}}>
      <div className="container d-flex justify-content-center align-items-center flex-column ">
        <div className="heading mt-4">Hello</div>
        <div
          className="main-image"
          style={{ backgroundImage: `url(${props.avatar})` }}
        />
        <div className="main-name">{props.name}</div>
        <h4>@{props.username}</h4>
      </div>
    </div>
  );
}
