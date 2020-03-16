import React from "react";
import { connect } from "react-redux";
import {  userList, createCSVContent} from "./actions";
import './view.css';

class ViewUser extends React.Component {


	downloadSingleFile (param1, index) {

		const {downloadCSV} = this.props;

		const rows = [
	    [param1.name, param1.email, param1.phone]
	   
		];

		let csvContent = "data:text/csv;charset=utf-8," 
    + rows.map(e => e.join(",")).join("\n");

		downloadCSV({
				data: csvContent,
				fileName: `${param1.name}-${index}`,
		});

	}

	downloadAll(){
		const{downloadCSV, users} = this.props;

		const rows = []
		for(let i=0; i<users.length; i++){
	    rows.push([users[i].name, users[i].email, users[i].phone])
		}
		console.log(rows);

		let csvContent = "data:text/csv;charset=utf-8," 
    + rows.map(e => e.join(",")).join("\n");

		downloadCSV({
				data: csvContent,
				fileName: "Users List",
		});

	}

	createCSVLink (csvContent, fileName) {
		var encodedUri = encodeURI(csvContent);
		var link = document.createElement("a");
		link.setAttribute("href", encodedUri);
		link.setAttribute("download", fileName+".csv");
		document.body.appendChild(link); // Required for FF

		link.click();
	}


	componentWillReceiveProps(nextProps, prevProps) {
		const {downloadCSV} = this.props;
		console.log(nextProps.csvContent);
		if(prevProps.csvContent != nextProps.csvContent && nextProps.csvContent ) {
			this.createCSVLink(nextProps.csvContent, nextProps.fileName);
			downloadCSV({
				data: '',
				fileName: '',
			}); // reset the csv
		}
	}

	componentDidMount () {
		const { allUsersData } = this.props;

		const response = fetch("http://localhost:5000/api/users", {
			method: "GET",
		   
		}).then((response) => response.json())
		.then((res) => {
		  console.log('Success:', res);
		  console.log(res.data);
		  allUsersData({
		  	data: res.data
		  });
			// dispatch an action and update store with all users
		})
		.catch((error) => {
		  console.error('Error:', error);
		});
	}

	 deleteUser (event, param) {
        

        if (
            window.confirm(
                `Do tou want to delete ${param.name.toUpperCase()} permanently?`,
            )
        ) {
        	const response = fetch("http://localhost:5000/api/remove/"+param._id, {
			method: "DELETE",
		}) 
		window.location.reload();
        	
           
        }
    }

	downloadSinglePDF(obj) {
		  let idName = `pdf-name-${obj.index}`;
		  let idEmail = `pdf-email-${obj.index}`;
		  let idPhone = `pdf-phone-${obj.index}`;

		  let mywindow = window.open('', 'PRINT', 'height=650,width=900,top=100,left=150');
		  mywindow.document.write(`<html><head><title>Assignment</title>`);
		  mywindow.document.write('</head><body>');

		  mywindow.document.write('<table><tbody><tr>'+
		   	'<td>'+document.getElementById(idName).innerHTML+'</td>'+
		   	'<td>'+document.getElementById(idEmail).innerHTML+'</td>'+
		   	'<td>'+document.getElementById(idPhone).innerHTML+'</td>'+
		   	'</tr></tbody></table>');

		  mywindow.document.write('</body></html>');

		  mywindow.document.close(); 
		  mywindow.focus(); 
		  mywindow.print();
		  mywindow.close();
	}	
	


	createUsers () {
		const {users} = this.props;
		const list = [];
		for(let i=0; i<users.length; i++){
			list.push(
				
					<tbody>
						<tr >
							<td className='each-cell' id={`pdf-name-${i}`}>
							{users[i].name}
							</td>
							<td className='each-cell' id={`pdf-email-${i}`}>
							{users[i].email}
							</td>
							<td className='each-cell' id={`pdf-phone-${i}`}>
							{users[i].phone}
							</td>
							<td className='each-cell' onClick={() => this.downloadSingleFile(users[i], i)}>
							 <button>Donwload</button>
							</td>
							<td className='each-cell' onClick={() => this.downloadSinglePDF({index: i})}>
							 <button>Donwload</button>
							</td>
							<td className='each-cell' onClick={(event) => this.deleteUser(event, users[i])}>
							 <button>Delete</button>
							</td>
						</tr>
					</tbody>
				
			)
			
		}

		return(
			<table className='table'>
			<thead>
				<tr>
					<td className='list-header'>Name</td>
					<td className='list-header'>Email</td>
					<td className='list-header'>Phone</td>
					<td className='list-header'>Download CSV</td>
					<td className='list-header'>Download PDF</td>
				</tr>
			</thead>
				{list}
	
			</table>
		);

	}
	
	
	render() {
		return(
			<div className='body'>
				{this.props.users? <h2>USERS</h2>: <h1>Error 404</h1>}
				{this.props.users.length? <div>{this.createUsers()}</div> : ""}
				{this.props.users.length? <h3  onClick={() =>this.downloadAll()}><button className='each-cell'>Download All</button></h3>: ""}
			</div>
		)
	}
}

const mapStateToProps = state => {
  console.log(state);
  return { 
  	users: state.users,
  	csvContent: state.csvContent,
  	fileName: state.fileName
  };
};

const mapDispatchToProps = (dispatch) => {
	return {
		downloadCSV: (data) =>{
			dispatch(createCSVContent(data))
		},

		allUsersData: (data) =>{
			dispatch(userList(data))
		}    	
  	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewUser);
