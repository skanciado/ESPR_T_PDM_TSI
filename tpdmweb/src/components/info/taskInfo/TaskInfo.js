import React, { useState }  from "react";
import { useDispatch } from "react-redux";

import { connect } from "react-redux";
import PdmApi from "../../../services/api/PdmApi/PdmApi";

import { updateProject } from "../../../stores/datas/datasAction";
import { setSelectProject, setSelectTask, setForm, setInfo } from "../../../stores/ui/uiActions";

import { Button, ButtonGroup, ButtonToolbar, Form, Modal } from "react-bootstrap";

import { typeForm } from "../../types/typeForm";
import { typeInfo } from "../../types/typeInfo";

import { roleToString } from "../../../helpers/utils"

import {WarningMsg} from "../../WarningMsg/WarningMsg"

import "./TaskInfo.css";


const TaskInfo = ( props ) => {
    const dispatch = useDispatch();
    //const { ui } = store.getState();

    //const [validated, setValidated] = useState(false);
    // let numberTasks = 0;
    // let statusActionsTask = "";
    // let formulario = React.createRef();
    let oCommentsRef = React.createRef();
    let oParentProject = null;
    let lastTask = null;

    const [showCommentsModal, setShow] = useState(false);
    const [showWarningMsg, setWarningMsgShow] = useState(false);
    const [warningMsgText, setWarningMsgText] = useState("Test1");
    
    const handleCommentsModalHide = () => setShow(false);
    const handleCommentsModalShow = () =>{ 
        let ruleCompleted = true;
        let failingMessage = "";
        props.selectTask.template.completeConditions.forEach( oRule => {
            if( oRule.input?.name ){
                oParentProject.folders.forEach( oFolder => {
                    oFolder.documents.concat(oFolder.cadDocuments).forEach( oDoc =>{
                        if( oDoc.type?.name === oRule.input?.name && 
                            oDoc.status?.name !== oRule.status?.name ){
                                ruleCompleted = false;
                                failingMessage = "Error: " + oDoc.type.name + " document is not in '" + oRule.status.name + "'status";
                                return;
                        }
                    });
                    if( !ruleCompleted)return;
                });
                if( !ruleCompleted)return;
            }
            if( !ruleCompleted)return;
        });
        if( ruleCompleted){
            setShow(true);
        }else{
            setWarningMsgText(failingMessage);
            setWarningMsgShow(true);
        }
    }

    const handleWarningMsgHide = () => setWarningMsgShow(false);
    const handleWarningMsgShow = () => setWarningMsgShow(true);

    
    

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
    const isLastTask = (oProject) => {
        if (oProject?.name )
        {
            let counterNotCompleted = 0;
            oProject?.workflow?.tasks.map( oTask => {
                if (oTask.actions[0].status != true)
                {
                    counterNotCompleted += 1;
                }
            })
            if (counterNotCompleted == 1)
            {
                return 'true';
            }
        }
        return 'false';
    }

    const getParentProject = ( ) => {
        oParentProject = props.projects.find( oCurrProj => ( oCurrProj.workflow !== null ) && 
                                                                 ( oCurrProj.workflow !== undefined ) && 
                                                                 ( oCurrProj.workflow?.task !== null ) &&
                                                                 ( oCurrProj.workflow?.task !== undefined ) &&
                                                                 ( oCurrProj.workflow?.task?.id === props.selectTask?.id )
         );
        lastTask = isLastTask(oParentProject);
        return ( ( oParentProject !== null ) && ( oParentProject !== undefined ) ) ? oParentProject.name:"Unknown Project";
    } 

    const listTaskActions = () =>{
        if (( props.selectTask !== null) /*&& (ui.selectTask.Action !== null)*/)
        {
            /*if (statusActionsTask !== null)
            {
                const arrayAcciones = (ui.selectTask.actions.split(/\n/g);
                const arrayStatus = ui.selectTask.StatusActions.split(";");
                let listActions = [];
                numberTasks = arrayStatus.length;
                for (var i=0; i < arrayStatus.length; i++) {
                    let ctrlCheck = (i) => {
                        if (arrayStatus[i] === "true"){
                            return <Form.Check type="checkbox" label={arrayAcciones[i]} defaultChecked />;
                        }else{
                            return <Form.Check type="checkbox" label={arrayAcciones[i]} />;
                        };
                    };
                    listActions.push(
                                    <Form.Group controlId={'formTaskStatus' + i}>
                                        {ctrlCheck(i)}
                                    </Form.Group>
                                    );
                 }
                 return listActions;
            }*/
            let listActions = [];
            listActions = props.selectTask.actions?.map( oCurrAction => {
                return ( <Form.Group key={"action-id" + oCurrAction.id}>
                            - { oCurrAction.actionTemplate.action }
                         </Form.Group>);
            } );

            return listActions
        }
    };

    const onCompleteTask = ( event ) => {
        const oComments = oCommentsRef.current.value;
        const oCond1 = ( oComments !== null );
        const oCond2 = ( oComments !== undefined );
        const oCond3 = ( oComments !== "" );
        
        if( oCond1 && oCond2 && oCond3 ) {

            let pdmApi = PdmApi.getInstance();
        	try {
        		pdmApi.completeTask( oParentProject, props.selectTask, oComments).then((result) => {
        			if (result.status === 200) {
                        // Update applicacion data
                        let filteredData = pdmApi.filterData( [ result.data ], props.username.username, roleToString(props.rol));
                        dispatch( updateProject( filteredData[0] ));
                        dispatch( setSelectTask( null ) );

                        // Update selectProject (in case the project selected is the same we are updating)
                        if( props.selectProject?.id === oParentProject.id ) {
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
		props.selectTask ? 
        <>
			<h1>TaskInfo</h1>
			<hr />
			<span><strong>Task number:</strong> { props.selectTask?.template.taskNumber}</span><br />
			<span><strong>Task name:</strong> { props.selectTask?.template.taskName}</span><br />
			<span><strong>Project:</strong> { getParentProject() } </span><br />
            <span><strong>Last Task:</strong> { lastTask } </span><br />
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
                <Form.Label>{oParentProject?.workflow?.comments}</Form.Label>
                <hr />
			    <br />
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
            <WarningMsg show={ showWarningMsg } proceedFunction={handleWarningMsgHide} 
                            closeFunction={handleWarningMsgHide} titleText="Error"
                            bodyText={warningMsgText} closeText="" okText="OK" />
		</>
        : null

	);
};

const mapStateToProps = (state) => { 
    return { 
        selectProject: state.ui.selectProject,
        selectTask:    state.ui.selectTask,

        projects:   state.datas.projects,

        username: state.loginReducer.loggedUser,
        rol : state.loginReducer.rol
    }; 
};

export default connect(mapStateToProps)(TaskInfo);