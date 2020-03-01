export function userList (payload) {
	console.log(payload);
	return { 
	  	type: "USER_LIST", 
	  	payload 
	}
};


export function createCSVContent (payload) {
	console.log(payload);
	return { 
	  	type: "CREATE_CSV_CONTENT", 
	  	payload 
	}
};

