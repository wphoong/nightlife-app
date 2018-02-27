const searchReducerDefaultState = [];

const searchReducer = (state = searchReducerDefaultState, action) => {
	switch (action.type) {
		case "SET_SEARCH":
			return action.search;
		case "SET_LAST_SEARCH":
			return action.search;
		default:
			return state;
	}
};