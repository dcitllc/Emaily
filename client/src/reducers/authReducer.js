// Create reducer with default state being an empty object
export default function(state = {}, action) {
  console.log(action);
  switch (action.type) {
    default:
      return state;
  }
}
