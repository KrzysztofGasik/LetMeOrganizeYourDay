import React, { Component } from "react";
import Calendar from "react-calendar";

class WeatherAPI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      humidity: "",
      pressure: "",
      temp: "",
      wind: "",
      lat: "",
      long: "",
      img: "",
      show: false,
      error: false
    };
  }

  getCoordinates = () => {
    navigator.geolocation.getCurrentPosition(position => {
      const latitude = position.coords.latitude.toFixed(2);
      const longitude = position.coords.longitude.toFixed(2);
      this.setState({
        lat: latitude,
        long: longitude
      });
    });
    if (this.state.lat != "" && this.state.long != "") {
      this.getWeather(this.state.lat, this.state.long);
    }
  };

  getWeather = (lat, long) => {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&APPID=6b467043a397afda4b817e26b6e2afa9&units=metric`
    )
      .then(response => response.json())
      .then(data => {
        this.setState(prevState => {
          return {
            city: data.name,
            humidity: data.main.humidity,
            pressure: data.main.pressure,
            temp: data.main.temp.toFixed(0),
            wind: data.wind.speed,
            img:
              "http://openweathermap.org/img/w/" +
              data.weather[0].icon +
              ".png",
            show: !prevState.show
          };
        });
      })
      .catch(() => {
        this.setState({
          error: true
        });
      });
  };

  render() {
    if (this.state.error) {
      return (
        <div>
          <h1>Error - no data weather, please try again</h1>
          <button className="btn__weather" onClick={this.getCoordinates}>
            Check weather at your destination
          </button>
        </div>
      );
    }
    return (
      <>
        <button className="btn__weather" onClick={this.getCoordinates}>
          {this.state.show
            ? "Hide weather forecast"
            : "Check weather at your destination"}
        </button>
        {this.state.show && (
          <div className="data__weather">
            <div className="data__weather__split">
              <span>City: {this.state.city}</span>
              <span>Humidity: {this.state.humidity} %</span>
              <span>Pressure: {this.state.pressure}</span>
              <span>Temperature: {this.state.temp} &#8451;</span>
              <span>Wind: {this.state.wind}</span>
            </div>
            <img src={this.state.img} width="100px" />
          </div>
        )}
      </>
    );
  }
}

class CurrentDate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    };
  }

  onChange = date => this.setState({ date });

  render() {
    return (
      <div>
        <Calendar onChange={this.onChange} value={this.state.date} />
      </div>
    );
  }
}

export const WeatherWidget = () => {
  return (
    <aside>
      <div>
        <WeatherAPI />
      </div>
      <div>
        <CurrentDate />
      </div>
    </aside>
  );
};
