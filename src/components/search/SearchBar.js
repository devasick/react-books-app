import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { search } from "../../redux/actions/index";

class SearchBar extends Component {
  render() {
    const { search, value } = this.props;

    return (
      <input
        className='form-control'
        placeholder='Procurar Trabalho'
        onChange={e => search(e.target.value)}
        value={value}
      />
    );
  }
}

function mapStateToProps({ books }) {
  return { value: books.value };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ search }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
