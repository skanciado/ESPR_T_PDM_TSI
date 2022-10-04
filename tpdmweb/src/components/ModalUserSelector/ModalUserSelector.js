import React from "react";
import { connect } from "react-redux";

import { Suspense } from 'react';
import { ListGroup, Modal, Button } from "react-bootstrap";

import { setWorkflowUser, setShowUserModal } from '../../stores/ui/uiActions';

import PdmApi from '../../services/api/PdmApi/PdmApi';

import "./ModalUserSelector.css";

class ModalUserSelector extends React.Component {

	constructor(props) {
		super(props);
        this.state = {
            RenderedList: []
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

    onSetUser( event, oUser ) {
        //this.leaderEditorRef.current.value = oUser.username;
        this.props.dispatch( setWorkflowUser( oUser ) );
        this.props.dispatch( setShowUserModal( false ) );

    }
    

    async onGetUsers( ) {
		let pdmApi = PdmApi.getInstance();
        
		try {
            let listUsers = [];
            //let iOptCount = 0;

			await pdmApi.getUsers( ).then((result) => {
				if (result.status === 200) { 
       
                    listUsers = result.data.map( oCurrUser => {  

                        return( <ListGroup.Item action onClick={(event) => this.onSetUser(  event, oCurrUser  )}>
                                    {oCurrUser.username}
                                </ListGroup.Item> )
                    })

                    //this.props.dispatch( setProjectLeader( iDefaultOption ) );                    
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
                    <Modal.Title>Users</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Suspense fallback={<div>Loading...</div>}>
                        <ListGroup >
                            { this.state.RenderedList }
                        </ListGroup>
                    </Suspense>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={(event) => this.handleClose(event)}>
                    Close
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
		// ...state,
		// loggedUser: state.loggedUser,
		// isUserLogged: state.isUserLogged,
		// redirectToReferrer: state.redirectToReferrer,
		// loginFailed: state.loginFailed,
        showUserModal: state.ui.showUserModal
	};
};

export default connect(mapStateToProps)(ModalUserSelector);
