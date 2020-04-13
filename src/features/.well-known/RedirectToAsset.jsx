import React, { Component } from "react";



class RedirectToAsset extends Component {
  state = {
    listings: []
  };

  async componentDidMount() {
    window.location.assign('http://github.com')
  }

  render() {
    return <div>text</div>;
  }
}

export default RedirectToAsset;
