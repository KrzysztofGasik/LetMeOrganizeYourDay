import React, { Component } from "react";

const NewsList = [
  {
    name: "gazeta",
    path: "../img/gazeta.png",
    url: "http://www.gazeta.pl/0,0.html"
  },
  {
    name: "onet",
    path: "../img/onet.png",
    url: "https://www.onet.pl"
  },
  {
    name: "wp",
    path: "../img/wp.png",
    url: "https://www.wp.pl/"
  }
];

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      isSelect: false
    };
  }

  generateIframe = (url) => {
    this.setState(prevState => {
      return {
        isSelect: !prevState.isSelect,
        url: url
      };
    });
  };

  render() {
    return (
      <>
        {this.state.isSelect ? (
          <iframe src={this.state.url} />
        ) : (
          <>
            {NewsList.map(val => {
              return (
                <img
                  src={val.path}
                  key={val.name}
                  onClick={() => this.generateIframe(val.url)}
                />
              );
            })}
          </>
        )}
      </>
    );
  }
}

export { Home };
