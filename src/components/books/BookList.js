import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from "react-responsive-modal";
import { getData } from "../../redux/actions/index";
import BooksData from "./BooksData";
//import Pagination from "../pagination/Pagination";
import "./books.scss";

export class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      booksPerPage: 10,
      open: false,
      selectedBook: null // Keep track of the selected book
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.getData();
  }

  onOpenModal = bookId => {
    this.setState({
      open: true,
      selectedBook: bookId // When a book is clicked, mark it as selected
    });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  truncateTitle = string => {
    return string.length > 10 ? string.substring(0, 40) + "..." : string;
  };

  renderBooks = getBookData => {
    return getBookData.map(row => {
      return (
        <div
          className='col s3 box card book-box'
          key={row.id}
          onClick={() => this.onOpenModal(row.id)}>
          <div className='card-image'>
            {row.thumbnailUrl ? (
              <img src={row.thumbnailUrl} alt={row.title} />
            ) : (
              <img
                src='https://via.placeholder.com/150/0000FF/808080%20?Text=Digital.com%20C/O%20https://placeholder.com/'
                alt={row.title}
                width={200}
              />
            )}
          </div>
          <div className='book-title'>{this.truncateTitle(row.title)}</div>
          <div className='author'>
            <span>Author:</span> {row.authors}
          </div>
        </div>
      );
    });
  };

  renderBookModal = () => {
    // Check to see if there's a selected book. If so, render it.
    if (this.state.selectedBook !== null) {
      const book = this.props.books.results.filter(
        a => a.id === this.state.selectedBook
      );
      return (
        <div style={{ width: 600, height: 600 }}>
          <div className='row'>
            <h5>{book[0].title}</h5>
            <div className='col m6'>
              <img src={book[0].thumbnailUrl} alt={book[0].title} />
            </div>
            <div className='col m4'>
              <p>Authors: {book[0].authors}</p>
              <p>Publisher {book[0].publisher}</p>
              <p>{book[0].publishedDate}</p>
            </div>
            <div className='col m12'>
              <p>{book[0].longDescription}</p>
            </div>
          </div>
        </div>
      );
    }
  };

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  render() {
    let getBookData;
    if (this.props.catagory) {
      getBookData = this.props.books.results.filter(
        a => a.categories[0] === this.props.catagory
      );
    } else {
      getBookData = this.props.books.results;
    }

    const { currentPage, booksPerPage } = this.state;
    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = getBookData.slice(indexOfFirstBook, indexOfLastBook);

    const renderBookList = currentBooks.map((data, index) => {
      return data;
    });

    const pageNumbers = [];
    const pageLength = getBookData.length;
    for (let i = 1; i <= Math.ceil(pageLength / booksPerPage); i++) {
      console.log(pageNumbers);
      pageNumbers.push(i);
    }

    /**
     * renderPageNumbers display the pagination
     */
    const renderPageNumbers = pageNumbers.map((number, page) => {
      return (
        <li
          key={number}
          id={number}
          className={this.state.currentPage === number ? "active" : ""}
          onClick={e => this.handleClick(e)}>
          {number}
        </li>
      );
    });

    return (
      <div>
        <div className='container book-list'>
          <h4>{this.props.catagory ? this.props.catagory : "Books List"}</h4>
          <div className='row'>{this.renderBooks(renderBookList)}</div>
          <div className='page'>
            <ul>{renderPageNumbers}</ul>
          </div>
          <Modal open={this.state.open} onClose={this.onCloseModal} center>
            <div>{this.renderBookModal()}</div>
          </Modal>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    books: state.books,
    catagory: state.catagory
  };
}

export default connect(mapStateToProps, { getData })(BookList);
