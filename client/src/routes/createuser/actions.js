export function addUser(payload) {
	console.log(payload);
	return { 
	  	type: "ADD_USER", 
	  	payload 
	}
};

export function resetUserData(argument) {
	return { 
	  	type: "RESET_USER_DATA" 
	}
}