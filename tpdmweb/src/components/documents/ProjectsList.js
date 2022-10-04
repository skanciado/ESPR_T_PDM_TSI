import React from "react";
import { connect } from "react-redux";
import { ListGroup } from "react-bootstrap";
import PdmApi from '../../services/api/PdmApi/PdmApi';
import { setProjectId  } from "../../stores/ui/uiActions";

class ProjectsList extends React.Component {
	constructor(props) {
		super(props);
        this.state = {
            RenderedProjectsList: [],
            firstSet: false
        };
        this.props.dispatch( setProjectId('-1'));
        this.onGetProjects = this.onGetProjects.bind(this);      
    } 
    async componentDidMount () {
        var data = await this.onGetProjects();
        this.setState( {
            RenderedProjectsList: data
        });
    }
    async onGetProjects( ) {
		let pdmApi = PdmApi.getInstance();
		try {
            let listProjects = [];
			await pdmApi.getProjects().then((result) => {
				if (result.status === 200) {         
                    let firstElem = null;
                    listProjects = result.data.map( oCurrProject => {    
                        if( firstElem === null){
                            firstElem = oCurrProject.id;
                        }
                        return(<option value={ oCurrProject.id }>{ oCurrProject.name }</option>)
                    })
                    if( firstElem !== null && !this.state.firstSet){
                        this.props.dispatch(setProjectId( firstElem ));
                        this.setState( {
                            firstSet: true
                        });
                    }
                };
            });
            return listProjects;
		} catch (error) {
			console.log("error: " + error);
		}
    }
	render() {
		return (  this.state.RenderedProjectsList  );
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

export default connect(mapStateToProps)(ProjectsList);
