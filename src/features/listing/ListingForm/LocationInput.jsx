import React, { Component } from "react";
import keywords from '../../../features/search/LocationKeywords';



class LocationInput extends Component {
 
  state = {
    suggestions: [],
    text: "",
    suggestionsVisible: true
  };

  
  componentDidMount = () =>{
    document.addEventListener("mousedown", this.handleClick, false);
  }

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
    this.setState(() => ({
      suggestions,
      text: value,
      suggestionsVisible: true
    }));
  };

  suggestionSelected = value => {
    this.setState(() => ({
      text: value,
      suggestions: []
    }));
  };

  enterPressed = event => {
    var code = event.keyCode || event.which;
    if (code === 13) {
      //13 is the enter keycode
      //Do stuff in here
      // console.log("pressed");
      const value = this.state.text;
      this.props.searchSuggestion(value);
      this.handleClickOutside();
    }
  };


  renderSuggestions = () => {
    const { suggestions, suggestionsVisible } = this.state;
    if (suggestions.length === 0 || !suggestionsVisible) {
      return null;
    }
    return (
      <ul className=" dropdown-menu display-suggestions">
        
        {suggestions.map(suggestion => (
          <li
            key={suggestion}
            className="dropdown-item location-suggestion p-2"
            onClick={() => this.suggestionSelected(suggestion)}
          >
            {suggestion}
          </li>
        ))}
      </ul>
    );
  };

  render() {
    const {
      input,
      meta: { touched, error }
    } = this.props;
    const { text } = this.state;
    return (
      <div className="form-group ml-md-4" ref={node => (this.node = node)}>
      <label className="listing-form-label ">
      <input
          {...input}
          placeholder=" "
          type="text"
          className={
            "form-control listing-form-input" +
            (touched && error
              ? "form-control listing-form-input border-danger"
              : "")
          }
          spellCheck="false"
          value={text}
          onChange={e => this.onTextChanged(e)}
        />
      {this.renderSuggestions()}
      
        <span className="listing-form-span text-muted">Location*</span>
      </label>
      {touched && error && <label className="text-danger ">{error}</label>}
    </div>

    );
  }
}

export default LocationInput;
