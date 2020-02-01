const initialState = {
  books: [],
  catagory: "",
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
        ...state,
        books: state.books,
        catagory: action.category
      });
    }
    case "SEARCH": {
      return {
        ...state,
        searchValue: action.value
      };
    }

    default:
      return state;
  }
}

export default rootReducer;
