import database from "../firebase/firebase.js";

export const setSearch = (search) => ({
	type: "SET_SEARCH",
	search
});

export const startSetSearch = (search) => {
	return (dispatch) => {
		return database.ref('search').once("value").then((snapshot) => {
			const searchList = [];

			snapshot.forEach((childSnapshot) => {
				searchList.push({
					id: childSnapshot.key,
					...childSnapshot.val()
				});
			});

			dispatch(setSearch(searchList));
		});
	};
};

export const setAddLastSearch = (search) => ({
	type: "SET_LAST_SEARCH",
	search
});

export const startAddLastSearch = (search) => {
	return (dispatch) => {
		return database.ref('lastSearch').set(search).then(() => {
			dispatch(setLastSearch(search));
		});
	};
};

export const setLastSearch = (search) => ({
	type: "SET_LAST_SEARCH",
	search
});

export const startSetLastSearch = () => {
	return (dispatch) => {
		return database.ref('lastSearch').once("value").then((snapshot) => {
			dispatch(setLastSearch(snapshot.val()));
		});
	};
};
