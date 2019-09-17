import React, { Component } from "react";

export default class AutoCompleteText extends Component {
  state = {
    suggestions: [],
    text: ""
  };
  items = ["David", "Damien", "Sara", "Jane"];

  onTextChanged = e => {
    const value = e.target.value;
    let suggestions = [];
    if (value.length > 0) {
      //removes suggestion which are not equal to value
      const regex = new RegExp(`^${value}`, "i");
      suggestions = this.items.sort().filter(v => regex.test(v));
    }
    this.setState(() => ({ suggestions, text: value }));
  };

  suggestionSelected = value => {
    this.setState(() => ({
      text: value,
      suggestions: []
    }));
  };

  renderSuggestions = () => {
    const { suggestions } = this.state;
    if (suggestions.length === 0) {
      return null;
    }
    return (
      <ul>
        {suggestions.map(suggestion => (
          <li onClick={() => this.suggestionSelected(suggestion)}>
            {suggestion}
          </li>
        ))}
      </ul>
    );
  };
  render() {
    const { text } = this.state;
    return (
      <div>
        <input value={text} onChange={e => this.onTextChanged(e)} type="text" />
        {this.renderSuggestions()}
      </div>
    );
  }
}
