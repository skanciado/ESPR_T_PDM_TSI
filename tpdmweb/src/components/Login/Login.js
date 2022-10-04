import React from "react";
import PdmApi from '../../services/api/PdmApi/PdmApi';
import AuthService from "../../services/auth/AuthService";
import { roleToString } from "../../helpers/utils"

import {  loginUser,
          setRedirectToReferrer,
	      loginFailed               } from "../../stores/Login/Login_Actions";

import { Form, Button, Alert } from "react-bootstrap";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import "./Login.css";

class Login extends React.Component {
	//state = { redirectToReferrer: false, valid: false };

	constructor(props) {
		super(props);

		this.formRef          = React.createRef();
		this.userNameInputRef = React.createRef();
		this.passwordInputRef = React.createRef();
		this.roleInputRef     = React.createRef();

		this.loginHandler = this.loginHandler.bind(this);
        this.props.dispatch( setRedirectToReferrer(false) );
	}

	async loginHandler(event) {
		event.preventDefault();

        const iRoleValue = this.roleInputRef.current.value;

        const bCond1 = ( iRoleValue === "0" );
        const bCond2 = ( !this.formRef.current.checkValidity() );
		
		if ( bCond1 || bCond2 ) {
            this.props.dispatch( loginFailed() )
			//this.setState({ valid: false });
			return;
		}

		/*if (!this.formulary.current.checkValidity()) {
			this.setState({ valid: false });
			return;
		}*/

		const userNameVal = this.userNameInputRef.current.value;
		const passwordVal = this.passwordInputRef.current.value;

		var authService = new AuthService();

		try {
            const sSelectedRolName = roleToString( iRoleValue );
			const result = await authService.loginUser( userNameVal, passwordVal, sSelectedRolName);

			if (result.status === 200) {
				//console.log("after authService.loginUser", result);
				const oLoginInfo = {};
				oLoginInfo["userInfo"] = result.data.user;
				oLoginInfo["token"] = result.data.jwt;
				
				this.props.dispatch(loginUser(oLoginInfo, iRoleValue));
				//console.log(oLoginInfo);

				// Obtener su workspace
				let pdmApi = PdmApi.getInstance();
				console.log(oLoginInfo.userInfo.id);
               
                
                // ------------------------------------------------------------
                //  TODO: Only for testing purposes. Remove after Strapi development
                pdmApi.testStrapiMethods( ).then((result) => {
                    if (result.status === 200) {
                        console.log( "200 success. Data: "+ JSON.stringify( result.data ) );
                    } else {
                        console.log( "Error" );
                    }
                });
                //-------------------------------------------------------------

                
            

                //Load user WorkSpace
                //Moved to Options.js to enable the user to reload the workspace
                this.props.dispatch(setRedirectToReferrer(true));
				
			} else {
				this.props.dispatch(loginFailed());
			}
		} catch (error) {
			console.log("error: " + error);
		}
	}

	render() {
		let { from } = this.props.location.state || { from: { pathname: "/" } };
		//console.log(from);
		//let { redirectToReferrer, valid } = this.state;
		if (this.props.redirectToReferrer) {
			//if (this.props.login.redirectToReferrer) {
			return <Redirect to={from} />;
		}

		const alertClass = this.props.loginFailed ? "p-1" : "p-1 d-none";
		return (
			<div className="formContainer">
				<div className="formTitle">Incremental</div>
				<Form className="formLogin" noValidate  ref={this.formRef}>

					<Alert className={alertClass} key="loginFailed" variant="danger">Login failed</Alert>

					<Form.Group controlId="formBasicEmail">
						<Form.Label>User</Form.Label>
						<Form.Control
							required
							type="email"
							placeholder="User name"
							ref={this.userNameInputRef}
						/>
					</Form.Group>

					<Form.Group controlId="formBasicPassword">
						<Form.Label>Password</Form.Label>
						<Form.Control required type="password" placeholder="Password" ref={this.passwordInputRef} />
					</Form.Group>

					<Form.Group controlId="formBasicRole">
						<Form.Label>Rol</Form.Label>
						<Form.Control as="select" required ref={this.roleInputRef}>
							<option value="0">Choose...</option>
							<option value="1">Manager</option>
							<option value="2">Commercial</option>
							<option value="3">Designer</option>
						</Form.Control>
					</Form.Group>

					<Button variant="outline-primary" onClick={this.loginHandler}>Login</Button>

				</Form>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		//...state,
		loggedUser:         state.loginReducer.loggedUser,
		isUserLogged:       state.loginReducer.isUserLogged,
		redirectToReferrer: state.loginReducer.redirectToReferrer,
		loginFailed:        state.loginReducer.loginFailed,
        loginValid:         state.loginReducer.loginValid
	};
};

export default connect(mapStateToProps)(Login);
