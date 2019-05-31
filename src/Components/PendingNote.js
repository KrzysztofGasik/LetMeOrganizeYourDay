import React, { Component } from "react";

class PendingNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: JSON.parse(localStorage.getItem("data")),
      edit: false,
      isClick: false,
      readOnly: true
    };
  }

  editInput = (e, field) => {
    this.setState({
      [field]: e.target.value
    });
  };

  editNote = note => {
    const indexToUpdate = this.state.notes.findIndex(item => item.id == note.id);
    this.setState(prevState => {
      const newNotes = [...prevState.notes];
      newNotes[indexToUpdate] = note;
      localStorage.setItem("data", JSON.stringify(newNotes));
      return {
        notes: newNotes,
        edit: !prevState.edit,
        readOnly: !prevState.readOnly
      };
    });
    //localStorage.setItem("data", JSON.stringify(arrUpdate));
  };

  completeNote = (e, id) => {
    e.preventDefault();

    const data2 = JSON.parse(localStorage.getItem("data2"));
    const noteToMove = this.state.notes.filter(note => note.id == id);

    if (data2 === null) {
      localStorage.setItem("data2", JSON.stringify([noteToMove]));
    } else {
      localStorage.setItem("data2", JSON.stringify([...data2,noteToMove]));
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
    if (this.state.notes.length > 0) {
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
                        defaultValue={el.title}
                        id="titleNote"
                        readOnly={this.state.readOnly}
                        onChange={e => this.editInput(e, "title")}
                      />
                      <input
                        defaultValue={el.description}
                        id="descriptionNote"
                        readOnly={this.state.readOnly}
                        onChange={e => this.editInput(e, "description")}
                      />
                      <span>{el.date}</span>
                      <div className="pending__note_wrapper">
                        <button onClick={e => this.completeNote(e, el.id)}>
                          Complete
                        </button>
                        <button onClick={()=> this.editNote(el)}>
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
