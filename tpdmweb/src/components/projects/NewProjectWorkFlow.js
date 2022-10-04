import React, { useState }  from "react";
import { Suspense } from 'react';
import { connect, useDispatch } from "react-redux";

import PdmApi from "../../services/api/PdmApi/PdmApi";
import { updateProject } from "../../stores/datas/datasAction";
import { createProjectWorkflow } from "../../stores/datas/datasAction";
import { setSelectProject } from "../../stores/ui/uiActions";

import { Button, ButtonGroup, ButtonToolbar, Form, ListGroup, InputGroup } from "react-bootstrap";

import { setForm, setShowProjectLeaderModal, 
         setProjectLeader, setProjectWorkflowTemplate } from "../../stores/ui/uiActions";
import { typeForm } from "../types/typeForm";

import ProjectWorkflowTemplate      from '../ProjectWorkflowTemplate/ProjectWorkflowTemplate';
import ProjectTaskTemplate          from '../ProjectTaskTemplate/ProjectTaskTemplate';
import ModalProjectLeaderSelector   from '../ModalProjectLeaderSelector/ModalProjectLeaderSelector';

import { roleToString } from "../../helpers/utils"

const NewProjectWorkFlow = ( props ) => {

	const dispatch = useDispatch();
    const [validated, setValidated] = useState(false);
    
    let projectWorkflowRef =            React.createRef();
    let projectWorkflowTeamLeaderRef =  React.createRef();
    let projectWorkflowCommentsRef =    React.createRef();
	let formRef =                       React.createRef();
    
    const handleSubmit = () => {
		if (formRef.current.checkValidity()) {
			onCreateProjectWorkflow();
		}
		setValidated(true);
    }

    const handleClose = () => {
        // Clear form-dependant redux variables
        dispatch( setProjectLeader( null ) );
        dispatch( setProjectWorkflowTemplate( null ) );

        //Close form
        dispatch(setForm(typeForm.Nothing))
    }

    const onCreateProjectWorkflow = async () => {
		let pdmApi = PdmApi.getInstance();
		try {
			pdmApi.createProjectWorkflow( props.selectProject, props.selectProjectWorkflowTemplate,
			                              props.selectProjectLeader, projectWorkflowCommentsRef.current.value )
            .then( ( result ) => {
				if ( result.status === 200 ) {  
                    dispatch(createProjectWorkflow(result.data.projectWorkflow));                 
                    let filteredProj = pdmApi.filterData( [ result.data.project ], props.username.username, roleToString(props.rol));
                    dispatch(updateProject( filteredProj[0] ) );
                    dispatch(setSelectProject( filteredProj[0] ) );
                    handleClose();
				}
            });     
		} catch (error) {
			console.log("[NewProjectWorkflow:onCreateProjectWorkflow] Error: " + error);
        }
    }

 
    function handleTemplateChange(event) {
        console.log( "Change Workflow template value!" );
    }

    function showModalDialog() {
        dispatch( setShowProjectLeaderModal( true ));
    }

    return (
		<>
			<hr />
			<h1>New Project Workflow</h1>
			<hr />
			<br />
			<div className="d-flex justify-content-center">
				<Form style={{ maxWidth: 300 }} noValidate validated={validated} ref={formRef}>
                    <Form.Group controlId="formProjectWorkflowTemplate">
                        <Form.Label>Workflow Template</Form.Label>
                        <Form.Control as="select" defaultValue={ props.selectProjectWorkflowTemplate}
                                                  onChange={(event) => handleTemplateChange(event)}
                                                  required ref={projectWorkflowRef} >
                             <Suspense fallback={<div>Loading...</div>}>
                                { <ProjectWorkflowTemplate /> }
                            </Suspense>
                        </Form.Control>
                    </Form.Group>       
					<Form.Group controlId="formProjectWorkflowTaskName">
						<Form.Label>Task</Form.Label>  
                        <Suspense fallback={<div>Loading...</div>}>
                            <ListGroup>
                                <ProjectTaskTemplate />
                            </ListGroup>
                        </Suspense>
					</Form.Group>
					<Form.Group controlId="formProjectWorkflowTeamLeade">
						<Form.Label>Project Leader</Form.Label>
                        <InputGroup >
                            <Form.Control type="text" placeholder="" required 
                                          value={ ( props.selectProjectLeader !== null ) && ( props.selectProjectLeader !== undefined ) ? props.selectProjectLeader.username:""  } 
                                          ref={projectWorkflowTeamLeaderRef} readOnly />
                            <InputGroup.Append>
                                <Button className="form-control border-left-0 mdi mdi-account-multiple" onClick={( event ) =>  showModalDialog(event)}></Button>
                                < ModalProjectLeaderSelector /> 
                            </InputGroup.Append>
                        </InputGroup>
					</Form.Group>
					<Form.Group controlId="formProjectWorkflowProjectName">
						<Form.Label>Project Name</Form.Label>
						<Form.Control type="text" placeholder="Project Name" value={props.selectProject?.name} readOnly/>
					</Form.Group>
					<Form.Group controlId="formProjectWorkflowComments">
						<Form.Label>Comments</Form.Label>
						<Form.Control type="text" placeholder="" required ref={projectWorkflowCommentsRef} />
					</Form.Group>
					<ButtonToolbar className="justify-content-between">
						<ButtonGroup aria-label="First group">
							<Button variant="outline-primary" onClick={() => handleSubmit()} >Create</Button>
						</ButtonGroup>
						<ButtonGroup>
							<Button variant="outline-danger" onClick={() => handleClose()}>Close</Button>
						</ButtonGroup>
					</ButtonToolbar>
				</Form>
			</div>
		</>
	);
};


const mapStateToProps = (state) => { 
    return { 
        selectProject: state.ui.selectProject,
        selectProjectWorkflowTemplate: state.ui.selectProjectWorkflowTemplate,
        showPLModal: state.ui.showPLModal,
        selectProjectLeader: state.ui.selectProjectLeader,
        username: state.loginReducer.loggedUser,
        rol : state.loginReducer.rol

    }; 
};

export default connect(mapStateToProps)(NewProjectWorkFlow);
