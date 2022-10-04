import React from "react";
import { ButtonToolbar, ButtonGroup, Button } from "react-bootstrap";
import { connect,useDispatch } from "react-redux";
import { typeInfo } from "../../components/types/typeInfo";

import "./toolbar.css";

const Toolbar = (props) => {
    
    const dispatch = useDispatch();

	const style = {
		toolButton: {
			padding: "0px",
			margin: "0px",
			backgroundColor: "white",
			color: "#0056b3",
			borderColor: 'white',
		},
	};

    const getDocButtonSensitivity = () => {
        return props.currentInfo === typeInfo.Document;
    }

    const getCurrentDocLocked = () => {
        if( getDocButtonSensitivity() ){
            return props.selectDocument?.locked;
        }
        return false;
    }

	return (
		<ButtonToolbar aria-label="Toolbar with button groups">
			<ButtonGroup className="mr-2" aria-label="First group">
				<Button style={style.toolButton}>
					<span className="mdi mdi-content-save-outline toolBarIcons"></span>
				</Button>{" "}
				<Button style={style.toolButton}>
					<span className="mdi mdi-content-copy toolBarIcons"></span>
				</Button>{" "}
				<Button style={style.toolButton}>
					<span className="mdi mdi-content-paste toolBarIcons"></span>
				</Button>{" "}
				<Button style={style.toolButton}>
					<span className="mdi mdi-content-cut toolBarIcons"></span>
				</Button>
			</ButtonGroup>
			<ButtonGroup className="mr-2" aria-label="Second group">
				<Button style={style.toolButton} disabled={!getDocButtonSensitivity()}>
					<span className="mdi mdi-download toolBarIcons"></span>
				</Button>{" "}
				<Button style={style.toolButton} disabled={!getDocButtonSensitivity()}>
					<span className="mdi mdi-upload toolBarIcons"></span>
				</Button>
				<Button style={style.toolButton} disabled={!getDocButtonSensitivity()}>
					<span className="mdi mdi-lock-outline toolBarIcons"></span>
				</Button>{" "}
				<Button style={style.toolButton} disabled={!getCurrentDocLocked()}>
					<span className="mdi mdi-lock-open-outline toolBarIcons"></span>
				</Button>
			</ButtonGroup>
			<ButtonGroup aria-label="Third group">
				<Button style={style.toolButton}>
					<span className="mdi mdi-trash-can-outline toolBarIcons"></span>
				</Button>
			</ButtonGroup>
		</ButtonToolbar>
	);
};


const mapStateToProps = (state) => { 
    return { 
        currentInfo: state.ui.currentInfo,
        selectDocument: state.ui.selectDocument
    }; 
};

export default connect(mapStateToProps)(Toolbar);

