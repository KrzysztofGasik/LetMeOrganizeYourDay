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

  editNote = id => {
    const itemToUpdate = this.state.notes.filter(note => note.id == id);
    this.setState(prevState => {
      return {
        edit: !prevState.edit,
        readOnly: !prevState.readOnly
      };
    });
    //localStorage.setItem("data", JSON.stringify(arrUpdate));
  };

  completeNote = () => {
    this.setState(prevState => {
      return {
        isClick: !prevState.isClick
      };
    });
  };

  deleteNote = id => {
    const arrToRemove = this.state.notes.filter(note => note.id != id);

    this.setState({
      notes: arrToRemove
    });

    localStorage.setItem("data", JSON.stringify(arrToRemove));
  };

  render() {
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
                      <button onClick={() => this.completeNote()}>
                        Complete
                      </button>
                      <button onClick={() => this.editNote(el.id)}>
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
}

export { PendingNote };
