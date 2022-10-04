import React from "react";
import { connect } from "react-redux";

import { ListGroup } from "react-bootstrap";
import { setProjectWorkflowTemplate } from '../../stores/ui/uiActions';

import PdmApi from '../../services/api/PdmApi/PdmApi';

import "./ProjectTaskTemplate.css";

class ProjectTaskTemplate extends React.Component {

	constructor(props) {
		super(props);
        this.state = {
            RenderedTemplatesList: []
        };

        this.selWFTemplate = this.props.selectedWorkflowTemplate;
        this.onGetProjectTaskTemplates = this.onGetProjectTaskTemplates.bind(this);        
    }
    
    componentDidMount () {
        if ( ( this.props.selectProjectWorkflowTemplate !== null ) && ( this.props.selectProjectWorkflowTemplate !== undefined ) ) {
            var data = this.onGetProjectTaskTemplates( );

            this.setState( {
                RenderedTemplatesList: data
            });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.selectProjectWorkflowTemplate !== this.props.selectProjectWorkflowTemplate) {

             var data = this.onGetProjectTaskTemplates( );

            this.setState( {
                RenderedTemplatesList: data
            });
        }
      }
    

    onGetProjectTaskTemplates( ) {
		//let pdmApi = PdmApi.getInstance();
        
		try {
            let listProjWFTasksTemplate = [];
            //let iOptCount = 0;
            if ( ( this.props.selectProjectWorkflowTemplate !== null ) && ( this.props.selectProjectWorkflowTemplate !== undefined ) ) {
                //await pdmApi.getProjectWorkflowTemplateData( sProjectWFId ).then((result) => {
                    //if (result.status === 200) { 
                        //let iDefaultOption = 0; 
                        listProjWFTasksTemplate = this.props.selectProjectWorkflowTemplate.tasks.map( oCurrWFTaskTemplate => {  
                            //if( iOptCount === 0 ) {
                            //    iDefaultOption = oCurrWFTemplate.id;
                            //}   
                            //iOptCount += 1;

                            return( <ListGroup.Item>
                                    Task { oCurrWFTaskTemplate.taskNumber }: { oCurrWFTaskTemplate.taskName }
                                    </ListGroup.Item> )
                        })

                        //this.props.dispatch( setProjectWorkflowTemplate( iDefaultOption ) );                    
                    //};
                //});
                    }
            return listProjWFTasksTemplate;
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

export default connect(mapStateToProps)(ProjectTaskTemplate);
