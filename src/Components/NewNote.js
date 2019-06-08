import React, { Component } from "react";
import { DateContext } from "../App";

class NewNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isClick: false,
      title: "",
      description: "",
      date: new Date().toLocaleDateString("pl-PL"),
      notes: []
    };
  }

  typeNewNote = () => {
    this.setState(prevState => {
      return {
        isClick: !prevState.isClick
      };
    });
  };

  editNote = (e, field) => {
    this.setState({
      [field]: e.target.value
    });
  };

  saveNote = (e, title, description, date) => {
    e.preventDefault();

    const id = Date.now();

    const noteData = {
      id: id,
      title: title,
      description: description,
      date: date
    };

    const data = JSON.parse(localStorage.getItem("data"));

    if (data === null) {
      localStorage.setItem("data", JSON.stringify([noteData]));
    } else {
      localStorage.setItem("data", JSON.stringify([...data, noteData]));
    }

    this.setState({
      isClick: false,
      title: "",
      description: ""
    });
  };

  render() {
    return (
      <DateContext.Consumer>
        {({ date }) => (
          <div className="new__note__container">
            {this.state.isClick ? (
              <div className="new">
                <input
                  type="text"
                  placeholder="Note title"
                  value={this.state.title}
                  id="titleNote"
                  onChange={e => this.editNote(e, "title")}
                />
                <input
                  placeholder="Note description"
                  value={this.state.description}
                  id="descriptionNote"
                  onChange={e => this.editNote(e, "description")}
                />
                <span>{date}</span>
                {this.state.title == "" && this.state.description == "" ? (
                  ""
                ) : (
                  <button
                    onClick={e =>
                      this.saveNote(
                        e,
                        this.state.title,
                        this.state.description,
                        date
                      )
                    }
                  >
                    Save note
                  </button>
                )}
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
        )}
      </DateContext.Consumer>
    );
  }
}

export { NewNote };
