import React, { Component } from 'react';
import axios  from 'axios';

const Context = React.createContext(); 

const reducer = (state,action)=>{
	switch(action.type){
		case 'DELETE_CONTACT':
			return {
				contacts : state.contacts.filter((contact)=> contact.id !== action.payload)
			};

		case 'ADD_CONTACT':
			return {
				contacts : [action.payload,...state.contacts]
			};

		case 'UPDATE_CONTACT':
			return {
				contacts : state.contacts.map(contact => contact.id === action.payload.id ? contact = action.payload: contact)
			};
		default:
			return state;
	}
}

export class Provider extends Component {
	state = {
    	contacts : [
    		{id:"1" , name:"Achour Mouhcine", phone:"016056213", email:"mouhcine.new@gmail.com"},
    		{id:"2" , name:"Achour Douaa", phone:"016056223", email:"douaa.new@gmail.com"},
    		{id:"3" , name:"Achour soufian", phone:"01605625", email:"soufian.new@gmail.com"},
    	],
    	dispatch: action => this.setState(state => reducer(state,action))

    }
    async componentDidMount(){
    	/*axios.get('https://jsonplaceholder.typicode.com/users')
    		.then(res => this.setState({contacts:res.data}))
    		.catch(err => console.error(err))*/
    	try{
			const res = await axios.get('https://jsonplaceholder.typicode.com/users');
    		this.setState({contacts:res.data})
    	}catch(err){
            console.log(err)
        }
    	

    }
    render() {
        return (
            <Context.Provider value={this.state} >
            	{this.props.children}
            </Context.Provider>
        );
    }
}

export const Consumer = Context.Consumer;
