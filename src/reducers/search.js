const searchReducerDefaultState = [];

const searchReducer = (state = searchReducerDefaultState, action) => {
	switch (action.type) {
		case "SET_SEARCH":
			return action.search;
		case "SET_LAST_SEARCH":
			return action.lastSearch;
		case "SET_ADD_LAST_SEARCH":
			return action.search;
		default:
			return state;
	}
};

export default searchReducer;