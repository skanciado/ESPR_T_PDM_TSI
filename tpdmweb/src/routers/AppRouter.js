import React          from 'react';
import ProtectedRoute from './ProtectedRoute';

import Login  from '../components/Login/Login';
import Home   from '../components/Home/Home';

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

 const AppRouter = () => {
	 
	return (
		<BrowserRouter>
            <Switch>
                <Route 
                    path="/login" 
                    component={props => <Login {...props} /> }
                /> 
                <ProtectedRoute 
                    path="/"
                    component={props => <Home {...props} />}
                /> 
                {/* <Redirect to="/login" /> */}
            </Switch>
            
		</BrowserRouter>		
	);
}

export default AppRouter;