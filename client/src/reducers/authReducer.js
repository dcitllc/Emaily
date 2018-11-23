import { FETCH_USER } from "../actions/types";

// Create reducer with default state being an empty object
export default function(state = null, action) {
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false;
    default:
      return state;
  }
}
