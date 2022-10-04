import React, { useState, useEffect } from "react";
import { Suspense } from 'react';
import { connect, useDispatch } from "react-redux";
import PdmApi from "../../services/api/PdmApi/PdmApi";
import { createDocument } from "../../stores/datas/datasAction";
import { store } from "../../stores/store";
import { Button, ButtonGroup, ButtonToolbar, Form, InputGroup } from "react-bootstrap";
import { setIsDocLinkedToProject, setSelectFolder, setSelectDocumentType, setProjectId  } from "../../stores/ui/uiActions";
import ProjectsList from '../documents/ProjectsList';
import FoldersList from '../documents/FoldersList';
import { typeForm } from "../types/typeForm";
import { setForm } from "../../stores/ui/uiActions";
import "./documents.css";

const buildDocumentTypes = async () => {
    let pdmApi = PdmApi.getInstance();
    const res = await pdmApi.getDocumentTypes();
    return res.data;
}
const NewDocument = ( props ) => {
	const dispatch = useDispatch();
    const [validated, setValidated] = useState(false);
    const { ui } = store.getState();
    let documentNameRef = React.createRef();
    let documentProjectIdRef = React.createRef();
    let documentFolderIdRef = React.createRef();
    let documentIDRef   = React.createRef();
	let documentFileRef = React.createRef();
    let formRef         = React.createRef();
    let documentProjectName = "";
    //if (ui.selectFolder != null){
    if ( props.isDocLinkedToProject === true ){
        documentProjectName = props.selectProjectOpen.name;
    };

    //const [getFileName, setFileName] = useState("");
    const [getFile, setFile] = useState(null);
    const [documentTypes, setDocumentTypes] = useState([]);
    const [firstSet, setFirstSet] = useState(false)

	const handleSubmit = () => {
		if (formRef.current.checkValidity()) {
			onCreateDocument();
		}
		setValidated(true);
	}
    useEffect(() => {
        buildDocumentTypes().then( docTypes => {
            setDocumentTypes(docTypes)
        })
    }, [])
	const onCreateDocument = async () => {
		let pdmApi = PdmApi.getInstance();
		try {
            //if (ui.selectFolder != null){
            if (props.isDocLinkedToProject === true){
                //const { ui } = store.getState();
                pdmApi.createDocument( {
                    Name: documentNameRef.current.value,
                    DocumentID: documentIDRef.current.value,
                    Type: props.selectDocumentType,
                    Status: 'InWork',
                    File: getFile,
                    FolderID:  ui.selectFolder.id,
                    Revision: "A"
                }
                ).then((result) => {
                    if (result.status === 200) {
                        //if (props.isDocLinkedToProject === true) {
                        dispatch(createDocument(result.data, props.selectProjectOpen, props.selectFolder));
                        //} else {
                        //}
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
                pdmApi.createDocument({
                    Name: documentNameRef.current.value,
                    DocumentID: documentIDRef.current.value,
                    Type: props.selectDocumentType,
                    Status: 'InWork',
                    File: getFile,
                    Revision: "A"
                },
                folderId
                ).then((result) => {
                    if (result.status === 200) {
                        if( folderId){
                              pdmApi.strapiFindOneItems('folders', folderId).then((result2) => {
                                if( result2.status === 200){
                                    let oFolder = result2.data;
                                    let oProject = props.projects.find( oProj => { return oProj.folders.some( oDir => { return oDir.id === oFolder.id })});
                                    if( oProject && oFolder){
                                        dispatch(createDocument(result.data, oProject, oFolder));
                                    }else{
                                        console.log("Probably an error occurred: a folder was selected but file has been created without one");
                                        dispatch(createDocument(result.data));
                                    }
                                }
                              });
                        }else{
                            dispatch(createDocument(result.data));
                        }
                        dispatch(setSelectFolder(null));
                        //dispatch(setIsDocLinkedToProject(false));
                        dispatch(setForm(typeForm.Nothing));
                    }
                });
            }
		} catch (error) {
			console.log("error: " + error);
		}
	}
    const GenerateID = () =>{
        documentIDRef.current.value = Date.now().toString();
    };
    const AsignProject = () => {
        //if (ui.selectFolder !== null){
        if (props.isDocLinkedToProject === true){
            return(
                <>
                   <Form.Group controlId="formDocumentProjectName">
						<Form.Label>Asign to Project</Form.Label>
						<Form.Control type="text"  placeholder="Asign to Project" value={documentProjectName} readOnly />
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
    const SelectFolder = (idProject) => {
        if ((props.isDocLinkedToProject === false) && idProject != null && idProject != '-1'){
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
            const oDocType = documentTypes.find( oCurrDocType => oCurrDocType.id === parseInt(sSelectedValue) )
            dispatch( setSelectDocumentType( oDocType ) );
        } else {
            dispatch( setSelectDocumentType( null ) );
        }
    }
    function handleProjectChange( event ) {
        console.log( event );
        var iCurrentValue = documentProjectIdRef.current.value;
        dispatch(setProjectId( iCurrentValue )) ;
    }

    function addDocType(){
        let oFirstObject = null;
        let oList = documentTypes?.map( oDocType => {
            if( oFirstObject === null){
                oFirstObject = oDocType;
            }
            return <option  key={oDocType.id} value={oDocType.id} >
                {oDocType.name}
            </option>
        })
        if( oFirstObject !== null && !firstSet){
            dispatch( setSelectDocumentType( oFirstObject ) );
            setFirstSet(true);
        }
        return oList;
    }

	return (
		<>
			<hr />
			<h1>New Document</h1>
			<hr />
			<br />
			<div className="d-flex justify-content-center">
				<Form style={{maxWidth:'400px'}} noValidate validated={validated} ref={formRef}>
					<Form.Group controlId="formDocumentName">
						<Form.Label>Document Name</Form.Label>
						<Form.Control type="text" placeholder="Document Name" required ref={documentNameRef} />
					</Form.Group>
                    <Form.Group controlId="formDocumentID">
						<Form.Label>Document ID</Form.Label>
                        <InputGroup >
                            <Form.Control type="text" placeholder=""  
                                ref={documentIDRef} readOnly required/>
                            <InputGroup.Append>
                                <Button className="form-control border-left-0 mdi mdi-key" onClick={( event ) =>  GenerateID(event)}></Button>                                
                            </InputGroup.Append>
                        </InputGroup>
					</Form.Group>
					{/* <Form.Group controlId="formDocumentID">
						<Form.Label>Document ID</Form.Label>
                        <div className="d-flex justify-content-center">
						    <Form.Control type="text" placeholder="Document ID" required ref={documentIDRef} />
                            <i className="form-control border-left-0 mdi mdi-key" onClick={() => GenerateID()}></i>  
                        </div>
					</Form.Group> */}
                    <Form.Group  controlId="formDocumentType">
                        <Form.Label>Document Type</Form.Label>
						{/* <Form.Control type="text" placeholder="Document Type" required ref={documentTypeRef} /> */}
                        <Form.Control required as="select" onChange={(event) => onSelectDocType( event )}>
                            {
                                addDocType()
                            }                            
                        </Form.Control>
					</Form.Group>
					<Form.Group controlId="formDocumentStatus">
						<Form.Label>Status</Form.Label>
						<Form.Control type="text" value="InWork" readOnly />
					</Form.Group>
                    {AsignProject()}
                    {SelectProject()}
                    {SelectFolder(props.projectId)}
                    <Form.Group controlId="formDocumentFile">
						<Form.Label>Upload File</Form.Label>
                        <Form.File 
                            label= {getFile?getFile.name:""} onChange={(e) => setFile(e.target.files[0])} custom required
                            placeholder="Document Type" ref={documentFileRef} style={{overflow:'hidden'}}/>
					</Form.Group>
					<ButtonToolbar className="justify-content-between">
						<ButtonGroup aria-label="First group">
							<Button variant="outline-primary" onClick={() => {
                                handleSubmit();
                                //dispatch(setSelectFolder(null));
                                //dispatch(setIsDocLinkedToProject(false));
                            }} >Create</Button>
						</ButtonGroup>
						<ButtonGroup>
							<Button variant="outline-danger" onClick={() => {
                                //dispatch(setSelectFolder(null));
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
        projects: state.datas.projects,
        // tasks: state.datas.tasks
    }; 
};

export default connect(mapStateToProps)(NewDocument);
//export default NewDocument;