const initialState = {
  name: '',
  email: '',
  phone: '',
  users: [],
  csvContent: '',
  fileName: '',
};

function rootReducer(state = initialState, action) {
	console.log(action);
	if (action.type === "ADD_USER") {
    	return {
    	   ...state,
          [action.payload.actionName]: action.payload.data
      	};
  	} else if(action.type === 'RESET_USER_DATA') {
  		return {
  			...state,
  			name: '',
			 email: '',
			 phone: '',
  		};
  	}else if (action.type === 'USER_LIST'){
      console.log(action);
      return{
        ...state,
        users: action.payload.data,
      }
    }else if (action.type === 'CREATE_CSV_CONTENT'){
      return{
        ...state,
        csvContent: action.payload.data,
        fileName: action.payload.fileName
      }
    }
    return state;
};

export default rootReducer;