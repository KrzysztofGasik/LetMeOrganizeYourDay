import React, { Component } from "react";

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: document.body.classList.contains("theme-color1")
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
          {this.state.theme ? "Change to default theme" : "Change to red theme"}
          {this.state.theme
            ? document.body.classList.add("theme-color1")
            : document.body.classList.remove("theme-color1")}
        </button>
      </>
    );
  }
}

export { Settings };
