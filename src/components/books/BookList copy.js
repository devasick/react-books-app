import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from "react-responsive-modal";
import { getData } from "../../redux/actions/index";
import Pagination from "../pagination/Pagination";
import BooksDetails from "./BooksDetails";
import "./booklist.scss";
import update from "react-addons-update";

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

  renderBookModal = () => {
    // Check to see if there's a selected book. If so, render it.
    if (this.state.selectedBook !== null) {
      const book = this.props.books.results.filter(
        a => a.id === this.state.selectedBook
      );
      return (
        <div style={{ width: 650, height: 600 }} className='book-details'>
          <div className='row'>
            <h5>{book[0].title}</h5>
            <div className='col m6'>
              <img src={book[0].thumbnailUrl} alt={book[0].title} />
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
    let getBookData;
    if (this.props.catagory) {
      getBookData = this.props.books.results.filter(
        a => a.categories[0] === this.props.catagory
      );
    } else {
      getBookData = this.props.books.results;
    }

    /*
     Pagination data
    */

    const { currentPage, booksPerPage } = this.state;
    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    // rendering current book list

    // const getBookData = this.props.books;
    const currentBooks = getBookData.slice(indexOfFirstBook, indexOfLastBook);
    // console.log(this.props.books);
    return (
      <div>
        <div className='container book-list'>
          <h4>{this.props.catagory ? this.props.catagory : "Books List"}</h4>
          <div className='row'>
            <BooksDetails data={currentBooks} click={this.onOpenModal} />
          </div>
          {/* Book Details Popup box start here */}
          <Modal open={this.state.open} onClose={this.onCloseModal} center>
            <div>{this.renderBookModal()}</div>
          </Modal>
          {/* Pagination numbers start here  */}
          <div className='page'>
            <Pagination
              bookDatalength={this.props.books.results.length}
              booksPerPage={booksPerPage}
              click={this.handleClick}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  //if (newObj)
  return {
    books: state.books,
    catagory: state.catagory
  };
}

export default connect(mapStateToProps, { getData })(BookList);
