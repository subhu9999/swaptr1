import React, { Component } from "react";
import { Link } from "react-router-dom";

// TODO : check string remove number before string RegExp
export default class AutoCompleteText extends Component {
  state = {
    suggestions: [],
    text: "",
    suggestionsVisible: true
  };

  componentWillMount = () => {
    document.addEventListener("mousedown", this.handleClick, false);
  };

  componentWillUnmount = () => {
    document.removeEventListener("mousedown", this.handleClick, false);
  };

  handleClick = e => {
    if (this.node.contains(e.target)) {
      // this.suggestionSelected(value)
      this.setState({
        suggestionsVisible: true
      });
      return;
    }
    this.handleClickOutside();
  };

  handleClickOutside = () => {
    this.setState({
      suggestionsVisible: false
    });
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

  enterPressed = event => {
    var code = event.keyCode || event.which;
    if (code === 13) {
      //13 is the enter keycode
      //Do stuff in here
      // console.log("pressed");
      const value = this.state.text;
      this.props.searchSuggestion(value);
    }
  };

  renderSuggestions = () => {
    const { suggestions, suggestionsVisible } = this.state;
    if (suggestions.length === 0 || !suggestionsVisible) {
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
      <div
        className="auto-complete-text dropdown search-width"
        ref={node => (this.node = node)}
      >
        <input
          className="dropdown-toggle w-100 h-100 auto-complete-input"
          value={text}
          onChange={e => this.onTextChanged(e)}
          type="text"
          placeholder="search products,brands,location..."
          onKeyUp={event => this.enterPressed(event)}
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
