import React, { Component } from "react";

class PendingNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: JSON.parse(localStorage.getItem("data")),
      edit: false,
      isClick: false,
      readOnly: true,
      title: "",
      description: ""
    };
  }

  editInput = (e, field) => {
    this.setState({
      [field]: e.target.value
    });
  };

  editNote = (e, note) => {
    const indexToUpdate = this.state.notes.findIndex(
      item => item.id == note.id
    );

    const newNotes = [...this.state.notes];
    newNotes[indexToUpdate].title = this.state.title;
    newNotes[indexToUpdate].description = this.state.description;

    this.setState({
      notes: newNotes,
      edit: !this.state.edit,
      readOnly: !this.state.readOnly
    });

    localStorage.setItem("data", JSON.stringify(newNotes));
  };

  completeNote = (e, id) => {
    e.preventDefault();

    const data2 = JSON.parse(localStorage.getItem("data2"));
    const filterArray = this.state.notes.filter(note => note.id == id);
    const noteToMove = filterArray[0];

    if (data2 === null) {
      localStorage.setItem("data2", JSON.stringify([noteToMove]));
    } else {
      localStorage.setItem("data2", JSON.stringify([...data2, noteToMove]));
    }

    const arrToUpdate = this.state.notes.filter(note => note.id != id);
    localStorage.setItem("data", JSON.stringify(arrToUpdate));

    this.setState({
      notes: arrToUpdate,
      isClick: false
    });
  };

  deleteNote = id => {
    const noteToRemove = this.state.notes.filter(note => note.id != id);

    this.setState({
      notes: noteToRemove
    });

    localStorage.setItem("data", JSON.stringify(noteToRemove));
  };

  render() {
    if (
      localStorage.getItem("data") !== null &&
      localStorage.getItem("data").length > 0
    ) {
      return (
        <ul>
          {this.state.notes.map((el, index) => {
            return (
              <li key={index}>
                <div className="pending__note__container">
                  {this.state.isClick ? null : (
                    <div className="pending">
                      <input
                        type="text"
                        id="titleNote"
                        value={
                          this.state.title === "" ? el.title : this.state.title
                        }
                        readOnly={this.state.readOnly}
                        onChange={e => this.editInput(e, "title")}
                      />
                      <input
                        type="text"
                        id="descriptionNote"
                        value={
                          this.state.description === ""
                            ? el.description
                            : this.state.description
                        }
                        readOnly={this.state.readOnly}
                        onChange={e => this.editInput(e, "description")}
                      />
                      <span>{el.date}</span>
                      <div className="pending__note_wrapper">
                        <button onClick={e => this.completeNote(e, el.id)}>
                          Complete
                        </button>
                        <button onClick={e => this.editNote(e, el)}>
                          {this.state.edit ? "Finish" : "Edit"}
                        </button>
                        <button onClick={() => this.deleteNote(el.id)}>
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      );
    }
    return (
      <div>
        <strong>No pending notes</strong>
      </div>
    );
  }
}

export { PendingNote };
