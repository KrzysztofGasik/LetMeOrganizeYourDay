import React, { Component } from "react";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doSearch: false,
      clickSubmit: false
    };
  }

  switchSearch = () => {
    this.setState(prevState => {
      return {
        doSearch: !prevState.doSearch
      };
    });
  };

  hideSubmit = () => {
    this.setState({
      clickSubmit: true
    });

    this.timer = setTimeout(() => {
      this.setState({
        clickSubmit: false,
        doSearch: false
      });
    }, 1000);
  };

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    return (
      <header>
        <span>Let me help organize your day</span>
        {this.state.doSearch ? (
          <form
            action="https://www.google.com/search"
            method="get"
            name="searchform"
            target="_blank"
          >
            <input name="sitesearch" type="hidden" value="" />
            <input
              autoComplete="on"
              name="q"
              placeholder="Search for ..."
              required="required"
              type="text"
            />
            <button type="submit" onClick={this.hideSubmit}>
              Search
            </button>
          </form>
        ) : (
          <i className="fas fa-search" onClick={this.switchSearch} />
        )}
      </header>
    );
  }
}

export { Header };
