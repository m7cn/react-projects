import React from 'react';
import { Link } from 'react-router-dom';

export default function PageNotFound(props){
    return (
        <div>
        	<h2>Page not Found 404</h2>
        	<Link to='/'>Back to Home</Link>
        </div>
    );
};