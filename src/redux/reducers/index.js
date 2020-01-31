const jsonData = require("../../data/books-data.json");
const initialState = {
  books: jsonData,
  catagory: ""
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "DATA_REQUESTED": {
      return Object.assign({}, state, {
        books: state.books
      });
    }
    case "SEND_CATEGORY": {
      // const newData = state.books.results.filter(
      //   a => a.categories[0] === action.category
      // );
      //console.log(newData);
      return Object.assign({}, state, {
        books: state.books,
        catagory: action.category
      });
    }

    default:
      return state;
  }
}

export default rootReducer;
