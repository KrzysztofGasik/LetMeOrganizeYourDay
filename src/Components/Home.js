import React, { Component } from "react";
import gazeta from "../../img/gazeta.png";
import onet from "../../img/onet.png";
import wp from "../../img/wp.png";

const NewsList = [
  {
    name: "gazeta",
    path: gazeta,
    url: "https://twitter.com/gazeta_wyborcza"
  },
  {
    name: "onet",
    path: onet,
    url: "https://www.onet.pl"
  },
  {
    name: "wp",
    path: wp,
    url: "https://www.wp.pl"
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

  generateIframe = url => {
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
