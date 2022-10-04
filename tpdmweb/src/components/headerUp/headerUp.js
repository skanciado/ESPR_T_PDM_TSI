import React from "react";
import { useDispatch } from "react-redux";
import { Navbar, Nav, OverlayTrigger, Popover, Button } from "react-bootstrap";
import { store } from "../../stores/store";
import { clean } from "../../stores/ui/uiActions";
import { resetData } from "../../stores/datas/datasAction";
import AuthService from "../../services/auth/AuthService";
import { useHistory } from "react-router-dom";
import { roleToString } from "../../helpers/utils";

import { connect } from "react-redux";

import "./headerUp.css";

const HeaderUp = ( props ) => {
	const history = useHistory();
	const dispatch = useDispatch();
    //const { login } = store.getState();

	const logoutHandler = async () => {
		const authService = new AuthService();
		await authService.logout();

        // TODO: Restore when implementing Strapi integration
		dispatch(clean());
        dispatch(resetData());

		history.push("/login");
	};

	return (
		<Navbar collapseOnSelect expand="lg" className="header">
			<Navbar.Brand href="#home">
				<strong className="tpdm">Incremental {global.appVersion}</strong>
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="responsive-navbar-nav" />
			<Navbar.Collapse id="responsive-navbar-nav">
				<Nav className="mr-auto"></Nav>
				<Nav>
					<span className="mdi mdi-magnify navIconsHeader"></span>
					<OverlayTrigger
						trigger="click"
						key='bottom'
						placement={'bottom'}
						overlay={
							<Popover id={`popover-positioned-${'bottom'}`}>
								<Popover.Title as="h3">{props.loggedUser.username}</Popover.Title>
								<Popover.Content>
									<strong>Role: </strong> {roleToString( props.rol )}<br />
									<strong>Group: </strong> {props.loggedUser.group}<br />
									<br />
									<div className="d-flex justify-content-center">
										<Button variant="outline-danger" onClick={() => logoutHandler()}>Logout</Button>
									</div>
								</Popover.Content>
							</Popover>
						}
					>
						<span className="mdi mdi-account-outline navIconsHeader"></span>
					</OverlayTrigger>
					<span className="mdi mdi-cog-outline navIconsHeader"></span>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
};

function mapStateToProps(state) {
    return {    loggedUser: state.loginReducer.loggedUser, 
                rol:        state.loginReducer.rol };
  }


export default connect(mapStateToProps)(HeaderUp);