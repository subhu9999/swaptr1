import React, { Component } from "react";
//TODO: add enter pressed to input
class TextArea extends Component {
  // enterPressed = event => {
  //   var code = event.keyCode || event.which;
  //   if (code === 13) {
  //     //13 is the enter keycode
  //     //Do stuff in here
  //     // console.log("pressed");
  //     const { text } = this.state;
  //     if (text.length > 0) {
  //       // console.log(text);
  //       const values = { comment: text };
  //       this.props.handleChatSubmit(values);
  //     }
  //     // const value = this.state.text;
  //   }
  // };

  // onTextChanged = e => {
  //   const value = e.target.value;

  //   // if (value.length > 0) {
  //   this.setState(() => ({
  //     text: value
  //   }));
  //   // }
  // };

  render() {
    const { input, width, rows } = this.props;
    return (
      <textarea
        {...input}
        // value={text}
        // onChange={e => this.onTextChanged(e)}
        placeholder="Type Message"
        width={width}
        type="text"
        rows={rows}
        className="ml-3 chat-form-input "
        spellCheck="false"
        maxLength={140}
        // onKeyUp={event => this.enterPressed(event)}
      />
    );
  }
}

export default TextArea;
