import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from "react-responsive-modal";
import { getData } from "../../redux/actions/index";
import Pagination from "../pagination/Pagination";
import "./booklist.scss";

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

  componentDidUpdate(previousProps) {
    // updating pagination current page
    if (this.state.currentPage !== 1) {
      let totalPages = Math.ceil(
        this.props.books.length / this.state.booksPerPage
      );
      if (
        this.state.booksPerPage > totalPages &&
        previousProps.books !== this.props.books
      ) {
        this.setState({
          currentPage: totalPages
        });
      }
    }
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

  renderBooks = data => {
    return data.map(row => {
      return (
        <div
          className='col s6 m3 box card book-box'
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
        </div>
      );
    });
  };

  renderBookModal = () => {
    // Check to see if there's a selected book. If so, render it.

    if (this.state.selectedBook !== null) {
      const book = this.props.books.filter(
        book => book.id === this.state.selectedBook
      );
      return (
        <div style={{ maxWidth: 700, height: 600 }} className='book-details'>
          <div className='row'>
            <h5>{book[0].title}</h5>
            <div className='col m6'>
              <img src={book[0].thumbnailUrl} alt={book[0].title} width={300} />
            </div>
            <div className='col m6'>
              <p>
                <span>Authors:</span> {book[0].authors}
              </p>
              <hr></hr>
              <p>
                <span>Publisher:</span> {book[0].publisher}
              </p>
              <hr></hr>
              <p>
                <span>Publication Date:</span> {book[0].publishedDate}
              </p>
              <hr></hr>
            </div>
            <div className='col m12'>
              <p>{book[0].longDescription}</p>
            </div>
          </div>
        </div>
      );
    }
  };
  /*
   # when we click pagination number and updating the current page value
   */

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  render() {
    /*
     Pagination data
    */

    const { currentPage, booksPerPage } = this.state;
    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    // rendering current book list

    const currentBooks = this.props.books.slice(
      indexOfFirstBook,
      indexOfLastBook
    );

    return (
      <div>
        <div className='container book-list'>
          <h4 className='title'>
            {this.props.catagory ? this.props.catagory : "Books List"}
          </h4>
          <div className='row'>{this.renderBooks(currentBooks)}</div>
          {/* Book Details Popup box start here */}
          {this.state.open ? (
            <Modal open={this.state.open} onClose={this.onCloseModal} center>
              <div>{this.renderBookModal()}</div>
            </Modal>
          ) : (
            ""
          )}
          {/* Pagination numbers start here  */}
          <div className='page'>
            <Pagination
              bookDatalength={this.props.books.length}
              booksPerPage={booksPerPage}
              click={this.handleClick}
              currentPage={this.state.currentPage}
            />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  let bookObj;
  if (state.catagory) {
    bookObj = state.books.filter(
      category => category.categories[0] === state.catagory
    );
  } else if (state.searchValue) {
    bookObj = state.books.filter(
      val =>
        val.title.toLowerCase().indexOf(state.searchValue.toLowerCase()) !== -1
    );
  } else {
    bookObj = state.books;
  }
  return {
    books: bookObj,
    catagory: state.catagory,
    searchValue: state.searchValue
  };
}

export default connect(mapStateToProps, { getData })(BookList);
