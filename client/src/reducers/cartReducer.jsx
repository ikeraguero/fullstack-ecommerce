const initialState = {
  cart: [],
};

function cartReducer(state, action) {
  switch (action.type) {
    case "loadCart":
      return { ...state, cart: action.payload };
  }
}
