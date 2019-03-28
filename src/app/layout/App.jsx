import React, { Component } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Search from "../../features/Search/Search";

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Search />
      </div>
    );
  }
}

export default App;
