import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { store } from "../../stores/store";
//import { createProject } from "../../stores/datas/datasAction";
//import AuthService from "../../services/auth/AuthService";
import PdmApi from "../../services/api/PdmApi/PdmApi";
import { createProject } from "../../stores/datas/datasAction";

import { Button, ButtonGroup, ButtonToolbar, Form, InputGroup } from "react-bootstrap";

import { connect } from "react-redux";

import { setForm } from "../../stores/ui/uiActions";
import { typeForm } from "../types/typeForm";

const NewProject = ( props ) => {

	const dispatch = useDispatch();
	//const { login } = store.getState();

	const [validated, setValidated] = useState(false);

	let projectName = React.createRef();
	let projectID = React.createRef();
	let formulario = React.createRef();

	const handleSubmit = () => {
		if (formulario.current.checkValidity()) {
			onCreateProject();
		}
		setValidated(true);
	}

	const onCreateProject = async () => {
		let pdmApi = PdmApi.getInstance();
		try {
			pdmApi.createProject({
				Name:        projectName.current.value,
                Status:      '1',
                StartDate:   new Date(),
				ProjectID:   projectID.current.value,
				CreatorUser: props.loggedUser,
			}).then((result) => {
				if (result.status === 200) {
					dispatch(createProject(result.data));
					dispatch(setForm(typeForm.Nothing));
				}
			});
		} catch (error) {
			console.log("[onCreateProject] error: " + error);
		}
    }

    const GenerateID = () =>{
        projectID.current.value = Date.now().toString();
    };

	return (
		<>
			<hr />
			<h1>New Project</h1>
			<hr />
			<br />
			<div className="d-flex justify-content-center">
				<Form style={{maxWidth:'400px'}} noValidate validated={validated} ref={formulario}>
					<Form.Group controlId="formProjectName">
						<Form.Label>Project Name</Form.Label>
						<Form.Control type="text" placeholder="Project Name" required ref={projectName} />
					</Form.Group>
					<Form.Group required controlId="formProjectID">
						<Form.Label>Project ID</Form.Label>
						<InputGroup >
                            <Form.Control type="text" placeholder="" ref={projectID} readOnly required/>
                            <InputGroup.Append>
                                <Button className="form-control border-left-0 mdi mdi-key" onClick={( event ) =>  GenerateID(event)}></Button>                                
                            </InputGroup.Append>
                        </InputGroup>	
					</Form.Group>
					<Form.Group controlId="formProjectState">
						<Form.Label>Project State</Form.Label>
						<Form.Control type="text" value="Initiated" readOnly />
					</Form.Group>
					<ButtonToolbar className="justify-content-between">
						<ButtonGroup aria-label="First group">
							<Button variant="outline-primary" onClick={() => handleSubmit()} >Create</Button>
						</ButtonGroup>
						<ButtonGroup>
							<Button variant="outline-danger" onClick={() => dispatch(setForm(typeForm.Nothing))}>Close</Button>
						</ButtonGroup>
					</ButtonToolbar>
				</Form>
			</div>
		</>
	);
};

function mapStateToProps(state) {
    return {    loggedUser: state.loginReducer.loggedUser, 
                token:      state.loginReducer.token,
                rol:        state.loginReducer.rol };
  }


export default connect(mapStateToProps)(NewProject);