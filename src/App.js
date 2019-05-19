import React, {
  Component,
  Fragment,
  createRef,
  useState,
  useEffect
} from "react";
import ReactDom from "react-dom";
import "./style.scss";
import {
  HashRouter,
  BrowserRouter,
  Route,
  Link,
  Switch,
  NavLink
} from "react-router-dom";

import Calendar from "react-calendar";

const MenuElements = [
  {
    path: "/",
    name: "Home",
    icon: "fas fa-home"
  },
  {
    path: "/new",
    name: "New notes",
    icon: "far fa-plus-square"
  },
  {
    path: "/pending",
    name: "Pending notes",
    icon: "fas fa-sticky-note"
  },
  {
    path: "/complete",
    name: "Complete notes",
    icon: "fas fa-check"
  },
  {
    path: "/settings",
    name: "Settings",
    icon: "fas fa-cog"
  }
];

const Home = () => {
  const NewsList = [
    "http://www.gazeta.pl/0,0.html",
    "https://www.onet.pl",
    "https://www.wp.pl/"
  ];
  const Max = NewsList.length - 1;
  const Min = 0;
  let randomNews = Math.floor(Math.random() * (Max - Min + 1)) + Min;
  return <iframe src={NewsList[randomNews]} />;
};



class NewNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isClick: false,
      title: '',
      description: '',
      status: 'new'
    };
  }

  typeNewNote = () => {
    this.setState(prevState => {
      return {
        isClick: !prevState.isClick
      };
    });
  };

  editNote = (e,field) => {
    this.setState({
      [field]: e.target.value
    });
  };

  saveNote = (e, title, description) => {
    e.preventDefault();
    
    return (
      <PendingNote title={title} description={description}/>
    )
  };

  render() {
    return (
      <div className="new__note__container">
        {this.state.isClick ? (
          <div className={this.state.status}>
            <input
              type="text"
              placeholder="Note title"
              value={this.state.title}
              id="titleNote"
              onChange={e=>this.editNote(e, 'title')}
            />
            <input
              placeholder="Note description"
              value={this.state.description}
              id="descriptionNote"
              onChange={e=>this.editNote(e, 'description')}
            />
            {this.state.title == '' && this.state.description == ''? '' : <button onClick={e=>this.saveNote(e, this.state.title, this.state.description)}>Save note</button>} 
          </div>
        ) : (
          <>
            <button className="add" onClick={this.typeNewNote}>
              <i className="far fa-plus-square" />
            </button>
            <span>Click to add new note</span>
          </>
        )}
      </div>
    );
  }
}

class PendingNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      description: this.props.description,
      notes:[]
    };
  }
  render() {
    return (
      <ul>
        {
          this.state.notes.map(() => {
            return <li>{this.state.title} {this.state.description}</li>
          })
        }
      </ul>
    )
  }
}


const CompleteNote = () => <div>Complete note</div>;
const Settings = () => <div>Settings</div>;

const Header = () => {
  return <header>NAGŁÓWEK</header>;
};

const MenuBar = () => {
  return (
    <nav>
      <ul>
        {MenuElements.map(item => (
          <li key={item.path}>
            <NavLink exact to={item.path}>
              <i className={item.icon} />
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

class WeatherAPI extends Component {

  constructor(props) {
    super(props);
    this.state = {
     city: '',
     humidity: '',
     pressure: '',
     temp: '',
     wind: '',
     lat: '',
     long: '',
     img: '',
     show: false,
     error: false
    };
  }

  getCoordinates = () => {
    navigator.geolocation.getCurrentPosition((position)=> {
      const latitude = position.coords.latitude.toFixed(2);
      const longitude = position.coords.longitude.toFixed(2);
      this.setState({
          lat: latitude,
          long: longitude
      })
    });
    if (this.state.lat !='' && this.state.long !='') {
      this.getWeather(this.state.lat,this.state.long);
    }
    
  }

  getWeather = (lat,long) => {
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&APPID=6b467043a397afda4b817e26b6e2afa9&units=metric`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          city: data.name,
          humidity: data.main.humidity,
          pressure: data.main.pressure,
          temp: data.main.temp.toFixed(0),
          wind: data.wind.speed,
          img: 'http://openweathermap.org/img/w/'+data.weather[0].icon+'.png',
          show: true
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
          <h1>Błąd komunikacji z serwerem</h1>
          <button>Spróbuj ponownie</button>
        </div>
      );
    }
    return (
        <>
        <button className='btn__weather' onClick={this.getCoordinates}>Check weather at your destination</button>
          {this.state.show &&  <div className='data__weather'>
          <span>City: {this.state.city}</span>
          <span>Humidity: {this.state.humidity} %</span>
          <span>Pressure: {this.state.pressure}</span>
          <span>Temperature: {this.state.temp} &#8451;</span>
          <span>Wind: {this.state.wind} </span>
          <img src={this.state.img} width='100px'/></div>
        }
        </>
    )
  }
}

class CurrentDate extends Component {

  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    };
  }
 
  onChange = date => this.setState({ date })
 
  render() {
    return (
      <div>
        <Calendar
          onChange={this.onChange}
          value={this.state.date}
        />
      </div>
    );
  }
}

const WeatherWidget = () => {
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

const MainWindow = () => {
  return (
    <main className="main__window">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/new" component={NewNote} />
        <Route path="/pending" component={PendingNote} />
        <Route path="/complete" component={CompleteNote} />
        <Route path="/settings" component={Settings} />
      </Switch>
    </main>
  );
};

class App extends Component {
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
        </HashRouter>
      </>
    );
  }
}

document.addEventListener("DOMContentLoaded", () => {
  ReactDom.render(<App />, document.querySelector("#app"));
});
