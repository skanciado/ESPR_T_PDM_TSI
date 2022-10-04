import React, { useState, useEffect } from "react";
import { Suspense } from 'react';
import { connect, useDispatch } from "react-redux";
import PdmApi from "../../services/api/PdmApi/PdmApi";
import { createCADDocument } from "../../stores/datas/datasAction";
import { store } from "../../stores/store";
import { Button, ButtonGroup, ButtonToolbar, Form } from "react-bootstrap";
import { setIsDocLinkedToProject, setSelectFolder, setForm, setSelectDocumentType, setSelectDocumentApplication, setProjectId } from "../../stores/ui/uiActions";
import ProjectsList from '../documents/ProjectsList';
import FoldersList from '../documents/FoldersList';
import { typeForm } from "../types/typeForm";

const buildDocumentTypes = async () => {
    let pdmApi = PdmApi.getInstance();
    const res = await pdmApi.getCADDocumentTypes();
    return res.data;
}
const buildDocumentApplications = async () => {
    let pdmApi = PdmApi.getInstance();
    const res = await pdmApi.getCADDocumentApplications();
    return res.data;
}
const NewCADDocument = ( props )  => {
	const dispatch = useDispatch();
    const [validated, setValidated] = useState(false);
    const { ui } = store.getState();
    let cadDocumentName = React.createRef();
    let documentProjectIdRef = React.createRef();
    let documentFolderIdRef = React.createRef();
    let cadDocumentID = React.createRef();
	let cadDocumentFile = React.createRef();
    let formulario = React.createRef();
    let cadDocumentProjectName = "";
    //if (ui.selectFolder != null){
    if ( props.isDocLinkedToProject === true ){
        cadDocumentProjectName = ui.selectProjectOpen.name;
    };
    const [getFile, setFile] = useState(null);
    const [cadDocumentType, setDocumentTypes] = useState([]);
    const [cadDocumentApplication, setDocumentApplications] = useState([])
    const [firstDocTypeSet, setFirstDocTypeSet] = useState(false)
    const [firstAppSet, setFirstAppSet] = useState(false)

	const handleSubmit = () => {
		if (formulario.current.checkValidity()) {
			onCreateCADDocument();
		}
		setValidated(true);
	}
    useEffect(() => {
        buildDocumentTypes().then( docTypes => {
            setDocumentTypes(docTypes)
        })
        buildDocumentApplications().then( docApplications => {
            setDocumentApplications(docApplications)
        })
    }, [])
	const onCreateCADDocument = async () => {
		let pdmApi = PdmApi.getInstance();
		try {
            //if (ui.selectFolder != null){
            if (props.isDocLinkedToProject === true ){
                pdmApi.createCADDocument({
                    Name: cadDocumentName.current.value,
                    DocumentID: cadDocumentID.current.value,
                    Type: props.selectDocumentType,
                    Application: props.selectDocumentApplication,
                    Status: 'InWork',
                    //ProjectsNames: ui.selectProject.id,
                    File: getFile,
                    FolderID :  ui.selectFolder.id,
                    Revision: "A"
                }).then((result) => {
                    if (result.status === 200) {
                        dispatch(createCADDocument(result.data, props.selectProjectOpen, props.selectFolder));
                        //pdmApi.filterData( ui.Pork)
                        dispatch(setSelectFolder(null));
                        dispatch(setIsDocLinkedToProject(false));
                        dispatch(setForm(typeForm.Nothing));
                    }
                });
            }else{
                let folderId = null;
                if (documentFolderIdRef.current != null)
                {
                    folderId = documentFolderIdRef.current.value;
                }
                pdmApi.createCADDocument({
                    Name: cadDocumentName.current.value,
                    DocumentID: cadDocumentID.current.value,
                    Type: props.selectDocumentType,
                    Application: props.selectDocumentApplication,
                    Status: 'InWork',
                    File: getFile,
                    Revision: "A"
                },
                folderId
                ).then((result) => {
                    if (result.status === 200) {
                        let oFolder = props.selectFolder;
                        let oProject = props.selectProjectOpen;
                        if( folderId){
                              pdmApi.strapiFindOneItems('folders', folderId).then((result2) => {
                                if( result2.status === 200){
                                    oFolder = result2.data;
                                    oProject = props.projects.find( oProj => { return oProj.folders.some( oDir => { return oDir.id === oFolder.id })});
                                }
                                dispatch(createCADDocument(result.data, oProject, oFolder));
                              });
                        }else{
                            dispatch(createCADDocument(result.data, props.selectProjectOpen, oFolder));
                        }
                        dispatch(setSelectFolder(null));
                        dispatch(setForm(typeForm.Nothing));
                    }
                });
            }
		} catch (error) {
			console.log("error: " + error);
		}
    }   
    const GenerateID = () =>{
        cadDocumentID.current.value = Date.now().toString();
    };
    const AsignProject = () => {
        //if (ui.selectFolder !== null){
        if (props.isDocLinkedToProject === true ){
            return(
                <>
                    <Form.Group controlId="formCADDocumentProjectName">
                        <Form.Label>Asign to Project</Form.Label>
                        <Form.Control type="text"  placeholder="Asign to Project" value={cadDocumentProjectName} readOnly />
                    </Form.Group>
                </>
            )
        }
    };
    const SelectProject = () => {
        if (props.isDocLinkedToProject === false){
            return(
                <>
                    <Form.Group controlId="formDocumentProjectName">
                        <Form.Label>Select Project</Form.Label>
                        <Form.Control as="select" placeholder="Folder" required ref={documentProjectIdRef} onChange={ (event) => handleProjectChange( event ) } >
                             <Suspense fallback={<div>Loading...</div>}>
                                <ProjectsList />
                            </Suspense>
                        </Form.Control>
                    </Form.Group>     
                </>
            )
        }
    };
    const SelectFolder = (idProyect) => {
        if ((props.isDocLinkedToProject === false) && idProyect != null && idProyect != '-1'){
            return(
                <>
                    <Form.Group controlId="formDocumentFolderName">
                        <Form.Label>Select Folder</Form.Label>
                        <Form.Control as="select" required ref={documentFolderIdRef} >
                             <Suspense fallback={<div>Loading...</div>}>
                                <FoldersList />
                            </Suspense>
                        </Form.Control>
                    </Form.Group>     
                </>
            )
        }
    };
    const onSelectDocType = ( event ) => {
        let sSelectedValue = event.target.value;
        const oCond1 = ( sSelectedValue !== "" );
        const oCond2 = ( sSelectedValue !== null );
        const oCond3 = ( sSelectedValue !== undefined );
        if( oCond1 && oCond2 && oCond3 ) {
            const oDocType = cadDocumentType.find( oCurrDocType => oCurrDocType.id === parseInt(sSelectedValue) )
            dispatch( setSelectDocumentType( oDocType ) );
        } else {
            dispatch( setSelectDocumentType( null ) );
        }
    }
    const onSelectDocApplication = ( event ) => {
        let sSelectedValue = event.target.value;
        const oCond1 = ( sSelectedValue !== "" );
        const oCond2 = ( sSelectedValue !== null );
        const oCond3 = ( sSelectedValue !== undefined );
        if( oCond1 && oCond2 && oCond3 ) {
            const oDocApplication = cadDocumentApplication.find( oCurrDocApplication => oCurrDocApplication.id === parseInt(sSelectedValue) )
            dispatch( setSelectDocumentApplication( oDocApplication ) );
        } else {
            dispatch( setSelectDocumentApplication( null ) );
        }
    }
    function handleProjectChange( event ) {
        console.log( event );
        var iCurrentValue = documentProjectIdRef.current.value;
        dispatch(setProjectId( iCurrentValue )) ;
    }

    function addCADDocType(){
        let oFirstObject = null;
        let oList = cadDocumentType?.map( oDocType => {
            if( oFirstObject === null){
                oFirstObject = oDocType;
            }
            return <option  key={oDocType.id} value={oDocType.id} >
                {oDocType.name}
            </option>
        })
        if( oFirstObject !== null && !firstDocTypeSet){ 
            dispatch(setSelectDocumentType( oFirstObject));
            setFirstDocTypeSet(true); 
        }
        return oList;  
    }

    function addApplications(){
        let oFirstObject = null;
        let oList = cadDocumentApplication?.map( oDocApplication => {
            if( oFirstObject === null){
                oFirstObject = oDocApplication;
            }
            return <option  key={oDocApplication.id} value={oDocApplication.id} >
                {oDocApplication.name}
            </option>
        })
        if( oFirstObject !== null && !firstAppSet){ 
            dispatch( setSelectDocumentApplication( oFirstObject)); 
            setFirstAppSet(true);
        }
        return oList;    
    }

	return (
		<>
			<hr />
			<h1>New CAD Document</h1>
			<hr />
			<br />
			<div className="d-flex justify-content-center">
				<Form style={{maxWidth:'400px'}} noValidate validated={validated} ref={formulario}>
					<Form.Group controlId="formCADDocumentName">
						<Form.Label>Document Name</Form.Label>
						<Form.Control type="text" placeholder="Document Name" required ref={cadDocumentName} />
					</Form.Group>
					<Form.Group controlId="formCADDocumentID">
						<Form.Label>Document ID</Form.Label>
                        <div className="d-flex justify-content-center">
						    <Form.Control type="text" placeholder="Document ID" required ref={cadDocumentID} />
                            <i className="form-control border-left-0 mdi mdi-key" onClick={() => GenerateID()}></i>  
                        </div>	
                    </Form.Group>
                    <Form.Group controlId="formCADDocumentType">
                    <Form.Label>CAD Document Type</Form.Label>
                    <Form.Control required as="select" onChange={(event) => onSelectDocType( event )}>
                            { addCADDocType() }                            
                        </Form.Control>
					</Form.Group>
                    <Form.Group controlId="formCADDocumentAplication">
                    <Form.Label>Document Aplication</Form.Label>
                        <Form.Control required as="select" onChange={(event) => onSelectDocApplication( event )}>
                            { addApplications()}                            
                        </Form.Control>
					</Form.Group>
					<Form.Group controlId="formCADDocumentStatus">
						<Form.Label>Status</Form.Label>
						<Form.Control type="text" value="InWork" readOnly />
					</Form.Group>
                    {AsignProject()}
                    {SelectProject()}
                    {SelectFolder(props.projectId)}
                    <Form.Group controlId="formCADDocumentFile">
						<Form.Label>Upload File</Form.Label>
                        <Form.File 
                            label= {getFile?getFile.name:""} onChange={(e) => setFile(e.target.files[0])} custom
                            placeholder="Document Type" ref={cadDocumentFile} style={{overflow:'hidden'}}/>
					</Form.Group>
					<ButtonToolbar className="justify-content-between">
                    <ButtonGroup aria-label="First group">
                        <Button variant="outline-primary" onClick={() => {
                            handleSubmit();
                            dispatch(setSelectFolder(null));
                            dispatch(setIsDocLinkedToProject(false));
                        }} >Create</Button>
                        </ButtonGroup>
                        <ButtonGroup>
                            <Button variant="outline-danger" onClick={() => {                                
                                dispatch(setSelectFolder(null));
                                dispatch(setIsDocLinkedToProject(false));
                                dispatch(setForm(typeForm.Nothing));
                            }}>Close</Button>
                        </ButtonGroup>
					</ButtonToolbar>
				</Form>
			</div>
		</>
	);
};

const mapStateToProps = (state) => { 
    return { 
        isDocLinkedToProject: state.ui.isDocLinkedToProject,
        // selectDocumentNeedsSave: state.ui.selectDocumentNeedsSave,
        selectProjectOpen: state.ui.selectProjectOpen,
        selectDocumentType: state.ui.selectDocumentType,
        selectFolder: state.ui.selectFolder,
        projectId: state.ui.projectId,
        selectDocumentApplication: state.ui.selectDocumentApplication,
        projects: state.datas.projects,
        // tasks: state.datas.tasks
    }; 
};

export default connect(mapStateToProps)(NewCADDocument);
//export default NewCADDocument;