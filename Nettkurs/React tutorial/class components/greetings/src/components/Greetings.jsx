import { Component } from "react";
import Row from "./Row";

export default class Greetings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Mary",
    };
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(e) {
    this.setState({
      name: e.target.value,
    });
  }

  render() {
    return (
      <section>
        <Row label="Name">
          <input 
            value={this.state.name} 
            onChange={this.handleNameChange} 
          />
        </Row>
      </section>
    );
  }
}
