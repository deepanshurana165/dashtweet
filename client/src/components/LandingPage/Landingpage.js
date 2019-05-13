import React, { Component } from "react";
import GoogleFontLoader from "react-google-font-loader";
import Nav from "../Nav/Nav";
import "../../../node_modules/bootstrap/dist/css/bootstrap.css";
import "./style.css";

export default class landingpage extends Component {
  state = {
    username: ""
  };

  onUsernameChange = e => {
    this.setState({ username: e.target.value });
  };

  clickHandler = e => {
    e.preventDefault();
    if (this.state.username !== "") {
      this.props.history.push("/tweets/" + this.state.username);
    }
  };

  render() {
    return (
      <div className="landing-page">
        <GoogleFontLoader
          fonts={[
            {
              font: "Knewave",
              weights: [400, "400i"]
            },
            {
              font: "Ubuntu",
              weights: [400, 700]
            }
          ]}
          subsets={["cyrillic-ext", "greek"]}
        />

        <div className="background" />
        <div className="shade" />
        <div className="container">
          <Nav />
          <div className="text-box">
            <h1 className="heading-primary">
              <span className="heading-primary-main">DashTweet</span>
              <span className="heading-primary-sub">A Tweet Dashboard</span>
            </h1>
            <div className="my-2 form">
              <form onSubmit={this.clickHandler}>
                <input
                  type="text"
                  value={this.state.username}
                  placeholder="Enter Username"
                  className="px-3 "
                  onChange={this.onUsernameChange}
                />
                <br />
                  <button className="mt-3 text-center mx-auto">Search</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
