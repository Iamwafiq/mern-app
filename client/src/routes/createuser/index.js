import React from "react";
import './createuser.css'
import { connect } from "react-redux";
import { addUser, resetUserData } from "./actions";


class CreateUser extends React.Component {
	
	updateValue  (e, type) {
		const { addUserInfo } = this.props;

		addUserInfo({
			actionName: type,
			data: e.target.value
		});
	}

	uploadData = () => {
		const newobj = {
			email: this.props.email,
		  	name: this.props.name,
		  	phone: this.props.phone 
		};

		const response = fetch("http://localhost:5000/api/adduser", {
			method: "POST",
			headers: {
		      'Content-Type': 'application/json'
		    },
		    body: JSON.stringify(newobj)
		}).then((response) => response.json())
		.then((data) => {
		  console.log('Success:', data);
		  this.props.resetUser();
		})
		.catch((error) => {
		  console.error('Error:', error);
		});
	}

	render() {
		
		const { name, email, phone } = this.props;
		
		return(
			<div className="table-1">
				<div className="input-field">
					Name :<input className="input-box" type="text" defaultValue={name} onBlur={(e)=>this.updateValue(e, 'name')} /><br/>
					Email :<input className="input-box" type="email" defaultValue={email}  onBlur={(e)=>this.updateValue(e, 'email')} /><br/>
					Phone :<input className="input-box" type="text" defaultValue={phone} onBlur={(e)=>this.updateValue(e, 'phone')} /><br/>
				</div>
				<div >
					<button className="input-box" onClick={this.uploadData}>Upload Data
					</button>
					<a  href="/allusers" target='_new' ><button className="input-box">View Users</button> </a>
				</div>
				
			</div>
		)
	}
}

const mapStateToProps = state => {
  console.log(state);
  return { 
  	email: state.email,
  	name: state.name,
  	phone: state.phone 
  };
};

const mapDispatchToProps = (dispatch) => {
	return {
    	addUserInfo: (userData) => {
    		console.log(userData);
    		dispatch(addUser(userData))
    	},
    	resetUser: () => {
    		dispatch(resetUserData())
    	}
  	};
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateUser);

//export default CreateUser;