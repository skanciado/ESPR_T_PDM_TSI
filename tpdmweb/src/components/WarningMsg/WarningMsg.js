import React from 'react';
import { Button, Modal } from 'react-bootstrap';

/**Creates & Draws warning message when user want to clear & import Layout.
 * Called in VerticalNav.js
 */
export class WarningMsg extends React.Component {

    /**
     * @constructor
     * @param {*} props - Properties
     */
    constructor(props) {
        super( props );

        this.onCloseFunction   = this.props.closeFunction;
        this.onProceedFunction = this.props.proceedFunction;

        this.modalTitle           = this.props.titleText;
        this.modalBody            = this.props.bodyText;
        this.modalCloseButtonText = this.props.closeText;
        this.modalOKButtonText    = this.props.okText;
        this.dataSource           = this.props.dataSource;
    }
    /**
     * 
     * @returns Elements to draw
     */
    render() {            
        let renderClose = null;
        if( this.props.closeText?.length > 0){
            renderClose = <Button variant="secondary" onClick={ this.onCloseFunction}>
                    {this.props.closeText}
                    </Button>
        }
        return (           
                <Modal
                show={this.props.show}
                onHide={this.onCloseFunction}
                backdrop="static"
                keyboard={false}
                animation={true}
                >
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.titleText}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.props.bodyText}
                </Modal.Body>
                <Modal.Footer>
                    
                    {renderClose}
                    
                    <Button variant="primary" onClick={ ()=> { this.props.proceedFunction(this.props.dataSource)}}>
                    {this.modalOKButtonText}
                    </Button>
                </Modal.Footer>
                </Modal>      
        );
    }
}