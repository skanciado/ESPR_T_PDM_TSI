import React from "react";
import { connect } from "react-redux";
import { ListGroup } from "react-bootstrap";
import PdmApi from '../../services/api/PdmApi/PdmApi';

import { setDocumentTemplateId } from '../../stores/ui/uiActions'

import "./DocumentTemplateList.css";


class DocumentTemplateList extends React.Component {
	constructor(props) {
		super(props);
        this.state = {
            RenderedTemplatesList: [],
            firstSet: false
        };
        this.onGetWorkflowsDocument = this.onGetWorkflowsDocument.bind(this);      
    } 
    async componentDidMount () {
        var data = await this.onGetWorkflowsDocument();
        this.setState( {
            RenderedTemplatesList: data
        });
    }
    async onGetWorkflowsDocument( ) {
		let pdmApi = PdmApi.getInstance();
		try {
            let listWorkflowsDocumen = [];
			await pdmApi.getDocumentWorkflowTemplates().then((result) => {
				if (result.status === 200) {         
                    let firstElem = null;
                    listWorkflowsDocumen = result.data.map( oCurrWFTemplate => {    
                        if( firstElem === null){
                            firstElem = oCurrWFTemplate.id;
                        }
                        return(<option value={ oCurrWFTemplate.id }>{ oCurrWFTemplate.name }</option>)
                    })
                    if( firstElem !== null && !this.state.firstSet){
                        this.props.dispatch(setDocumentTemplateId( firstElem ));
                    }
                    this.setState( {
                        firstSet: true
                    });
                };
            });
            return listWorkflowsDocumen;
		} catch (error) {
			console.log("error: " + error);
		}
    }
	render() {
		return (  this.state.RenderedTemplatesList  );
	}
}
const mapStateToProps = (state) => {
	return {
		...state,
		loggedUser: state.loggedUser,
		isUserLogged: state.isUserLogged,
		redirectToReferrer: state.redirectToReferrer,
		loginFailed: state.loginFailed,
	};
};

export default connect(mapStateToProps)(DocumentTemplateList);
