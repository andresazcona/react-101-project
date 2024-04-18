import React, { Component } from "react";
import axios from "axios";
import Character from "./components/Character";
import "./App.css";
import simpLogo from "./assets/simpsons_logo.png";
import simpVersion from "./assets/simpsons_version.png";

class WelcomePage extends Component {
  render() {
    return (
      <div className="welcomePage">
        <img className="simpLogo" alt="The Simpsons Logo" src={simpLogo} />
        <button className="button" onClick={this.props.onStart}>
          !Generate!
        </button>
        <img className="simpVersion" alt="version" src={simpVersion} />
      </div>
    );
  }
}

class App extends Component {
  state = {
    showWelcomePage: true,
    apiData: null,
    searchQuery: "",
    searchBy: "name"
  };

  async componentDidMount() {
    try {
      const apiData = await axios.get(
        "https://thesimpsonsquoteapi.glitch.me/quotes?count=50"
      );

      apiData.data.forEach((element, index) => {
        element.id = index;
      });

      this.setState({ apiData: apiData.data });
    } catch (error) {
      console.log("Error with API data");
      console.log(error);
    }
  }

  handleStart = () => {
    this.setState({ showWelcomePage: false });
  };

  handleReturnHome = () => {
    this.setState({ showWelcomePage: true });
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { apiData, searchQuery, searchBy, showWelcomePage } = this.state;

    if (showWelcomePage) {
      return <WelcomePage onStart={this.handleStart} />;
    }

    if (!apiData) {
      return (
        <div className="loading">
          <img className="simpLogo" alt="The Simpsons Logo" src={simpLogo} />
          <h2>Loading...</h2>
          <div className="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      );
    }

    let filtered = apiData;

    if (searchQuery) {
      if (searchBy === "name") {
        filtered = apiData.filter((character) =>
          character.character.toLowerCase().includes(searchQuery.toLowerCase())
        );
      } else if (searchBy === "quote") {
        filtered = apiData.filter((character) =>
          character.quote.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
    }

    return (
      <>
        <div className="searchArea">
          <div className="search">
            <input
              className="searchBox"
              onChange={this.handleInputChange}
              value={searchQuery}
              name="searchQuery"
              type="text"
              placeholder="Search"
            />
            <select
              className="searchBy"
              onChange={this.handleInputChange}
              value={searchBy}
              name="searchBy"
            >
              <option value="name">Search by Name</option>
              <option value="quote">Search by Quote</option>
            </select>
          </div>
        </div>
        <div className="characters">
          {filtered.map((character) => (
            <div key={character.id}>
              <Character key={character.id} character={character} />
            </div>
          ))}
        </div>
        <button className="returnButton" onClick={this.handleReturnHome}>
          Go Back
        </button>
      </>
    );
  }
}

export default App;
