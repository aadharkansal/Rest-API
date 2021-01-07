import React, { Component } from "react";

class Header extends Component {
  render() {
    return (
      <div className="text-center">
        <a href="https://imgbb.com/"><img src="https://i.ibb.co/2h026r8/45610723.png" alt="45610723" border="0" /></a>
        {/* <img
          src="https://ibb.co/XLfB4Py"
          width="300"
          className="img-thumbnail"
          style={{ marginTop: "20px" }}
          alt="Logo"
        /> */}
        <hr />
        <h1>Student Management</h1>
      </div>
    );
  }
}

export default Header;