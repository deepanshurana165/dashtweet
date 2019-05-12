import React, { Component } from "react";
import "./buttons.css";
export default class Buttons extends Component {
  state = {
    searchQuery: "",
    nchars: 500
  };

  onChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
    return (
      <div className="buttons">
        <div
          className="d-flex flex-row justify-content-center text-center all-buttons mb-4"
          id="section2"
        >
          <a href="#section2">
            <button
              className="btn btn-large btn-outline-light m-2"
              onClick={this.props.getTweets}
            >
              My Tweets
            </button>
            <button
              className="btn btn-large btn-outline-light m-2"
              onClick={this.props.getFriends}
            >
              Followers' Tweets
            </button>
            <button
              className="btn btn-large btn-outline-light m-2"
              onClick={this.props.getTrendingTweets}
            >
              Trending Tweets
            </button>
          </a>
        </div>

        <div className="d-flex flex-column align-items-center justify-content-center text-center input">
          <div>
            <input
              type="text"
              placeholder="Type to search in tweets"
              onChange={this.props.searchIn}
              className="my-2 ml-2"
            />
            <button onClick={this.props.searchIn}>Search In</button>
          </div>
          <div>
            <form onSubmit={this.props.onSubmitHandler(this.state.searchQuery)}>
              <input
                type="text"
                placeholder="Search Tweets"
                onChange={this.onChangeHandler}
                className="my-2 ml-2"
                name="searchQuery"
              />
              <button
                onClick={this.props.onSubmitHandler(this.state.searchQuery)}
              >
                Search
              </button>
            </form>
          </div>
          <div>
            <form onSubmit={this.props.filterbychar(this.state.nchars)}>
              <input
                type="text"
                placeholder="Filter Tweets by No of Characters"
                onChange={this.onChangeHandler}
                className="my-2 ml-2"
                name="nchars"
              />
              <button onClick={this.props.filterbychar(this.state.nchars)}>
                Filter
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
