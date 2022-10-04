import React from "react";
import { connect } from "react-redux";

import { ListGroup } from "react-bootstrap";

import { setDocumentTemplateTasks } from "../../stores/ui/uiActions";

import PdmApi from '../../services/api/PdmApi/PdmApi';

import "./TaskList.css";

class TaskList extends React.Component {

	constructor(props) {
		super(props);

        this.state = {
            RenderedTaskList: []
        };

        this.onGetTasksName = this.onGetTasksName.bind(this);
        this.RetrieveTasksData = this.RetrieveTasksData.bind(this);
        
    }
    
    async RetrieveTasksData() {
        var data = await this.onGetTasksName();

        this.setState( {
            RenderedTaskList: data
        });
    }

    async componentDidMount () {
        await this.RetrieveTasksData();
    }

    async componentDidUpdate( prevProps ) {
        if (this.props.ui.templateId !== prevProps.ui.templateId) {
            console.log('templateId changed ');
            await this.RetrieveTasksData();
        }
    }

    
    async onGetTasksName ( ) {
		let pdmApi = PdmApi.getInstance();
		try {
            
            let listTasks = [];

            let listWorkflowsDocumen = [];
            if( this.props.ui.templateId === "-1" ) {
                return(<ListGroup.Item disabled > No Tasks </ListGroup.Item> )
            }
			await pdmApi.getWorkflowById(this.props.ui.templateId).then((result) => {
				if (result.status === 200) { 
                    //this.props.dispatch(setDocumentTemplateTasks(result.data.TasksNames));
                    
                     var aListOfTasks = result.data.tasks;//.TasksNames.split(";");
   
                     listWorkflowsDocumen = aListOfTasks.map( oCurrTaskTemplate => {  
                    //     if( iCounterResults === 0 ) {
                    //         //selectedTemplateId   = n.id;
                    //         //setSelectedTemplateId( n.id )
                    //     }                         
                         return(<ListGroup.Item>
                                    { "Task " + oCurrTaskTemplate.id + ": " + oCurrTaskTemplate.taskName }
                                </ListGroup.Item>)
                     })
                };
            });
            return listWorkflowsDocumen;

		} catch (error) {
			console.log("error: " + error);
		}
    }
	

	render() {
		return (  
                    <ListGroup>
                        { this.state.RenderedTaskList } 
                    </ListGroup>  
                )
	}
}

const mapStateToProps = (state) => {
	return {
        ...state,
		tasks: state.tasks,
	};
};

export default connect(mapStateToProps)(TaskList);
