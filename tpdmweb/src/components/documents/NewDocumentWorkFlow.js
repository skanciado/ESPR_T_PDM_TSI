import React, { useState }  from "react";
import { Suspense } from 'react';
import { connect, useDispatch } from "react-redux";
import { store } from "../../stores/store";
import PdmApi from "../../services/api/PdmApi/PdmApi";
import { createDocumentWorkflow } from "../../stores/datas/datasAction";
//import { updateWorkSpaceTasks } from "../../stores/datas/datasAction";

import { setDocumentTemplateId, setSelectProject, setSelectProjectOpen, setShowUserModal } from '../../stores/ui/uiActions'
import { updateProject } from "../../stores/datas/datasAction";
import ModalUserSelector from '../ModalUserSelector/ModalUserSelector'

import { Button, ButtonGroup, ButtonToolbar, Form, ListGroup, Modal, InputGroup } from "react-bootstrap";

import TaskList             from '../TaskList/TaskList'
import DocumentTemplateList from '../DocumentTemplateList/DocumentTemplateList'

import { setForm } from "../../stores/ui/uiActions";
import { typeForm } from "../types/typeForm";

import { roleToString } from "../../helpers/utils";

import { createResource, createCache } from 'simple-cache-provider';

const NewDocumentWorkFlow = ( props ) => {
    const dispatch = useDispatch();
    //const { ui, datas } = store.getState();

    const [validated, setValidated] = useState(false);
    const cache = createCache();
    
    let documentWorkflow = React.createRef();
    let documentWorkflowUser = React.createRef();
	let formulario = React.createRef();
    
    const handleSubmit = () => {
		if (formulario.current.checkValidity()) {
			onCreateDocumentWorkflow();
		}
		setValidated(true);
    }
    //TasksNames: documentWorkflowTaskName.current.value,
    const onCreateDocumentWorkflow = async () => {
		let pdmApi = PdmApi.getInstance();
		try {
            //const filter = {
            //    params: {UserName: documentWorkflowUser.current.value}
            //};

            let tableDocName = 'documents';
            if( (Object.keys(props.selectDocument).includes('application')))
            {
                tableDocName = 'cad-documents';
            }
			pdmApi.createDocumentWorkflow(
                props.selectProjectOpen,
                {
                    template: documentWorkflow.current.value,
                    assignedUser: documentWorkflowUser.current.value,
                    document: props.selectDocument,
                    task: props.currentWorkflowTasks
                }, 
                props.selectDocument, 
                tableDocName).then((result) => {
				if (result.status === 200) {   
                    dispatch(createDocumentWorkflow(result.data, props.selectDocument, props.selectProjectOpen, props.selectFolder));
                    let project = pdmApi.filterData([props.selectProjectOpen], props.oUser.username, roleToString(props.oRol))
                    dispatch(setSelectProject( project[0]));
                    dispatch(updateProject( project[0]));
                    //onFindWorkSpaceTask(filter);               
					dispatch(setForm(typeForm.Nothing));
				}
            });     
		} catch (error) {
			console.log("error: " + error);
        }
    }

    /*const onFindWorkSpaceTask = async (filter) => {
		let pdmApi = PdmApi.getInstance();
		try {
            pdmApi.findWorkSpaceTask(filter).then((result) => {
				if (result.status === 200) {
                    this.props.dispatch(updateWorkSpaceTasks(result.data.tasks));
				}
            });     
		} catch (error) {
			console.log("error: " + error);
        }
    }*/

    /*const onGetWorkflowsDocument = async () => {
		let pdmApi = PdmApi.getInstance();
		try {
            const filter = {
                params: {IsProject: false}
            };
            let listWorkflowsDocumen = [];
			await pdmApi.getDocumentWorkflows(filter).then((result) => {
				if (result.status === 200) {           
                    listWorkflowsDocumen = result.data.map(n => {                           
                        return(<option>{n.WorkflowName}</option>)
                    })
                };
            });
            return listWorkflowsDocumen;
		} catch (error) {
			console.log("error: " + error);
		}
    }
    const WorkflowsDocumenResource = createResource(onGetWorkflowsDocument);
    const DataWorkflowsDocument = () => {
        return WorkflowsDocumenResource.read(cache);
    }; */

    // const onGetTasksName = async () => {
	// 	let pdmApi = PdmApi.getInstance();
	// 	try {
    //         let listTasks = [];
	// 		await pdmApi.getTasks().then((result) => {
	// 			if (result.status === 200) {           
    //                 listTasks = result.data.map(n => {                           
    //                     return(
    //                             <ListGroup.Item>
    //                                 {n.Name}
    //                             </ListGroup.Item>
    //                             )
    //                 })
    //             };
    //         });
    //         return listTasks;
	// 	} catch (error) {
	// 		console.log("error: " + error);
	// 	}
    // }
    // const TasksResource = createResource(onGetTasksName);
    // const DataTasks = () => {
    //     return TasksResource.read(cache);
    // }; 


    const onGetUsers = async () => {
		let pdmApi = PdmApi.getInstance();
		try {
            const filter = {
                params: {ProjectName: props.selectProjectOpen.name}
            };
            let listUsers = [];
			await pdmApi.getTeam(filter).then((result) => {
				if (result.status === 200) {
                    let usersTeam = [];
                    usersTeam = result.data[0].Team.split(";");
                    listUsers = usersTeam.map(ul => { 
                        return(
                            <ListGroup.Item action onClick={() => (documentWorkflowUser.current.value = ul)}>
                                {ul}
                            </ListGroup.Item>
                        )
                    });
                };
            });
            return listUsers;
		} catch (error) {
			console.log("error: " + error);
		}
    }
    // const UsersResource = createResource(onGetUsers);
    // const DataUsers = () => {
    //     return UsersResource.read(cache);
    // };

    // const [show, setShow] = useState(false);      
    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
    // function GetUsers() {
    //     return (
    //       <>
    //         <i className="form-control border-left-0 mdi mdi-account-multiple" onClick={handleShow}></i>  
    //         <Modal show={show} onHide={handleClose}>
    //           <Modal.Header closeButton>
    //             <Modal.Title>Users</Modal.Title>
    //           </Modal.Header>
    //           <Modal.Body>
    //             <Suspense fallback={<div>Loading...</div>}>
    //                 <ListGroup >
    //                     <DataUsers />
    //                 </ListGroup>
    //             </Suspense>
    //           </Modal.Body>
    //           <Modal.Footer>
    //             <Button variant="secondary" onClick={handleClose}>
    //               Close
    //             </Button>
    //           </Modal.Footer>
    //         </Modal>
    //       </>
    //     );
    // }

    function handleTemplateChange( event ) {
        console.log( event );
        var iCurrentValue = documentWorkflow.current.value;
        dispatch(setDocumentTemplateId( iCurrentValue )) ;
    }

    function showModalDialog() {
        dispatch( setShowUserModal( true ));
    }
 
    return (
		<>
			<hr />
			<h1>New Document Workflow</h1>
			<hr />
			<br />
			<div className="d-flex justify-content-center">
				<Form style={{ maxWidth: 300 }} noValidate validated={validated} ref={formulario}>
                    <Form.Group controlId="formDocumentWorkflowTemplate">
                        <Form.Label>Document Template</Form.Label>
                        <Form.Control as="select" placeholder="Task" required ref={documentWorkflow} onChange={ (event) => handleTemplateChange( event ) } >
                             <Suspense fallback={<div>Loading...</div>}>
                                {/* <DataWorkflowsDocument />  */}
                                <DocumentTemplateList />
                            </Suspense>
                        </Form.Control>
                    </Form.Group>       
					<Form.Group controlId="formDocumentWorkflowTaskName">
						<Form.Label>Task</Form.Label>  
                        <Suspense fallback={<div>Loading...</div>}>
                            <ListGroup>
                                {/* <DataTasks /> */}
                                <TaskList key="tasks-list" templateId={props.templateId} />
                            </ListGroup>
                        </Suspense>
					</Form.Group>
					<Form.Group controlId="formDocumentWorkflowTeamLeade">
						<Form.Label>User Assigned</Form.Label>
                        <InputGroup >
                            <Form.Control type="text" placeholder="" required 
                                          value={ ( props.selectWorkflowUser !== null ) && ( props.selectWorkflowUser !== undefined ) ? props.selectWorkflowUser.username:""  } 
                                          ref={documentWorkflowUser} readOnly />
                            <InputGroup.Append>
                                <Button className="form-control border-left-0 mdi mdi-account-multiple" onClick={( event ) =>  showModalDialog(event)}></Button>
                                < ModalUserSelector /> 
                            </InputGroup.Append>
                        </InputGroup>
					</Form.Group>
					<Form.Group controlId="formDocumentWorkflowDocumentName">
						<Form.Label>Document Attached</Form.Label>
						<Form.Control type="text" placeholder="Document Name" value={props.selectDocument.name} readOnly/>
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


const mapStateToProps = (state) => { 
    return { 
        selectDocument:         state.ui.selectDocument,
        selectProjectOpen:      state.ui.selectProjectOpen,
        currentWorkflowTasks:   state.ui.currentWorkflowTasks,
        templateId:             state.ui.templateId,
        selectWorkflowUser:     state.ui.selectWorkflowUser,
        selectFolder:           state.ui.selectFolder,
        oUser:                  state.loginReducer.loggedUser,
        oRol :                  state.loginReducer.rol
    }; 
};

export default connect(mapStateToProps)(NewDocumentWorkFlow);