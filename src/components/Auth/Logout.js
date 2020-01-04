import React from "react";
import {Redirect} from 'react-router-dom';

function Logout () {
        sessionStorage.clear();
        return (
            <div>
            <Redirect to="/"/>
            </div>
        );
    
}

export default Logout;