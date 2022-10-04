import React, { useState }  from "react";
import { useDispatch } from "react-redux";

import { connect } from "react-redux";
import { Button, Form, ListGroup, Modal, Row, Col } from "react-bootstrap";
import PdmApi from "../../../services/api/PdmApi/PdmApi";
import { updateStatusProject } from "../../../stores/datas/datasAction";
import { setShowUserModal, setShowLifecycleModal } from "../../../stores/ui/uiActions";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Suspense } from 'react';
import { isRolManager } from '../../../helpers/utils'
import ModalTeamSelector from '../../ModalTeamSelector/ModalTeamSelector'
import ModalLifecycleViewer from '../../ModalLifecycleViewer/ModalLifecycleViewer'

import "./ProjectInfo.css";

const ProjectInfo = ( props ) => {
    const dispatch = useDispatch();
    let visibleModal = false;

    let teamTeam = React.createRef();
    let formulario = React.createRef();


    if( isRolManager( props.rol) ){
        visibleModal = true;
    }
    
    let projectInfoStatus = props.selectProject?.status?.name;

    
	//const onUpdateStatusProject = async (status) => {
	//	let pdmApi = PdmApi.getInstance();
	//	try {
    //        if (projectInfoStatus === "Closed")
    //        {
    //            pdmApi.updateStatusProject( props.selectProject.id,{
    //                Status: projectInfoStatus,
    //                FinishDate: new Date()
    //            }).then((result) => {
    //                if (result.status === 200) {
    //                    dispatch(updateStatusProject(result.data));
    //                }
    //            });
    //        }else{
    //            pdmApi.updateStatusProject( props.selectProject.id,{
    //                Status: projectInfoStatus
    //            }).then((result) => {
    //                if (result.status === 200) {
    //                    dispatch(updateStatusProject(result.data));
    //                }
    //            });
    //        }
	//	} catch (error) {
	//		console.log("error: " + error);
	//	}
	//}


    // const [show, setShow] = useState(false);      
    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(visibleModal);
    // function GetStatus() {
    //     return (
    //       <>
    //         <Button variant="outline-primary" style={{ marginLeft: '5px' }} onClick={handleShow}>Change</Button>  
    //         <Modal show={show} onHide={handleClose}>
    //           <Modal.Header closeButton>
    //             <Button variant="secondary" style={{ marginRight: '5px' }} onClick={() =>{
    //                     if (projectInfoStatus === "Initiated"){
    //                         projectInfoStatus = "Initiated";
    //                     };
    //                     if (projectInfoStatus === "Planning"){
    //                         projectInfoStatus = "Initiated";
    //                     };
    //                     if (projectInfoStatus === "Executing"){
    //                         projectInfoStatus = "Planning";
    //                     };
    //                     if (projectInfoStatus === "Closed"){
    //                         projectInfoStatus = "Executing";
    //                     };
    //                     onUpdateStatusProject();
    //                     handleClose();
    //                 }}>
    //               Demote
    //             </Button>
    //             <Button variant="secondary" onClick={() =>{
    //                     if (projectInfoStatus === "Closed"){
    //                         projectInfoStatus = "Closed";
    //                     };
    //                     if (projectInfoStatus === "Executing"){
    //                         projectInfoStatus = "Closed";
    //                     };
    //                     if (projectInfoStatus === "Planning"){
    //                         projectInfoStatus = "Executing";
    //                     };
    //                     if (projectInfoStatus === "Initiated"){
    //                         projectInfoStatus = "Planning";
    //                     };
    //                     onUpdateStatusProject();
    //                     handleClose();
    //                 }}>
    //               Promote
    //             </Button>
    //           </Modal.Header>
    //           <Modal.Body>
    //             <ListGroup defaultActiveKey={'#' + projectInfoStatus} horizontal>
    //                 <ListGroup.Item action href="#Initiated" onClick={() =>{
    //                     (projectInfoStatus = "Initiated");
    //                     onUpdateStatusProject();
    //                     handleClose();
    //                 }}>Initiated</ListGroup.Item>
    //                 <i className="mdi mdi-arrow-right-bold align-self-center"></i>
    //                 <ListGroup.Item action href="#Planning" onClick={() =>{
    //                     (projectInfoStatus = "Planning");
    //                     onUpdateStatusProject();
    //                     handleClose();
    //                 }}>Planning</ListGroup.Item>
    //                 <i className="mdi mdi-arrow-right-bold align-self-center"></i>
    //                 <ListGroup.Item action href="#Executing" onClick={() =>{
    //                     (projectInfoStatus = "Executing");
    //                     onUpdateStatusProject();
    //                     handleClose();
    //                 }}>Executing</ListGroup.Item>
    //                 <i className="mdi mdi-arrow-right-bold align-self-center"></i>
    //                 <ListGroup.Item action href="#Closed" onClick={() =>{
    //                     (projectInfoStatus = "Closed");
    //                     onUpdateStatusProject();
    //                     handleClose();
    //                 }}>Closed</ListGroup.Item>
    //             </ListGroup>
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


    const buildTeamList = () => {
        if( ( props.selectProject !== null )  && ( props.selectProject !== undefined ) ) {
            return (
                <ListGroup>
                    { props.selectProject?.team?.map( oCurrUser => {
                        return ( <ListGroup.Item key={"team-user-" + oCurrUser.username} className="py-1">
                                    <i className="pr-2 mdi mdi-account" />
                                    { oCurrUser.username }
                                 </ListGroup.Item> );
                    }) }
                </ListGroup>                
            )
        } else {
            return ( 
                <ListGroup>
                    <ListGroup.Item className="py-1" disabled>
                        <i className="pr-2 mdi mdi-account-alert-outline" />
                        None
                    </ListGroup.Item>
                </ListGroup> 
            );
        }
    }


    function showModalDialog() {
        dispatch( setShowUserModal( true ));
    }

    function showLifecycleModalDialog() {
        dispatch( setShowLifecycleModal( true ));
    }

    function mountModalTeamSelector() {
        if( props.showUserModal ) {
            return (<ModalTeamSelector />);
        } else {
            return null;
        }        
    }

    function mountModalLifecycleViewer() {
        if( props.showLifecycleModal ) {
            return ( <div className="clearfix" style={{ minheight: '350px' }}  >
                        <ModalLifecycleViewer dataSource={props.selectProject} sourceType="Project"  />
                     </div> );
        } else {
            return null;
        }        
    }
    

	return (
		<>
			<h1>ProjectInfo</h1>
			<hr />
            <Tabs defaultActiveKey="general" transition={false} id="noanim-tab-example">
                <Tab eventKey="general" title="General">

                <div className="container-fluid py-3 px-3">
                    <div className="row flex-grow-1">
                        <div className="col mb-3">
                            <Form.Group className="my-0" as={Row} controlId="idControl">
                                <Form.Label key="idProjectID" className="my-0 form-label-ellipsis font-weight-bold" column sm={3}>
                                    ProjectID:
                                </Form.Label>
                                <Col sm={8}>
                                    <Form.Label key="idProjectIDVal" column sm={8}>
                                        {props.selectProject?.projectId}
                                    </Form.Label>
                                </Col>
                            </Form.Group>
                            <Form.Group className="my-0" as={Row} controlId="idControl">
                                <Form.Label key="idName" className="my-0 font-weight-bold form-label-ellipsis" column sm={3}>
                                    Name:
                                </Form.Label>
                                <Col sm={8}>
                                    <Form.Label key="idNameVal" className="my-0 form-label-ellipsis" column sm={9}>
                                        {props.selectProject?.name}
                                    </Form.Label>
                                </Col>
                            </Form.Group>
                            <Form.Group className="my-0 align-middle" as={Row} controlId="idControl" >
                                <Form.Label key="idStatus" className="font-weight-bold form-label-ellipsis align-middle my-auto" column sm={3}>
                                    Status:
                                </Form.Label>
                                <Col sm={8}>
                                    <Form.Label className="align-middle" key="idStatusVal" column sm={8}>
                                        {projectInfoStatus}
                                        <Button className="no-outline-button align-middle" variant="link" size="sm" onClick={( event ) =>  showLifecycleModalDialog(event)}>
                                            <i className="mdi-24px mdi mdi-state-machine" />
                                        </Button>
                                        { mountModalLifecycleViewer() }
                                    </Form.Label>                                    
                                </Col>
                            </Form.Group>
                            <Form.Group className="mb-0" as={Row} controlId="idControl">
                                <Form.Label key="idStartDate" className="font-weight-bold form-label-ellipsis" column sm={3}>
                                    Start Date:
                                </Form.Label>
                                <Col sm={8}>
                                    <Form.Label key="idStartDateVal" column sm={8}>
                                        {props.selectProject?.startDate}
                                    </Form.Label>
                                </Col>
                            </Form.Group>
                            <Form.Group className="mb-0" as={Row} controlId="idControl">
                                <Form.Label key="idFinishDate:" className="font-weight-bold form-label-ellipsis" column sm={3}>
                                    Finish Date:
                                </Form.Label>
                                <Col sm={8}>
                                    <Form.Label key="idFinishDateVal" column sm={8}>
                                        {props.selectProject?.finishDate}
                                    </Form.Label>
                                </Col>
                            </Form.Group>
                        </div>	                           
                    </div>  
                </div>

                


                    {/* <br />
                    <span><strong>ProjectID:</strong>  {props.selectProject?.projectId}</span><br />
                    <span><strong>Name:</strong>  {props.selectProject?.name}</span><br />
                    <span><strong>Status:</strong>  {projectInfoStatus}</span>
                    { <GetStatus /><br /> }
                    <Button className="no-outline-button" variant="link" size="sm" onClick={( event ) =>  showModalDialog(event)}>
                        <i className="mdi-24px mdi mdi-state-machine" />
                    </Button>
                    <span><strong>Start Date:</strong>  {props.selectProject?.startDate}</span><br />
                    <span><strong>Finish Date:</strong>  {props.selectProject?.finishDate}</span><br /> */}
                </Tab>
                <Tab eventKey="team" title="Team">
                    <br />
                    <span><strong>Project Leader:</strong>  {props.selectProject?.projectLeader?.username}</span><br />
                    <div>
                        <Form style={{maxWidth:'400px'}} noValidate ref={formulario}>
                            <Form.Group controlId="formTeamTeam">
                                <Form.Label style={{fontWeight: 'bold'}}>Project Users</Form.Label>                                
                                    <Button className="no-outline-button ml-2" variant="link" size="sm" onClick={( event ) =>  showModalDialog(event)}>
                                        <i className="mdi-24px mdi mdi-account-multiple-plus" />
                                    </Button>
                                    <Button className="no-outline-button" variant="link" size="sm" >
                                        <i className="mdi-24px mdi mdi-account-multiple-minus" />
                                    </Button>                                
                                <ListGroup placeholder="Project Users" required ref={teamTeam}>
                                    <Suspense fallback={<div>Loading...</div>}>
                                        { buildTeamList() }
                                    </Suspense>
                                </ListGroup>
                                {mountModalTeamSelector()}                                
                            </Form.Group>                            
                        </Form>
                    </div> 
                </Tab>
            </Tabs>
		</>
	);
};

const mapStateToProps = (state) => { 
    return { 
        loggedUser:     state.loginReducer.loggedUser,
        rol:            state.loginReducer.rol,     
        selectProject:  state.ui.selectProject,
        showUserModal: state.ui.showUserModal,
        showLifecycleModal: state.ui.showLifecycleModal
    }; 
};

export default connect(mapStateToProps)(ProjectInfo);