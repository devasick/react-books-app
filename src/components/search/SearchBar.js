import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { search } from "../../redux/actions/index";

class SearchBar extends Component {
  render() {
    const { search, searchValue } = this.props;

    return (
      <input
        className='form-control'
        placeholder='Search book by title'
        onChange={e => search(e.target.value)}
        value={searchValue}
      />
    );
  }
}

function mapStateToProps({ books }) {
  return { searchValue: books.searchValue };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ search }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
