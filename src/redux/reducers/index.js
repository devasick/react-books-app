const initialState = {
  books: [],
  catagory: "Business",
  searchValue: ""
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "DATA_LOADED": {
      return Object.assign({}, state, {
        books: state.books.concat(action.payload)
      });
    }
    case "SEND_CATEGORY": {
      return Object.assign({}, state, {
        books: state.books,
        catagory: action.category
      });
    }
    case "SEARCH": {
      return {
        books: state.books,
        searchValue: action.value,
        catagory: action.category
      };
    }
    default:
      return state;
  }
}

export default rootReducer;
