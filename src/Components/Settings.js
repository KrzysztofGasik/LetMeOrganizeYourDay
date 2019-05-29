import React, { Component } from "react";
import { SketchPicker } from "react-color";

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
          {this.state.theme ? "Change to light theme" : "Change to dark theme"}
          {this.state.theme
            ? document.body.classList.add("theme-color1")
            : document.body.classList.remove("theme-color1")}
        </button>
      </>
    );
  }
}

export { Settings };
