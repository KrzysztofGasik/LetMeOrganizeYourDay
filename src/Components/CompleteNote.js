import React, { Component } from "react";

class CompleteNote extends Component {
    constructor(props) {
      super(props);
      this.state = {
        notes: JSON.parse(localStorage.getItem("data"))
      };
    }
  
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
                  <div className="pending">
                    <input type="text" defaultValue ={el.title} id="titleNote"/>
                    <input defaultValue ={el.description} id="descriptionNote"/>
                    <span>{el.date}</span>
                    <div className="pending__note_wrapper">
                      <button onClick={() => this.deleteNote(el.id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      );
    }
  }

  export {CompleteNote};