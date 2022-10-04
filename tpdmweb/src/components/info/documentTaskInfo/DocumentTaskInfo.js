import React, { useState }  from "react";
import { useDispatch } from "react-redux";

import { connect } from "react-redux";
import PdmApi from "../../../services/api/PdmApi/PdmApi";

import { updateProject } from "../../../stores/datas/datasAction";
import { setSelectProject, setSelectDocTask, setForm, setInfo } from "../../../stores/ui/uiActions";

import { Button, ButtonGroup, ButtonToolbar, Form, Modal } from "react-bootstrap";

import { typeForm } from "../../types/typeForm";
import { typeInfo } from "../../types/typeInfo";

import { roleToString } from "../../../helpers/utils"

import "./DocumentTaskInfo.css";


const DocumentTaskInfo = ( props ) => {
    const dispatch = useDispatch();
    //const { ui } = store.getState();

    //const [validated, setValidated] = useState(false);
    // let numberTasks = 0;
    // let statusActionsTask = "";
    // let formulario = React.createRef();
    let oCommentsRef = React.createRef();
    let oParentDoc = null;
    let oParentProject = null;

    const [showCommentsModal, setShow] = useState(false);
    
    const handleCommentsModalHide = () => setShow(false);
    const handleCommentsModalShow = () => setShow(true);

    // const handleSubmit = () => {
	// 	if (formulario.current.checkValidity()) {
    //         for (var e=0; e < numberTasks; e++) {
    //             statusActionsTask = statusActionsTask + formulario.current[e].checked + ";";
    //         }
    //         statusActionsTask = statusActionsTask.slice(0, -1);
	// 		onUpdateStatusTask();
	// 	}
	// 	//setValidated(true);
    // }

      
    // const onUpdateStatusTask = async (status) => {
	// 	let pdmApi = PdmApi.getInstance();
	// 	try {
	// 		pdmApi.updateStatusTask( props.selectTask.id,{
	// 			StatusActions: statusActionsTask
	// 		}).then((result) => {
	// 			if (result.status === 200) {
	// 				dispatch(updateStatusTask(result.data));
	// 			}
	// 		});
	// 	} catch (error) {
	// 		console.log("error: " + error);
	// 	}
	// }

    const listTaskActions = () =>{
        if (( props.selectDocTask !== null) )
        {
            let listActions = [];
            listActions = props.selectDocTask.actions?.map( oCurrAction => {
                return ( <Form.Group key={"action-id" + oCurrAction.id}>
                            - { oCurrAction.actionTemplate.action }
                         </Form.Group>);
            } );

            return listActions
        }
    };

    const findProject = (projects, selectDocument) => {
        let oFoundProj = null;
        projects.forEach( oProj => {
             oProj.folders.forEach( (oFolder) => {
                if( oFolder.documents.concat(oFolder.cadDocuments).some( doc => doc.id === selectDocument.id ) ){
                    oFoundProj = oProj;
                    return;
                }
             });
             if(oFoundProj) return;
        })
        return oFoundProj;
    }

    const onCompleteTask = ( event ) => {
        const oComments = oCommentsRef.current.value;
        const oCond1 = ( oComments !== null );
        const oCond2 = ( oComments !== undefined );
        const oCond3 = ( oComments !== "" );
        
        if( oCond1 && oCond2 && oCond3 ) {

            let pdmApi = PdmApi.getInstance();
        	try {
        		pdmApi.completeDocTask( findProject(props.projects, props.selectDocument),
                                        props.selectDocument, props.selectDocTask, oComments).then((result) => {
        			if (result.status === 200) {
                        // Update applicacion data
                        let filteredData = pdmApi.filterData( [ result.data ], props.username.username, roleToString(props.rol));
                        dispatch( updateProject( filteredData[0] ));
                        dispatch( setSelectDocTask( null ) );

                        // Update selectProject (in case the project selected is the same we are updating)
                        if( props.selectProject?.id === oParentProject?.id ) {
                            dispatch( setSelectProject( result.data ) );
                        }      
                        
                        handleCommentsModalHide();
                        dispatch(setInfo(typeInfo.Nothing));
                        dispatch(setForm(typeForm.Nothing));
        			}
        		});
        	} catch (error) {
        		console.log("error: " + error);
        	}
        }
    }

	return (
		props.selectDocTask?
        <>
			<h1>DocumentTaskInfo</h1>
			<hr />
			<span><strong>Task number:</strong> { props.selectDocTask?.template.taskNumber}</span><br />
			<span><strong>Task name:</strong> { props.selectDocTask?.template.taskName}</span><br />
			<span><strong>Document:</strong> { props.selectDocument?.name } </span><br />
            <span><strong>Actions:</strong></span><br />
            <div>
				<Form style={{maxWidth:'400px'}}>
                    { listTaskActions() }
					<ButtonToolbar className="justify-content-between">
                        <ButtonGroup aria-label="First group">
                            <Button variant="outline-primary" onClick={() => {
                                handleCommentsModalShow();
                            }} >Completed</Button>
                            <Button variant="outline-primary" onClick={() => {
                                
                            }} >Cancel</Button>
                        </ButtonGroup>
					</ButtonToolbar>
				</Form>
			</div>

            <Modal show={showCommentsModal} backdrop="static" onHide={handleCommentsModalHide}>
                <Modal.Header closeButton>
                <Modal.Title>Task Completion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Information comments</Form.Label>
                    <Form.Control as="textarea" className="textarea-noresize" rows={8} ref={ oCommentsRef } />
                </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleCommentsModalHide}>
                    Close
                </Button>
                <Button variant="primary" onClick={(event) => onCompleteTask( event )}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
		</>
        :null
        
    
        
        
	);
};

const mapStateToProps = (state) => { 
    return { 
        selectDocument: state.ui.selectDocument,
        selectDocTask:  state.ui.selectDocTask,
        projects:   state.datas.projects,

        username: state.loginReducer.loggedUser,
        rol : state.loginReducer.rol
    }; 
};

export default connect(mapStateToProps)(DocumentTaskInfo);