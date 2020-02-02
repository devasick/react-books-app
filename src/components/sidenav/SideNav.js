import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { sendCategory } from "../../redux/actions/index";
import "./sidenav.scss";

class SideNav extends Component {
  render() {
    return (
      <div className='sidebar'>
        <div className='aside'>
          <h3>Book Store</h3>
          <hr />
          <ul>
            {/* <li onClick={() => this.props.sendCategory("")}>All Books</li> */}
            <li onClick={() => this.props.sendCategory("Business")}>
              Business
            </li>
            <li onClick={() => this.props.sendCategory("Digital Media")}>
              Digital Media
            </li>
            <li onClick={() => this.props.sendCategory("Software Development")}>
              {" "}
              Software Development
            </li>
            <li onClick={() => this.props.sendCategory("Web Applications")}>
              Web Applications
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { catagory: state.catagory, books: state.books };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ sendCategory: sendCategory }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SideNav);
