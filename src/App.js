import React, {Component,} from "react";
import ReactDom from "react-dom";
import {HashRouter} from "react-router-dom";
import { Header } from "./Components/Header";
import { MainWindow } from "./Components/MainWindow";
import { MenuBar } from "./Components/MenuBar";
import { WeatherWidget } from "./Components/WeatherWidget";
import { Footer } from "./Components/Footer";
import "../scss/style.scss";

export const DateContext = React.createContext('dateChange');

class App extends Component {
  componentDidMount() {
    document.body.classList.add("theme-color0");
  }

  state = {
    date: new Date().toLocaleDateString("pl-PL")
  }

  render() {
    return (
      <>
       <DateContext.Provider value={{date: this.state.date, setDate: (date) => this.setState({date: date.toLocaleDateString("pl-PL")})}}>
        <HashRouter>
          <Header />
          <div className="wrapper">
            <MenuBar />
            <MainWindow />
            <WeatherWidget />
          </div>
          <Footer />
        </HashRouter>
        </DateContext.Provider>
      </>
    );
  }
}

document.addEventListener("DOMContentLoaded", () => {
  ReactDom.render(<App />, document.querySelector("#app"));
});
