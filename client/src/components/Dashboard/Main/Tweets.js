import React, { Component } from "react";
import Tweet from "../Tweet/Tweet";
import "./tweets.css";
import axios from "axios";
import Intro from "../Intro/Intro";
import Buttons from "../Buttons/Buttons";
import Nav from "../../Nav/Nav";
import "../../../../node_modules/animate.css/animate.min.css";

export default class Tweets extends Component {
  state = {
    username: this.props.match.params.id,
    name: "",
    avatar: "",
    bannerUrl: "",
    tweets: [],
    duplicate: [],
    myTweets: [],
    friendsTweets: {},
    mytrendingtweets: [],
    showing: "mine",
    searchIn: ""
  };
  componentDidMount() {
    this.getDetails();
    this.getTweets();
  }

  setDuplicates = () => {
    this.setState({ duplicate: this.state.tweets });
  };

  getDetails = () => {
    console.log(this.state.mytrendingtweets, " are present");
    axios
      .post("/get_details", {
        username: this.state.username
      })
      .then(res => {
        console.log(res.data);
        this.setState({
          name: res.data.name,
          avatar: res.data.profile_image_url.replace("_normal", ""),
          bannerUrl: res.data.profile_banner_url
        });
        console.log("State set");
      })
      .catch(err => {
        console.log(err);
      });

    axios
      .post("/get_trending", {})
      .then(res => {
        this.setState({
          mytrendingtweets: res.data[0].trends
        });
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  getTweets = () => {
    axios
      .post("/get_tweets", {
        username: this.state.username
      })
      .then(res => {
        console.log(res.data);
        this.setState({
          showing: "mine",
          myTweets: res.data,
          tweets: res.data.map((ele, ind, arr) => {
            return {
              name: ele.user.name,
              username: ele.user.screen_name,
              text: ele.text,
              date: ele.created_at.replace("+0000", ""),
              image: ele.user.profile_image_url.replace("_normal", "")
            };
          })
        });
        this.setDuplicates();
      });
  };

  getFriends = () => {
    axios
      .post("/get_friends", {
        username: this.state.username
      })
      .then(res => {
        console.log(res.data);
        console.log(res.data.users[0].status);
        this.setState({
          showing: "friends",
          friendsTweets: res.data,
          tweets: res.data.users.map((ele, ind, arr) => {
            console.log(ind);
            if (!ele.status) return null;
            return {
              name: ele.name,
              username: ele.screen_name,
              text: ele.status.text,
              date: ele.status.created_at.replace("+0000", ""),
              image: ele.profile_image_url.replace("_normal", "")
            };
          })
        });
        console.log(this.state.tweets);
        this.setDuplicates();
      });
  };

  getTrendingTweets = () => {
    this.setState({
      showing: "trending"
    });
  };

  searchTrend = e => {
    this.searchTweets(e.target.value);
    console.log(e.target.value);
  };

  filterIt = value => {
    this.setState({ searchIn: value });
    this.setState({
      tweets: this.state.tweets.filter((ele, ind, arr) => {
        if (ele === null) return false;
        console.log(ind);
        return (
          ele.text.toUpperCase().indexOf(this.state.searchIn.toUpperCase()) !==
          -1
        );
      })
    });
  };

  searchIn = e => {
    if (e.target.value.length < this.state.searchIn.length) {
      this.setState({ tweets: this.state.duplicate });
    } else {
      this.filterIt(e.target.value);
    }
  };

  searchTweets = toSearch => {
    axios
      .post("/search", {
        query: toSearch
      })
      .then(res => {
        console.log(res.data);
        this.setState({
          showing: "Tweets",
          tweets: res.data.statuses.map((ele, ind, arr) => {
            return {
              name: ele.user.name,
              username: ele.user.screen_name,
              text: ele.text,
              date: ele.created_at.replace("+0000", ""),
              image: ele.user.profile_image_url.replace("_normal", "")
            };
          })
        });
        this.setDuplicates();
      });
  };

  onSubmitHandler = query => {
    return e => {
      e.preventDefault();
      this.searchTweets(query);
    };
  };

  filterbychar = nchars => {
    return e => {
      console.log(this.state);
      e.preventDefault();
      if (nchars === "") this.setState({ tweets: this.state.duplicate });
      else {
        this.setState({
          tweets: this.state.tweets.filter((ele, ind, arr) => {
            if (ele === null) return null;
            return ele.text.length <= nchars;
          })
        });
      }
    };
  };

  render() {
    let content = [];
    if (this.state.showing === "trending" && this.state.mytrendingtweets) {
      content = this.state.mytrendingtweets.map((ele, ind, arr) => {
        return (
          <button
            className="m-2"
            key={ind}
            onClick={this.searchTrend}
            value={ele.name}
          >
            {ele.name}
          </button>
        );
      });
    } else {
      content = this.state.tweets.map((ele, ind, arr) => {
        if (ele === null) return null;
        return (
          <Tweet
            key={ind}
            name={ele.name}
            username={ele.username}
            text={ele.text}
            date={ele.date.replace("+0000", "")}
            image={ele.image}
          />
        );
      });
    }

    return (
      <div className="tweets">
        <div className="container">
          <Nav />
        </div>
        <div className="background">
          <Intro
            name={this.state.name}
            username={this.state.username}
            avatar={this.state.avatar}
            bannerUrl={this.state.bannerUrl}
          />
          <div className="tweet-heading container text-center">
            My Dashboard
          </div>
          <div className="container">
            <Buttons
              getTweets={this.getTweets}
              getFriends={this.getFriends}
              getTrendingTweets={this.getTrendingTweets}
              searchIn={this.searchIn}
              searchTweets={this.searchTweets}
              filterbychar={this.filterbychar}
              onSubmitHandler={this.onSubmitHandler}
            />
            <div className="text-center">{content}</div>
          </div>
        </div>
      </div>
    );
  }
}
