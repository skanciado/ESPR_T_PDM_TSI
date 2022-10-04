import React, { useState, useEffect }  from "react";
import { connect, useDispatch } from "react-redux";
//import { store } from "../../../stores/store";
import { Button, ButtonGroup, ButtonToolbar, ListGroup, Form, Modal, Col, Row, InputGroup } from "react-bootstrap";
import PdmApi from "../../../services/api/PdmApi/PdmApi";
import { updateDocument, createDocumentRevision, createCADDocumentRevision, saveShowDescription } from "../../../stores/datas/datasAction";
import { updateSelectDocumentDescription } from "../../../stores/ui/uiActions";
import { setSelectDocument, setSelectDocumentNeedsSave, setShowLifecycleModal } from "../../../stores/ui/uiActions";
import { saveAs } from 'file-saver';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import ModalLifecycleViewer from '../../ModalLifecycleViewer/ModalLifecycleViewer';

import {WarningMsg} from "../../WarningMsg/WarningMsg";
import {getFolderForDocAndProj, roleToString} from "../../../helpers/utils";


const DocumentInfo = (props) => { 
    const dispatch = useDispatch();
    //const { ui } = store.getState();

    const [showReviewMsg, setReviewMsgShow] = useState(false);
    const handleReviewMsgHide = () => setReviewMsgShow(false);
    const handleReviewMsgShow = () => setReviewMsgShow(true);

    const [showErrorMsg, setErrorMsgShow] = useState(false);
    const handleErrorMsgHide = () => setErrorMsgShow(false);
    const handleErrorMsgShow = () => setErrorMsgShow(true);

    /*const [showDescription, setDescriptionShow] = useState(false);
    const handleDescriptionMsgHide = () => setDescriptionShow(false);
    const handleDescriptionMsgShow = () => setDescriptionShow(true);*/

    let documentInfoStatus = props.selectDocument?.status.name;
    let documentInfoType   = props.selectDocument?.type.name;
    
  
    let documentDescription = React.createRef();

    const handleSubmit = () => {
		onUpdateDocument();
    };

    const onUpdateRevision = (oDoc) => {
        let pdmApi = PdmApi.getInstance();
		try {
            let oFolder = null;
            let ary = props.selectDocument;
            console.log("ARY:"+ ary.id);
            if( oDoc.application){
                oFolder = props.selectProjectOpen.folders.find( oDir =>  oDir.cadDocuments.some( oDocFolder => oDocFolder.id === oDoc.id));
            }else{
                oFolder = props.selectProjectOpen.folders.find( oDir => oDir.documents.some( oDocFolder => oDocFolder.id === oDoc.id));
            }

            // TODO: Define new endpoint CreateDocumentRevision?
			pdmApi.createDocumentRevision(oDoc, oFolder.id).then((result) => {
                if (result.status === 200) {
                    //TODO: Update locked and userLocked
                    dispatch(setSelectDocument(result.data));
                    if( oDoc.application ){
                        dispatch(createCADDocumentRevision(result.data, oDoc, props.selectProjectOpen,oFolder));
                    }else{
                        dispatch(createDocumentRevision(result.data, oDoc, props.selectProjectOpen, oFolder));
                    }
                    
                }
            });
		} catch (error) {
			console.log("error: " + error);
		}

        // {
        //     Name: props.selectDocument.name,
        //     DocumentID: Date.now().toString(),
        //     Type: props.selectDocument.type.name,
        //     Application: props.selectDocument.application,
        //     Status: 'In Work',
        //     //ProjectsNames: props.selectDocument.ProjectsNames,
        //     File: props.selectDocument.files[0].name,
        //     //FolderID:  props.selectProjectOpen.FolderID,
        //     //Lock:  props.selectDocument.locked,
        //     Revision:  String.fromCharCode(props.selectDocument.revision.charCodeAt(0) + 1),
        //     Description: props.selectDocument.description
        // }

        setReviewMsgShow(false);
	}

	const onUpdateDocument = async (status) => {
		let pdmApi = PdmApi.getInstance();
		try {
			pdmApi.updateDocumentDescription(props.selectDocument, documentDescription.current.value).then((result) => {
				if (result.status === 200) {
                    let oFolder = getFolderForDocAndProj(props.selectProjectOpen, result.data );
					dispatch(updateDocument(result.data, props.selectProjectOpen,oFolder));
                    dispatch(setSelectDocument(result.data));
                    dispatch( setSelectDocumentNeedsSave( false ) ); 
				}
			});
		} catch (error) {
			console.log("error: " + error);
		}
	}

    const [showStatus, setShowStatus] = useState(false);      
    const handleCloseStatus = () => setShowStatus(false);
    const handleShowStatus = () => setShowStatus(true);
    function GetStatus() {
        return (
          <>
            <Button variant="outline-primary" style={{ marginLeft: '5px' }} onClick={handleShowStatus}>Change</Button>  
            <Modal show={showStatus} onHide={handleCloseStatus}>
              <Modal.Header closeButton>
              <Button variant="secondary" style={{ marginRight: '5px' }} onClick={() =>{
                        if (documentInfoStatus === "InWork"){
                            documentInfoStatus = "InWork";
                        };
                        if (documentInfoStatus === "Preliminary"){
                            documentInfoStatus = "InWork";
                        };
                        if (documentInfoStatus === "Released"){
                            documentInfoStatus = "Preliminary";
                        };
                        if (documentInfoStatus === "Obsolete"){
                            documentInfoStatus = "Released";
                        };
                        onUpdateDocument();
                        handleCloseStatus();
                    }}>
                  Demote
                </Button>
                <Button variant="secondary" onClick={() =>{
                        if (documentInfoStatus === "Obsolete"){
                            documentInfoStatus = "Obsolete";
                        };
                        if (documentInfoStatus === "Released"){
                            documentInfoStatus = "Obsolete";
                        };
                        if (documentInfoStatus === "Preliminary"){
                            documentInfoStatus = "Released";
                        };
                        if (documentInfoStatus === "InWork"){
                            documentInfoStatus = "Preliminary";
                        };
                        onUpdateDocument();
                        handleCloseStatus();
                    }}>
                  Promote
                </Button>
              </Modal.Header>
              <Modal.Body>
                <ListGroup defaultActiveKey={'#' + documentInfoStatus} horizontal>
                    <ListGroup.Item action href="#InWork" onClick={() =>{
                        (documentInfoStatus = "InWork");
                        onUpdateDocument();
                        handleCloseStatus();
                    }}>InWork</ListGroup.Item>
                    <i className="mdi mdi-arrow-right-bold align-self-center"></i>
                    <ListGroup.Item action href="#Preliminary" onClick={() =>{
                        (documentInfoStatus = "Preliminary");
                        onUpdateDocument();
                        handleCloseStatus();
                    }}>Preliminary</ListGroup.Item>
                    <i className="mdi mdi-arrow-right-bold align-self-center"></i>
                    <ListGroup.Item action href="#Released" onClick={() =>{
                        (documentInfoStatus = "Released");
                        onUpdateDocument();
                        handleCloseStatus();
                    }}>Released</ListGroup.Item>
                    <i className="mdi mdi-arrow-right-bold align-self-center"></i>
                    <ListGroup.Item action href="#Obsolete" onClick={() =>{
                        (documentInfoStatus = "Obsolete");
                        onUpdateDocument();
                        handleCloseStatus();
                    }}>Obsolete</ListGroup.Item>
                </ListGroup>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseStatus}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        );
    };
    const saveFile = () => {
        let pdmApi = PdmApi.getInstance();
		if(props.selectDocument?.files?.length >0 && props.selectDocument?.files[0]?.content){
            pdmApi.getContent(props.selectDocument?.files[0]?.content[0]?.id).then( oContent => {
                if(typeof oContent === "string" ){
                    saveAs(
                        oContent,
                        props.selectDocument?.files[0].name
                    );
                }
            })
        }
        setShowDownload(false);
    };
    const [showDownload, setShowDownload] = useState(false);
    const handleCloseDownload = () => setShowDownload(false);
    const handleShowDownload = () => setShowDownload(true);
    function DownloadFile() {
        return (
          <>
            <Button variant="outline-primary" onClick={handleShowDownload}>Download</Button>  
            <Modal show={showDownload} onHide={handleCloseDownload}>
              <Modal.Header closeButton>
                <Modal.Title>Download file: {props.selectDocument?.File}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              Download attached to local folder?
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={saveFile}>
                  Download
                </Button>
                <Button variant="secondary" onClick={handleCloseDownload}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        );
    }


    function changeDescription( event ) {         
        dispatch( updateSelectDocumentDescription( props.selectDocument, event.target.value )); 

        if( props.originalDocumentDescription === event.target.value ) {
            dispatch( setSelectDocumentNeedsSave( false ) ); 
        } else {
            dispatch( setSelectDocumentNeedsSave( true ) ); 
        }           
        
    }


    function showLifecycleModalDialog() {
        dispatch( setShowLifecycleModal( true ));
    }

    function mountModalLifecycleViewer() {
        if( props.showLifecycleModal ) {
            return ( <div className="clearfix" style={{ minheight: '350px' }}  >
                        <ModalLifecycleViewer dataSource={props.selectDocument} sourceType="Document"  />
                     </div> );
        } else {
            return null;
        }        
    }

    function userCanEdit(){
        return props.selectDocument?.rights?.modify.some( oRole => oRole.name === roleToString(props.oRole)) ||
            ((props.selectDocument?.rights === null || props.selectDocument?.rights.modify.length===0) && 
            (props.selectProjectOpen?.team.some( oUser => oUser.username === props.oUser.username) || 
            props.selectProjectOpen?.projectLeader.username === props.oUser.username));
    }

    function getReviseSensitivity(){
        return documentInfoStatus === 'Released' && userCanEdit();
    }

    function getEditSensitivity(){
        return getLock() && userCanEdit();
    }


    function getLock(){
        return props.selectDocument?.locked
    }

    function onEditDocument(){
        if( props.selectDocument?.userLock !== null && props.selectDocument?.userLock?.username !== props.oUser.username){
            handleErrorMsgShow();
        }else{
            onShowDescription();
        }
    }

    function updateDocumentLock(){
        if( props.selectDocument?.userLock !== null && props.selectDocument?.userLock?.username !== props.oUser.username){
            handleErrorMsgShow();
        }else{
            let pdmApi = PdmApi.getInstance();
            pdmApi.updateDocumentLock(props.selectDocument,!props.selectDocument.locked,props.selectDocument.locked?"":props.oUser.username).
            then((result) => {
                if (result.status === 200) {
                    let oFolder = getFolderForDocAndProj(props.selectProjectOpen, result.data );
                    
                    dispatch(updateDocument(result.data, props.selectProjectOpen ,oFolder));
                    dispatch(setSelectDocument(result.data));
                }
            });
        }
    }
    
    function onShowDescription(){
        documentDescription.current.value = props.originalDocumentDescription;
        dispatch(saveShowDescription(true));
    }

    function getDescriptionVisibility(){
        let val = props.showDescription;
        
        dispatch(setSelectDocument(props.selectDocument));
        return( val );
    }
    function getDescriptionEdition(){
        let val = props.selectDocument?.locked && props.selectDocument?.userLock.id === props.oUser.id && getDescriptionVisibility();
        return val;
    }

	return (
		props.selectDocument ? <>
			<h1>Document Info</h1>
			<hr />
            <Tabs defaultActiveKey="general" transition={false} id="noanim-tab-example">
                <Tab eventKey="general" title="General">
                    <div className="container-fluid py-3 px-3">
                        <div className="row flex-grow-1">
                            <div className="col mb-3">
                                <Form.Group className="my-0" as={Row} controlId="idControl">
                                    <Form.Label key="idProjectID" className="my-0 form-label-ellipsis font-weight-bold" column sm={3}>
                                        DocumentID:
                                    </Form.Label>
                                    <Col sm={8}>
                                        <Form.Label key="idProjectIDVal" column sm={8}>
                                            {props.selectDocument?.documentId}
                                        </Form.Label>
                                    </Col>
                                </Form.Group>
                                <Form.Group className="my-0" as={Row} controlId="idControl">
                                    <Form.Label key="idName" className="my-0 font-weight-bold form-label-ellipsis" column sm={3}>
                                        Name:
                                    </Form.Label>
                                    <Col sm={8}>
                                        <Form.Label key="idNameVal" className="my-0 form-label-ellipsis" column sm={9}>
                                            {props.selectDocument?.name}
                                        </Form.Label>
                                    </Col>
                                </Form.Group>
                                <Form.Group className="my-0 align-middle" as={Row} controlId="idControl" >
                                    <Form.Label key="idStatus" className="font-weight-bold form-label-ellipsis align-middle my-auto" column sm={3}>
                                        Status:
                                    </Form.Label>
                                    <Col sm={8}>
                                        <Form.Label className="align-middle" key="idStatusVal" column sm={8}>
                                            {documentInfoStatus}
                                            <Button className="no-outline-button align-middle" variant="link" size="sm" onClick={( event ) =>  showLifecycleModalDialog(event)}>
                                                <i className="mdi-24px mdi mdi-state-machine" />
                                            </Button>
                                            { mountModalLifecycleViewer() }
                                        </Form.Label>                                    
                                    </Col>
                                </Form.Group>
                                <Form.Group className="mb-0" as={Row} controlId="idControl">
                                    <Form.Label key="idType" className="font-weight-bold form-label-ellipsis" column sm={3}>
                                        Type:
                                    </Form.Label>
                                    <Col sm={8}>
                                        <Form.Label key="idTypeVal" column sm={8}>
                                            {documentInfoType}
                                        </Form.Label>
                                    </Col>
                                </Form.Group>
                                <Form.Group className="mb-0 align-middle" as={Row} controlId="idControl">
                                    <Form.Label key="idFinishDate:" className="font-weight-bold form-label-ellipsis align-middle my-auto" column sm={3}>
                                        Revision:
                                    </Form.Label>
                                    <Col sm={8}>
                                        <Form.Label className="align-middle" key="idFinishDateVal" column sm={8}>
                                            {props.selectDocument?.revision}
                                            <Button className="no-outline-button align-middle" disabled={!getReviseSensitivity()} variant="link" size="sm" onClick={ () =>{ handleReviewMsgShow() }}>
                                                <i className="mdi-24px mdi mdi-file-export-outline" />
                                            </Button>
                                        </Form.Label>
                                    </Col>
                                </Form.Group>
                            </div>	                           
                        </div>
                        <Button variant="link" onClick={ () => { onShowDescription()}}>More</Button>
                        <Button variant="link" disabled={!getEditSensitivity()} onClick={ () => { onEditDocument()}}>Edit</Button>
                        <Button variant="link" disabled={!getReviseSensitivity()} onClick={ () => {handleReviewMsgShow()}}>Revise</Button>
                        <Button variant="link" disabled={!userCanEdit()} onClick={ () => { updateDocumentLock()}}> {getLock() ? "UnLock":"Lock" }</Button>
                    </div>
                    <br />
                </Tab>
                <Tab eventKey="attaches" title="Attaches">
                    <br />
                    <span><strong>File:</strong> {props.selectDocument?.files[0].name}</span><br />
                    <DownloadFile />
                    <Button variant="outline-primary" style={{ marginLeft: '5px' , marginRight: '5px' }}>
                        Replace
                    </Button>
                    <Button variant="outline-primary" style={{ marginRight: '5px' }}>
                        Delete Document
                    </Button> 
                </Tab>
                <Tab eventKey="permissions" title="Permissions">
                    <br />
                    <span><strong>Permissions Users:</strong> {/*props.selectDocument?.Permissions*/}</span><br />
                    <div className="container-fluid py-3 px-3">
                    <div className="row flex-grow-1">
                        <div className="col mb-3">
                            <Form.Group className="my-0" as={Row} controlId="idControl">
                                <Form.Label key="idWriteAccessMembers" className="my-0 form-label-ellipsis font-weight-bold" column sm={1}>
                                    <svg width="24px" height="24px" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M2 17V20H10V18.11H3.9V17C3.9 16.36 7.03 14.9 10 14.9C10.96 14.91 11.91 15.04 12.83 15.28L14.35 13.76C12.95 13.29 11.5 13.03 10 13C7.33 13 2 14.33 2 17M10 4C7.79 4 6 5.79 6 8S7.79 12 10 12 14 10.21 14 8 12.21 4 10 4M10 10C8.9 10 8 9.11 8 8S8.9 6 10 6 12 6.9 12 8 11.11 10 10 10M21.7 13.35L20.7 14.35L18.65 12.35L19.65 11.35C19.86 11.14 20.21 11.14 20.42 11.35L21.7 12.63C21.91 12.84 21.91 13.19 21.7 13.4M12 18.94L18.06 12.88L20.11 14.88L14.11 20.95H12V18.94" />
                                    </svg>
                                </Form.Label>
                                <Col sm={8}>
                                    <Form.Label key="idWriteAccessMembersVal" column sm={10}>
                                        {props.selectDocument?.rights?.modify?.length ? props.selectDocument?.rights?.modify[0].name:"Project"} Members
                                    </Form.Label>
                                </Col>
                            </Form.Group>
                            <Form.Group className="my-0" as={Row} controlId="idControl">
                                <Form.Label key="idRedAccessMembers" className="my-0 font-weight-bold form-label-ellipsis" column sm={1}>
                                    
                                    <svg width="24px" height="24px" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M10 12C12.21 12 14 10.21 14 8S12.21 4 10 4 6 5.79 6 8 7.79 12 10 12M10 6C11.11 6 12 6.9 12 8S11.11 10 10 10 8 9.11 8 8 8.9 6 10 6M9.27 20H2V17C2 14.33 7.33 13 10 13C11.04 13 12.5 13.21 13.86 13.61C13 13.95 12.2 14.42 11.5 15C11 14.94 10.5 14.9 10 14.9C7.03 14.9 3.9 16.36 3.9 17V18.1H9.22C9.2 18.15 9.17 18.2 9.14 18.25L8.85 19L9.14 19.75C9.18 19.83 9.23 19.91 9.27 20M17 18C17.56 18 18 18.44 18 19S17.56 20 17 20 16 19.56 16 19 16.44 18 17 18M17 15C14.27 15 11.94 16.66 11 19C11.94 21.34 14.27 23 17 23S22.06 21.34 23 19C22.06 16.66 19.73 15 17 15M17 21.5C15.62 21.5 14.5 20.38 14.5 19S15.62 16.5 17 16.5 19.5 17.62 19.5 19 18.38 21.5 17 21.5Z" />
                                    </svg>
                                </Form.Label>
                                <Col sm={8}>
                                    <Form.Label key="idRedAccessMembersVal" className="my-0 form-label-ellipsis" column sm={10}>
                                        {props.selectDocument?.rights?.view?.length ? props.selectDocument?.rights?.view[0].name:"Project"} Members
                                    </Form.Label>
                                </Col>
                            </Form.Group>
                        </div>	                           
                    </div>  
                </div>

                </Tab>
                <Tab eventKey="revisions" title="Revisions">
                    <br />
                    <span><strong>Revisions:</strong> </span><br />
                </Tab>
            </Tabs>
            <hr/>
            <div style={{display:getDescriptionVisibility()?'block':'none'}}>
                <Form.Group className="my-0 " as={Row} controlId="idControl" >
                    <Form.Label key="idStatus" className="font-weight-bold form-label-ellipsis " column sm={3}>
                        Description:
                    </Form.Label>
                    <Col sm={8}>
                    <InputGroup className="pl-2" >
                        <Form.Control size="sm" type="text" readOnly={!getDescriptionEdition()}  
                                    placeholder="" onChange={(event) => changeDescription( event )}
                                    ref={documentDescription} defaultValue={props.originalDocumentDescription} />
                        <InputGroup.Append>
                            <Button size="sm" variant={( props.selectDocumentNeedsSave === true ) ? "warning":"success"} 
                                    disabled={!getDescriptionEdition()}
                                    className={( props.selectDocumentNeedsSave === true ) ? "mdi-18px px-1 py-0 mdi mdi-content-save-outline":"mdi-18px px-1 py-0 mdi mdi-check-bold"} 
                                    onClick={( event ) =>  handleSubmit(event)}></Button>                                
                        </InputGroup.Append>
                    </InputGroup>   

                            


                    </Col>
                </Form.Group> 
            </div>
                    
            <WarningMsg show={ showReviewMsg } dataSource={props.selectDocument} proceedFunction={onUpdateRevision}
                            closeFunction={handleReviewMsgHide} titleText="Question"
                            bodyText="Create new revision of the selected document?"
                            closeText="Cancel" okText="OK" />

            <WarningMsg show={ showErrorMsg } dataSource="" proceedFunction={handleErrorMsgHide}
                            closeFunction={handleErrorMsgHide} titleText="Error"
                            bodyText="Error! Edit the document is not possible. It is locked by another user"
                            closeText="" okText="OK" />
		</> : null
	);
};



const mapStateToProps = (state) => { 
    return { 
        selectDocument: state.ui.selectDocument,
        selectProjectOpen: state.ui.selectProjectOpen,
        showLifecycleModal: state.ui.showLifecycleModal,

        selectDocumentNeedsSave: state.ui.selectDocumentNeedsSave,
        // selectProjectOpen: state.ui.selectProjectOpen,
        oUser: state.loginReducer.loggedUser,
        oRole: state.loginReducer.rol,
        projects: state.datas.projects,
        originalDocumentDescription: state.datas.originalDocumentDescription,
        showDescription: state.datas.showDescription
    }; 
};

export default connect(mapStateToProps)(DocumentInfo);

