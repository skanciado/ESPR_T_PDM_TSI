import React from "react";
import { connect } from "react-redux";

import { Suspense } from 'react';
import { ListGroup, Modal, Button, Form } from "react-bootstrap";
import { updateProject } from "../../stores/datas/datasAction";
import { setSelectProject } from "../../stores/ui/uiActions";

import { setShowUserModal } from '../../stores/ui/uiActions';

import PdmApi from '../../services/api/PdmApi/PdmApi';

import { roleToString } from "../../helpers/utils";

import "./ModalTeamSelector.css";

class ModalTeamSelector extends React.Component {

	constructor(props) {
		super(props);
        this.state = {
            RenderedList: [],
            UsersToAdd: []
        };

        this.onGetUsers = this.onGetUsers.bind(this);        
    }


    handleClose( event ) {
        this.props.dispatch( setShowUserModal( false ) );
    }
    

    async componentDidMount () {
           var data = await this.onGetUsers( );

            this.setState( {
                RenderedList: data
            });         
    }


    async onAssignTeamUsers( event ) {
        if( this.state.UsersToAdd.length > 0 ) {
            let pdmApi = PdmApi.getInstance();

            try {
                await pdmApi.updateProjectTeam( this.props.selectProject, this.state.UsersToAdd )
                .then((result) => {
                    if (result.status === 200) {
                        let project = pdmApi.filterData( [result.data], this.props.oUser.username, roleToString(this.props.oRol));                        this.props.dispatch( updateProject( project[0] ) );
                        this.props.dispatch( setSelectProject( project[0] ) );
                        
                        this.handleClose();
                    };
                });
            } catch (error) {
                console.log("error: " + error);
            }
        }
    }

    
    onSetUser( event, oUser ) {    
        let bIsChecked = event.target.checked;
        
        if( bIsChecked ) {
            // Add user to the list
            this.setState( {
                UsersToAdd: this.state.UsersToAdd.concat( oUser )
            }); 
        } else {
            // Remove user from the list
            this.setState( {
                UsersToAdd: this.state.UsersToAdd.filter( oSelectedItem => oSelectedItem.id === oUser.id )
            }); 
        }        
    }
    

    async onGetUsers( ) {
		let pdmApi = PdmApi.getInstance();        
		try {
            let listUsers = [];

			await pdmApi.getUsers( ).then((result) => {
				if (result.status === 200) {
                    //Filter1: Exclude ProjectLeader from list
                    let filteredUserList = result.data.filter( oCurrUser => ( oCurrUser.id !== this.props.selectProject?.projectLeader?.id ) );

                    //Filter2: Exclude Users that are already are assigned to this project
                    let filteredUserList2 = filteredUserList.filter(( oUser ) => !this.props.selectProject?.team?.find(({ id }) => oUser.id === id) );

                    if( filteredUserList2.length > 0 ) {
                        listUsers = filteredUserList2.map( oCurrUser => {                        
                            return( <ListGroup.Item key={"list-item-userid" + oCurrUser.id} >
                                        <Form.Check id={ "project-userid" + oCurrUser.id } label={oCurrUser.username} onClick={(event) => this.onSetUser(  event, oCurrUser  )}/>                                    
                                    </ListGroup.Item> )
                        })
                    } else {
                        listUsers = ( <ListGroup.Item >
                                          No suitable users found                                 
                                      </ListGroup.Item> );
                    }                 
                };
            });
            return listUsers;
		} catch (error) {
			console.log("error: " + error);
		}
    }
	

	render() {
        if( this.props.showUserModal === true ) {
            return ( 
                    
                <Modal show={this.props.showUserModal} onHide={(event) => this.handleClose(event)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Users to ProjectTeam</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Suspense fallback={<div>Loading...</div>}>
                        <ListGroup >
                            { this.state.RenderedList }
                        </ListGroup>
                    </Suspense>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="info" onClick={(event) => this.onAssignTeamUsers(event)}>
                        Add
                    </Button>
                    <Button variant="secondary" onClick={(event) => this.handleClose(event)}>
                        Cancel
                    </Button>
                </Modal.Footer>
                </Modal>
              );
        } else {
            return '';
        }        
	}
}

const mapStateToProps = (state) => {
	return {
        selectProject:          state.ui.selectProject,
        showUserModal:          state.ui.showUserModal,

        oUser:                  state.loginReducer.loggedUser,
        oRol :                  state.loginReducer.rol
	};
};

export default connect(mapStateToProps)(ModalTeamSelector);
