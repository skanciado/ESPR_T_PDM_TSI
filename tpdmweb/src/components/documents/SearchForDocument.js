import React from "react";
import { connect,useDispatch } from "react-redux";
import { Suspense } from 'react';
import MaterialTable from "material-table";
import PdmApi from "../../services/api/PdmApi/PdmApi";
import { createResource, createCache } from 'simple-cache-provider';
import { setForm } from "../../stores/ui/uiActions";
import { typeForm } from "../types/typeForm";
import { Button } from "react-bootstrap";
//import  '../../../node_modules/material-icons-css/css/material-icons.css';
import { forwardRef } from 'react';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

import { roleToString } from "../../helpers/utils";

const SearchForDocument = (props) => {
    const dispatch = useDispatch();
    const cache = createCache();

    const tableIcons = {
        Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
        Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
        Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
        DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
        Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
        Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
        FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
        LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
        NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
        ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
        SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
        ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
        ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
      };

    const columns = [
        {
            title: "DocumentID",
            field: "DocumentID",
        },
        {
            title: "Name",
            field: "Name",
        },
        {
            title: "Type",
            field: "Type",
        },
        {
            title: "Project",
            field: "Project",
        },
        {
            title: "Revision",
            field: "Revision",
        },
        {
            title: "Status",
            field: "Status",
        }
    ];

    const DocumentsResource = createResource(async () => {  
        let pdmApi = PdmApi.getInstance();
        try {
            let listDocuments = [];
            await pdmApi.getProjects().then((result) => {
                if (result.status === 200) {   
                    let projects = pdmApi.filterData(result.data,props.oUser.username,roleToString(props.oRol)) ;
                    projects.map( oproject => {          
                        oproject.folders.map( ofolder => {
                            ofolder.documents.map( odocument => {
                                let ofile = {
                                    DocumentID: odocument.documentId,
                                    Name: odocument.name,
                                    Type: odocument.type.name,
                                    Project: oproject.name,
                                    Revision: odocument.revision,
                                    Status: odocument.status.name
                                }
                                listDocuments.push(ofile);
                            });
                            ofolder.cadDocuments.map( ocaddocument => {
                                let ofile = {
                                    DocumentID: ocaddocument.documentId,
                                    Name: ocaddocument.name,
                                    Type: ocaddocument.type.name,
                                    Project: oproject.name,
                                    Revision: ocaddocument.revision,
                                    Status: ocaddocument.status.name
                                }
                                listDocuments.push(ofile);
                            });
                        });
                    });    
                };
            });
            return listDocuments;
        } catch (error) {
            console.log("error: " + error);
        }
    });

    const DataGridDocuments = () => {
        const dataDocuments = DocumentsResource.read(cache);
        return (<>
                {/* <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link> */}
                {/* <link href="{{ asset('plugins/Material Icons/material-icons.css') }}" rel="stylesheet"></link> */}
                {/* <link rel="stylesheet" href="../../../node_modules/material-icons-css/css/material-icons.css"></link> */}
                <MaterialTable
                icons={tableIcons}
                className="material-icons"
                title=""
                data={dataDocuments}
                columns={columns}
                options={{ search: true, paging: false, filtering: true, exportButton: true }}
            />
        </>)
    };
         
	return (
		<>
        	<hr />
			<h1>Search for Document</h1>
			<hr />
			<br />
            <div  className="col-fill-remaining" style={{minWidth:'300px'}}>
                <Suspense fallback={<div>Loading...</div>}>
                    <DataGridDocuments />
                    <br />
                </Suspense>
            </div>
		</>
	);
};

const mapStateToProps = (state) => { 
    return { 
        oUser:                  state.loginReducer.loggedUser,
        oRol :                  state.loginReducer.rol
    }; 
};

export default connect(mapStateToProps)(SearchForDocument);