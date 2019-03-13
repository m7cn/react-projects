import React, { Component } from 'react';
import {Consumer} from '../context';
import TextInputGroup from '../helpers/textInputGroup';
import axios  from 'axios';

class EditContact extends Component {
	state = {
		name:'',
		email:'',
		phone:'',
		errors:{}
	}

	async componentDidMount(){
		const id = this.props.match.params.id;
		try{
			const res = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
    		this.setState({
    			name:res.data.name,
				email:res.data.email,
				phone:res.data.phone,
			})
    	}catch(err){
            console.log(err)
        }
	}

	onChangeInput = (e) => this.setState({[e.target.name]:e.target.value});
	
	submit = async (dispatch, size, e) => {
		e.preventDefault();
		const { name, email, phone} = this.state;
		if(name === ""){
			this.setState({errors:{name:"the Name is required!"}});
			return;
		}
		if(email === ""){
			this.setState({errors:{email:"the Email is required!"}});
			return;
		}
		if(phone === ""){
			this.setState({errors:{phone:"the Phone is required!"}});
			return;
		}
		const upContact = {
				name,
				email,
				phone
		}
		const id = this.props.match.params.id;
		try{
			const res = await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`,upContact);
			dispatch({
					type:"UPDATE_CONTACT",
					payload:res.data
				})
		}catch(err){
            console.log(err)
        }
		
		this.setState({
			name:'',
			email:'',
			phone:'',
			errors:{}
		})

		this.props.history.push('/')
	}

    render() {
    	const { name, email, phone,errors} = this.state;
    	return(
    		<Consumer>
    			{value => {
    				const { dispatch } = value;
					return(
						<div>
			            	<form onSubmit={this.submit.bind(this,dispatch,value.contacts.length)}>
				            	<div className="card">
					                <div className="card-body">
					                    <h4 className="card-title">Edit Contact</h4>
					                    <div className="card-text">
							        		<TextInputGroup label="Name" 
							        						type="text" 
							        						name="name" 
							        						value={name} 
							        						onChange={this.onChangeInput}
							        						error={errors.name}
							        						>
							        		</TextInputGroup>
							        		<TextInputGroup label="Email" 
							        						type="Email" 
							        						name="email" 
							        						value={email} 
							        						onChange={this.onChangeInput}
							        						error={errors.email}
							        						>
							        		</TextInputGroup>
							        		<TextInputGroup label="Tel" 
							        						type="text" 
							        						name="phone" 
							        						value={phone} 
							        						onChange={this.onChangeInput}
							        						error={errors.phone}
							        						>
							        		</TextInputGroup>
							        		<button type="submit" className="btn btn-primary btn-lg btn-block btn-danger">Update Contact</button>
							            </div>
					                </div>
					            </div>
				            </form>
			        	</div>
						)
    				}
    			}
    		</Consumer>
    	)
    }
}

export default EditContact;
