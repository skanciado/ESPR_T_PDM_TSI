import React from "react";
import { connect } from "react-redux";
import { ListGroup } from "react-bootstrap";
import PdmApi from '../../services/api/PdmApi/PdmApi';

class FoldersList extends React.Component {
	constructor(props) {
		super(props);
        this.state = {
            RenderedFoldersList: []
        };
        this.onGetFolders = this.onGetFolders.bind(this);
        this.RetrieveFoldersData = this.RetrieveFoldersData.bind(this);
    } 
    async RetrieveFoldersData() {
        var data = await this.onGetFolders();
        this.setState( {
            RenderedFoldersList: data
        });
    }
    async componentDidMount () {
        await this.RetrieveFoldersData();
    }
    //async componentDidMount () {
    //    var data = await this.onGetFolders();
    //    this.setState( {
    //        RenderedFoldersList: data
    //    });
    //}
    async componentDidUpdate( prevProps ) {
        if (this.props.ui.projectId !== prevProps.ui.projectId) {
            console.log('projectId changed ');
            await this.RetrieveFoldersData();
        }
    }
    async onGetFolders( ) {
		let pdmApi = PdmApi.getInstance();
		try {
            let listFolders = [];
            if (this.props.ui.projectId == '-1')
            {
                return listFolders;
            }
			await pdmApi.getProjectById(this.props.ui.projectId).then((result) => {
				if (result.status === 200) {         
                    listFolders = result.data.folders.map( oCurrFolder => {    
                        return(<option value={ oCurrFolder.id }>{ oCurrFolder.phaseName }</option>)
                    })
                };
            });
            return listFolders;
		} catch (error) {
			console.log("error: " + error);
		}
    }
	render() {
		return (  this.state.RenderedFoldersList  );
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

export default connect(mapStateToProps)(FoldersList);