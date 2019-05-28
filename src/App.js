import React, {Component,} from "react";
import ReactDom from "react-dom";
import {HashRouter} from "react-router-dom";
import { Header } from "./Components/Header";
import { MainWindow } from "./Components/MainWindow";
import { MenuBar } from "./Components/MenuBar";
import { WeatherWidget } from "./Components/WeatherWidget";
import { Footer } from "./Components/Footer";
import "../scss/style.scss";

class App extends Component {
  componentDidMount() {
    document.body.classList.add("theme-color0");
  }

  render() {
    return (
      <>
        <HashRouter>
          <Header />
          <div className="wrapper">
            <MenuBar />
            <MainWindow />
            <WeatherWidget />
          </div>
          <Footer />
        </HashRouter>
      </>
    );
  }
}

document.addEventListener("DOMContentLoaded", () => {
  ReactDom.render(<App />, document.querySelector("#app"));
});
