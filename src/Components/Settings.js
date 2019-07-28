import React, { Component } from "react";

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: document.body.classList.contains("theme-blue")
    };
  }

  toggleTheme = () => {
    this.setState(prevState => {
      return {
        theme: !prevState.theme
      };
    });
  };

  render() {
    return (
      <>
        <button className="theme-switch" onClick={this.toggleTheme}>
          {this.state.theme ? "Change to red theme" : "Change to blue theme"}
          {this.state.theme
            ? document.body.classList.add("theme-blue")
            : document.body.classList.remove("theme-blue")}
        </button>
      </>
    );
  }
}

export { Settings };
