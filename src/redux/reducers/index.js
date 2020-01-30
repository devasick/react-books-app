const jsonData = require("../../data/books-data.json");
const initialState = {
  books: jsonData,
  catagory: "",
  currentPage: 1
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "DATA_REQUESTED": {
      return Object.assign({}, state, {
        books: state.books
      });
    }
    case "SEND_CATEGORY": {
      return Object.assign({}, state, {
        catagory: action.category,
        currentPage: 1
      });
    }
    default:
      return state;
  }
}

export default rootReducer;
