import React from "react";
import { store } from "../../../stores/store";
import { connect } from "react-redux";

const FolderInfo = ( props ) => {
	//const { ui } = store.getState();

	return (
		props.selectFolder?
        <>
			<h1>FolderInfo</h1>
			<hr />
			<span><strong>PhaseID:</strong>  { props.selectFolder?.phaseId}</span><br />
			<span><strong>Name:</strong>  { props.selectFolder?.phaseName}</span><br />
			<span><strong>ProjectID:</strong>  { props.selectProjectOpen?.projectId}</span><br />
		</>
        :null
	);
};

const mapStateToProps = (state) => { 
    return { 
        selectFolder:       state.ui.selectFolder,
        selectProjectOpen:  state.ui.selectProjectOpen 
    }; 
};

export default connect(mapStateToProps)(FolderInfo);