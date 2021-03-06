export default (state, action) => {
  switch (action.type) {
    case 'SET_FETCHED_ADDRESSES':
      console.log(action.payload);
      return {
        ...state,
        fetchedAddresses: action.payload,
      };
    case 'EDIT_SINGLE_ADDRESS':
      return {
        ...state,
        singleAddress: action.payload,
      };
    case 'SET_SEARCHED_ADDRESSES':
      return {
        ...state,
        searchedAddresses: action.payload,
      };
    default:
      return state;
  }
};
