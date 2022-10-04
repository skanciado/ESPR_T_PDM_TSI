import React from "react";
import { connect } from "react-redux";

import { ListGroup } from "react-bootstrap";
import { setProjectWorkflowTemplate } from '../../stores/ui/uiActions';

import PdmApi from '../../services/api/PdmApi/PdmApi';

import "./ProjectWorkflowTemplate.css";

class ProjectWorkflowTemplate extends React.Component {

	constructor(props) {
		super(props);
        this.state = {
            RenderedTemplatesList: []
        };
        this.onGetProjectWorkflowTemplates = this.onGetProjectWorkflowTemplates.bind(this);        
    }
    
    async componentDidMount () {
        var data = await this.onGetProjectWorkflowTemplates();

        this.setState( {
            RenderedTemplatesList: data
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.selectProjectWorkflowTemplate !== this.props.selectProjectWorkflowTemplate) {
          console.log('ProjectTaskTemplate RenderedTemplatesList changed')
        }
    }


    

    async onGetProjectWorkflowTemplates( ) {
		let pdmApi = PdmApi.getInstance();
		try {
            let listProjWorkflows = [];
            let iOptCount = 0;

			await pdmApi.getProjectWorkflowTemplates().then((result) => {
				if (result.status === 200) { 
                    let iDefaultSelectedWF = undefined; 
                    listProjWorkflows = result.data.map( oCurrWFTemplate => {  
                        if( iOptCount === 0 ) {
                            iDefaultSelectedWF = oCurrWFTemplate;
                        }   
                        iOptCount += 1;

                        return(<option key={"project-workflow-template-id" + oCurrWFTemplate.id} value={oCurrWFTemplate.id}>{oCurrWFTemplate.name}</option>)
                    })

                    this.props.dispatch( setProjectWorkflowTemplate( iDefaultSelectedWF ) );                    
                };
            });
            return listProjWorkflows;
		} catch (error) {
			console.log("error: " + error);
		}
    }
	

	render() {
        /*
        <Form.Control as="select" placeholder="Workflow Template" required ref={projectWorkflowRef} >
                             <Suspense fallback={<div>Loading...</div>}>
                                { <DataWorkflowsProject />  }
                                </Suspense>
                                </Form.Control>
        */
		return (  this.state.RenderedTemplatesList  );
	}
}

const mapStateToProps = (state) => {
	return {
		// ...state,
		// loggedUser: state.loggedUser,
		// isUserLogged: state.isUserLogged,
		// redirectToReferrer: state.redirectToReferrer,
		// loginFailed: state.loginFailed,
        selectProjectWorkflowTemplate: state.ui.selectProjectWorkflowTemplate
	};
};

export default connect(mapStateToProps)(ProjectWorkflowTemplate);
