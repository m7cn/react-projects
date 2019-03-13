import React from 'react';

export default function About(props){
    return (
        <div>
        	<h2>About page</h2>
        	<h5>{props.match.params.id}</h5>
        	<h5>{props.match.params.name}</h5>
        	<p>
        		Lo	Eiusmod mollit cillum laborum eu aute eu consequat excepteur aliqua adipisicing non sed fugiat sed cillum.
        	</p>
        </div>
    );
};

