import { Component } from "react";
import Row from "./Row";

export default class Greetings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Mary",   // det som står i input-feltet
      names: [],      // listen med alle navn
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleAddName = this.handleAddName.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this); // binder Enter-metoden
  }

  handleNameChange(e) {
    this.setState({ name: e.target.value });
  }

  handleAddName() {
    if (this.state.name.trim() === "") return; // ikke legg til tomme navn
    this.setState((prevState) => ({
      names: [...prevState.names, prevState.name],
      name: ""
    }));
  }

  handleKeyDown(e) {
    if (e.key === "Enter") {
      this.handleAddName();
    }
  }

  render() {
    return (
      <section>
        <Row label="Name">
          <input
            value={this.state.name}
            onChange={this.handleNameChange}
            onKeyDown={this.handleKeyDown}
          />
          <button onClick={this.handleAddName}>Add</button>
        </Row>

        <ul>
          {this.state.names.map((n, index) => (
            <li key={index}>{n}</li>
          ))}
        </ul>
      </section>
    );
  }
}
