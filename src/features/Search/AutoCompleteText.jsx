import React, { Component } from "react";
import { Link } from "react-router-dom";

// TODO : check string remove number before string RegExp
export default class AutoCompleteText extends Component {
  state = {
    suggestions: [],
    text: ""
  };

  onTextChanged = e => {
    const { keywords } = this.props;
    const value = e.target.value;
    let suggestions = [];

    if (value.length > 0) {
      //removes suggestion which are not equal to value
      const regex = new RegExp(`^${value}`, "i");
      suggestions = keywords
        .sort()
        .filter(v => regex.test(v))
        .slice(0, 5);
    }
    this.setState(() => ({ suggestions, text: value }));
  };

  suggestionSelected = value => {
    this.setState(() => ({
      text: value,
      suggestions: []
    }));
    this.props.searchSuggestion(value);
  };

  renderSuggestions = () => {
    const { suggestions } = this.state;
    if (suggestions.length === 0) {
      return null;
    }
    return (
      <ul className=" dropdown-menu display-suggestions w-100">
        {suggestions.map(suggestion => (
          <li
            key={suggestion}
            className="dropdown-item auto-complete-suggestion"
            onClick={() => this.suggestionSelected(suggestion)}
          >
            {suggestion}
          </li>
        ))}
      </ul>
    );
  };
  render() {
    const { text } = this.state;
    return (
      <div className="auto-complete-text dropdown search-width">
        <input
          className="dropdown-toggle w-100 h-100 auto-complete-input"
          value={text}
          onChange={e => this.onTextChanged(e)}
          type="text"
          placeholder="search products,brands,location..."
        />
        <div className="search-icon">
          <Link to={`/search/${text}`} className="btn btn-light rounded-0">
            <i className="fas fa-search text-dark mt-2" />
          </Link>
        </div>
        {this.renderSuggestions()}
      </div>
    );
  }
}
