import React from "react";

import { Row, Col, Container } from "react-bootstrap";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

//import AuthService from "../../services/auth/AuthService";

import HeaderUp from "../headerUp/headerUp";

import Back from "../Back/Back";
import WorkSpace from "../workSpace/WorkSpace";

import Projects from "../projects/Projects";
import NewProject from "../projects/NewProject";
import NewProjectWorkFlow from "../projects/NewProjectWorkFlow";
import SearchForProject from "../projects/SearchForProject";

import Folders from "../folders/Folders";

import Documents from "../documents/Documents";
import NewDocument from "../documents/NewDocument";
import NewDocumentWorkFlow from "../documents/NewDocumentWorkFlow";
import NewCADDocument from "../documents/NewCADDocument";
import SearchForDocument from "../documents/SearchForDocument";

import NothingInfo from "../info/nothingInfo/NothingInfo";
import DocumentInfo from "../info/documentInfo/DocumentInfo";
import FolderInfo from "../info/folderInfo/FolderInfo";
import ProjectInfo from "../info/projectInfo/ProjectInfo";
import TaskInfo from "../info/taskInfo/TaskInfo";
import DocumentTaskInfo from "../info/documentTaskInfo/DocumentTaskInfo";

import WorkFlows from "../workFlows/WorkFlows";

//import { typeComponent } from "../types/typeComponent";
//import { setComponent } from "../../stores/ui/uiActions";
import Options from "./Options";

import "./Home.css";
import { typeForm } from "../types/typeForm";

class Home extends React.Component {
	state = { redirectToReferrer: false };

	constructor(props) {
		super(props);
		//this.logoutHandler = this.logoutHandler.bind(this);
		this.state = { redirectToReferrer: false };
	}

	/*async logoutHandler() {
		const authService = new AuthService();
		await authService.logout();
		this.setState({
			redirectToReferrer: true,
		});
		return <Redirect to={"/login"} />;
	}*/

	comp = [<Back />, <WorkSpace />, <Projects />, <Folders />, <Documents />, <WorkFlows />];
	info = [<NothingInfo />, <ProjectInfo />, <FolderInfo />, <DocumentInfo />, <TaskInfo />, <DocumentTaskInfo />];
	form = [<></>, <NewProject />, <NewProjectWorkFlow />, <SearchForProject />, <NewDocument />, <NewCADDocument />, <SearchForDocument />, <NewDocumentWorkFlow />];
	sear = [<></>, <SearchForProject />, <SearchForDocument />]; // TODO 

	style = {
		container: {
			margin: "10px 0 0 0",
			maxWidth: "100%",
			maxHeight: "100%",
		},
	};

	render() {
		let containerA;
		let containerB = "";

		if (this.props.ui.currentForm === typeForm.Nothing) {
			containerA = <div className="col-fill-remaining">{this.comp[this.props.ui.currentComponent]}</div>;
			containerB = <Col sm={4}>{this.info[this.props.ui.currentInfo]}</Col>;
		} else {
			containerA = <div className="col-fill-remaining mr-3">{this.form[this.props.ui.currentForm]}</div>
		}

		return (
			<>
				<HeaderUp />

				<Container style={this.style.container}>
					<Row>
						<Col sm={2} className="col-min-width-230 mx-3">
							<Options />
						</Col>
						{containerA}
						{containerB}
					</Row>
				</Container>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	//console.log(state);
	return {
		...state,
		loggedUser: state.loggedUser,
		isUserLogged: state.isUserLogged,
	};
};

export default connect(mapStateToProps)(Home);
