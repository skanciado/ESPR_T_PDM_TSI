import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import AuthService from '../services/auth/AuthService'


import { useDispatch } from "react-redux";

import { clean } from "../stores/ui/uiActions";
import { resetData } from "../stores/datas/datasAction";

//import { useSelector } from "react-redux";

const ProtectedRoute = ( {component:Component, ...rest } ) => {
    const authService = new AuthService();
    const isLoggedIn = authService.isAuthenticated();
    
    // // Clean redux storage, Uncomment in case of saving wrong/corrupted data
    // const dispatch = useDispatch();
    // localStorage.clear();
    // dispatch(clean());
    // dispatch(resetData());

	return (
		<Route  {...rest}
			    component={(props) => (
				    (isLoggedIn) ? (<Component {...props} />) : (<Redirect to="/login" />)
			    )}
		/>
	);
 } ;

 ProtectedRoute.propTypes = {
	component: PropTypes.func.isRequired
}

 export default ProtectedRoute;