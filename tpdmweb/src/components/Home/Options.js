import React from "react";
import { connect,useDispatch } from "react-redux";
import { Button, Card, Accordion, ButtonGroup } from "react-bootstrap";

import { store } from "../../stores/store";
import { typeComponent } from "../types/typeComponent";
import { typeForm } from "../types/typeForm";
import { typeSearch } from "../types/typeSearch";
import { setIsDocLinkedToProject, setSelectFolder, setSelectDocument, setSelectTask, setSelectDocTask, setSelectProject } from "../../stores/ui/uiActions";
import { setComponent, setForm, setSearch } from "../../stores/ui/uiActions";
import { roleToString } from "../../helpers/utils";

import { updateWorkSpace } from "../../stores/datas/datasAction";
import PdmApi from "../../services/api/PdmApi/PdmApi";

const Options = (props) => {
	const style = {
		links: {
			textDecoration: "none",
		},
		textSubButtons: {
			textAlign: 'left',
		}
	};

	const dispatch = useDispatch();
	//const { ui } = store.getState();

	const setWorkspace = () => {
        let pdmApi = PdmApi.getInstance();
        //Actualizar workspace
        pdmApi.loadMyWorkSpaceForLoggedUser( props.oUser ).then((result) => {
            if (result.status === 200) {
                result.data = pdmApi.filterData( result.data, props.oUser.username, roleToString(props.oRol));
                // TODO: Save WorkSpace content in Redux
                dispatch(updateWorkSpace(result.data/*, result.data.tasks, result.data.errors*/));

                /*let oProject = null;
                let oDir = null;
                let oDoc = null;
                let oTask = null;

                result.data.forEach( oProj => {
                    if( oProj.id === props.selectProject?.id){
                        oProject = oProj;
                    }
                    oProj.folders.forEach( oFolder =>{
                        if( props.selectFolder?.id === oFolder.id){
                            oDir = oFolder;
                        }
                        if( props.selectDocument && !oDoc){
                            if( props.selectDocument?.application){
                                oDoc = oFolder.cadDocuments.find( oDocDir => oDocDir.id === props.selectDocument?.id);
                            }else{
                                oDoc = oFolder.documents.find( oDocDir => oDocDir.id === props.selectDocument?.id);
                            }
                        }
                    })
                })
                if(props.selectProject){
                    dispatch(setSelectProject(oProject));
                }
                if(props.selectFolder){
                    dispatch(setSelectFolder(oDir));
                }
                if(props.selectDocument){
                    dispatch(setSelectDocument(oDoc));
                }
                if(props.selectTask){ 
                    dispatch(setSelectTask(null));
                }*/
            }
            
        });
        dispatch(setSelectProject(null));
        dispatch(setSelectFolder(null));
        dispatch(setSelectDocument(null));
        dispatch(setSelectTask(null));
        dispatch(setSelectDocTask(null));
		// En caso de que ya exista un formulario abierto no permitir salir.
		if (props.currentForm == typeForm.SearchForDocument)
		{
			dispatch(setForm(typeForm.Nothing));
			dispatch(setComponent(typeComponent.WorkSpace));
		}
		if (props.currentForm !== typeForm.Nothing) return;

		if (props.currentComponent !== typeComponent.WorkSpace) {
			dispatch(setForm(typeForm.Nothing));
			dispatch(setComponent(typeComponent.WorkSpace));
		}
	};
	const setDocumentSearch = (form) => {
		// En caso de que ya exista un formulario abierto no permitir salir.
		if ((props.currentForm !== typeForm.Nothing) && (props.currentForm !== typeForm.SearchForDocument)) return;
		if (form == typeForm.SearchForDocument)
		{
			dispatch(setForm(typeForm.SearchForDocument));
		}
		if (props.currentComponent !== typeForm.SearchForDocument) {
			dispatch(setComponent(typeForm.SearchForDocument));
		}
	};
	// Los formularios ocupan 10 columnas y no borran el actual componente ni componente de información.
	const setForms = (form) => {
		// En caso de que ya exista un formulario abierto no permitir salir.
		if ((props.currentForm !== typeForm.Nothing) && (props.currentForm !== typeForm.SearchForDocument)) return;

		if (props.currentForm !== form) {
			dispatch(setForm(form));
		}
	}

	const setSearches = (search) => {
		// En caso de que ya exista un formulario abierto no permitir salir.
		if (props.currentForm !== typeForm.Nothing) return;

		if (props.currentSearch !== search) {
			dispatch(setSearch(search));
		}
	}

	return (
		<>
			<Accordion defaultActiveKey="0">
				{/* ------------------------ OPTION: My Workspace ------------------------ */}
				<Card>
					<Card.Header>
						<Accordion.Toggle as={Button} variant="link" eventKey="0" style={style.links}
							onClick={() => setWorkspace()}>
							<strong>MY WORKSPACE</strong>
						</Accordion.Toggle>
					</Card.Header>
				</Card>
				{/* ------------------------ OPTION: Projects ------------------------ */}
				<Card>
					<Card.Header>
						<Accordion.Toggle as={Button} variant="link" eventKey="1" style={style.links}>
							<strong>PROJECTS</strong>
						</Accordion.Toggle>
					</Card.Header>
					<Accordion.Collapse eventKey="1">
						<Card.Body>
							<ButtonGroup vertical>
								<Button variant="light" style={style.textSubButtons}
									onClick={() => setForms(typeForm.NewProject)}>
									New Project
								</Button>
								<Button variant="light" style={style.textSubButtons}>
									New Project Template
								</Button>
								<Button variant="light" style={style.textSubButtons}>
									Search for Project
								</Button>
							</ButtonGroup>
						</Card.Body>
					</Accordion.Collapse>
				</Card>
				{/* ------------------------ OPTION: Folders ------------------------ */}
				<Card>
					<Card.Header>
						<Accordion.Toggle as={Button} variant="link" eventKey="2" style={style.links}>
							<strong>FOLDERS</strong>
						</Accordion.Toggle>
					</Card.Header>
					<Accordion.Collapse eventKey="2">
						<Card.Body>
							<ButtonGroup vertical>
								<Button variant="light" style={style.textSubButtons}>New Folder</Button>
								<Button variant="light" style={style.textSubButtons}>Search for Folder</Button>
							</ButtonGroup>
						</Card.Body>
					</Accordion.Collapse>
				</Card>
				{/* ------------------------ OPTION: Documents ------------------------ */}
				<Card>
					<Card.Header>
						<Accordion.Toggle as={Button} variant="link" eventKey="3" style={style.links}>
							<strong>DOCUMENTS</strong>
						</Accordion.Toggle>
					</Card.Header>
					<Accordion.Collapse eventKey="3">
						<Card.Body>
							<ButtonGroup vertical>
								<Button variant="light" style={style.textSubButtons}
									onClick={() => {
                                                        dispatch(setSelectFolder(null));
                                                        dispatch(setIsDocLinkedToProject(false));
                                                        setForms(typeForm.NewDocument);
                                                    }}>
									New Document
								</Button>
								<Button variant="light" style={style.textSubButtons}
									onClick={() => { 
                                                        dispatch(setIsDocLinkedToProject(false));
                                                        setForms(typeForm.NewCADDocument);
                                                    }}>
									New CAD Document
								</Button>
								<Button variant="light" style={style.textSubButtons}
									onClick={() => setDocumentSearch(typeForm.SearchForDocument)}>
									Search for Document
								</Button>
							</ButtonGroup>
						</Card.Body>
					</Accordion.Collapse>
				</Card>
				{/* ------------------------ OPTION: Workflows ------------------------ */}
				<Card>
					<Card.Header>
						<Accordion.Toggle as={Button} variant="link" eventKey="4" style={style.links}>
							<strong>WORKFLOWS</strong>
						</Accordion.Toggle>
					</Card.Header>
					<Accordion.Collapse eventKey="4">
						<Card.Body>
							<ButtonGroup vertical>
								<Button variant="light" style={style.textSubButtons}>New Workflow</Button>
								<Button variant="light" style={style.textSubButtons}>Search for Workflow</Button>
							</ButtonGroup>
						</Card.Body>
					</Accordion.Collapse>
				</Card>
			</Accordion>
		</>
	);
};


const mapStateToProps = (state) => { 
    return { 
        currentForm:            state.ui.currentForm,
        currentComponent:       state.ui.currentComponent,
        selectDocument:         state.ui.selectDocument,
        selectProject:          state.ui.selectProject,
        selectFolder:           state.ui.selectFolder,
        selectTask:             state.ui.selectTask,
        oUser:                  state.loginReducer.loggedUser,
        oRol :                  state.loginReducer.rol
    }; 
};

export default connect(mapStateToProps)(Options);
