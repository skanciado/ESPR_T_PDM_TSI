import React from "react";
import { connect } from "react-redux";

import { Suspense } from 'react';
import { ListGroup, Modal, Button, Form, Dropdown, DropdownButton, ButtonGroup } from "react-bootstrap";
import { updateProject } from "../../stores/datas/datasAction";
import { updateDocument } from "../../stores/datas/datasAction";

import { roleToString } from "../../helpers/utils"

import { setSelectProject, setSelectLCStage, 
         setShowLifecycleModal, setShowLifecyclePromote, 
         setShowLifecycleDemote, setSelectFolder, setSelectDocument } from '../../stores/ui/uiActions';

import PdmApi from '../../services/api/PdmApi/PdmApi';

import CytoscapeComponent from 'react-cytoscapejs';
import cytoscape from 'cytoscape';
//import $ from 'jquery';
import klay from 'cytoscape-klay';
import avsdf from 'cytoscape-avsdf';





import "./ModalLifecycleViewer.css";


cytoscape.use( klay );
cytoscape.use( avsdf );


class ModalLifecycleViewer extends React.Component {

	constructor(props) {
		super(props);

        // Read input parameters
        //   dataSource: Object containing a lifecycle
        //   dataSource: Type of dataSource ( "Project" or "Document" )

        this.selectObjectData = this.props.dataSource;
        this.selectObjectType = this.props.sourceType;


        this.cyContainer = undefined;
        this.cyObject = undefined;

        this.InitCyObject = this.InitCyObject.bind(this);
        this.loadDefaultConfig = this.loadDefaultConfig.bind(this);

        this.onPromote = this.onPromote.bind(this);
        this.onDemote = this.onDemote.bind(this);

        this.highlightedNode = null;

        this.onSelectLifecycleStage = this.onSelectLifecycleStage.bind(this);
        this.selectedLifecycleStage  = this.selectedLifecycleStage.bind(this);

        this.onApplyProjectStatus = this.onApplyProjectStatus.bind(this);
        this.buildGraphElements = this.buildGraphElements.bind(this);
        
        this.bidirectionalEdges = [];
        this.dummyElements = this.buildGraphElements(); 
        
    }


    InitCyObject(cy) {
        if (this.cyObject === undefined) {
            this.cyObject = this.loadDefaultConfig(cy);

            if (this.dummyElements.length > 0) {
                 cy.ready( this.selectCurrentState( cy ) );
             }
        }
        return this.cyObject;
    }


    loadDefaultConfig(cy) {        
        cy.style(cytoscape.stylesheet() 
            .selector('node')
            .css( {
                'background-color': '#BBBBBB',
                'border-color': '#BBBBBB',
                'border-width': 3,
            })
            .selector('node[label]')
             .css({
                 'label': 'data(label)',
             })
            .selector('edge')
            .css({
                'curve-style': 'bezier',
                'edge-distances': 'node-position',
                'target-arrow-shape': 'triangle',
                'line-color': '#0056b3',
                'target-arrow-color': '#0056b3',
                'opacity': 0.5
            })
            .selector('.bidirectional-edge')
            .css({
                'source-arrow-shape': 'triangle',
                'source-arrow-color': '#0056b3',
            })
            .selector('.currentState')
            .css({
                'border-color': '#F22B42',
                // 'z-index': 4
            })
        );

        

        var klayOptions = {
            name: 'klay',
            nodeDimensionsIncludeLabels: true, // Boolean which changes whether label dimensions are included when calculating node dimensions
            fit: true, // Whether to fit
            padding: 30, // Padding on fit
            animate: false, // Whether to transition the node positions
            animateFilter: function( node, i ){ return true; }, // Whether to animate specific nodes when animation is on; non-animated nodes immediately go to their final positions
            animationDuration: 500, // Duration of animation in ms if enabled
            animationEasing: undefined, // Easing of animation if enabled
            transform: function( node, pos ){ return pos; }, // A function that applies a transform to the final node position
            ready: undefined, // Callback on layoutready
            stop: undefined, // Callback on layoutstop
            avoidOverlap: true, // prevents node overlap, may overflow boundingBox if not enough space
            avoidOverlapPadding: 30, // extra spacing around nodes when avoidOverlap: true
            boundingBox: { x1: 10, y1: 0, w: cy.width(), h: cy.height()},
            klay: {
              // Following descriptions taken from http://layout.rtsys.informatik.uni-kiel.de:9444/Providedlayout.html?algorithm=de.cau.cs.kieler.klay.layered
              addUnnecessaryBendpoints: true, // Adds bend points even if an edge does not change direction.
              aspectRatio: 1, // The aimed aspect ratio of the drawing, that is the quotient of width by height
              borderSpacing: 30, // Minimal amount of space to be left to the border
              compactComponents: true, // Tries to further compact components (disconnected sub-graphs).
              crossingMinimization: 'LAYER_SWEEP', // Strategy for crossing minimization.
              /* LAYER_SWEEP The layer sweep algorithm iterates multiple times over the layers, trying to find node orderings that minimize the number of crossings. The algorithm uses randomization to increase the odds of finding a good result. To improve its results, consider increasing the Thoroughness option, which influences the number of iterations done. The Randomization seed also influences results.
              INTERACTIVE Orders the nodes of each layer by comparing their positions before the layout algorithm was started. The idea is that the relative order of nodes as it was before layout was applied is not changed. This of course requires valid positions for all nodes to have been set on the input graph before calling the layout algorithm. The interactive layer sweep algorithm uses the Interactive Reference Point option to determine which reference point of nodes are used to compare positions. */
              cycleBreaking: 'GREEDY', // Strategy for cycle breaking. Cycle breaking looks for cycles in the graph and determines which edges to reverse to break the cycles. Reversed edges will end up pointing to the opposite direction of regular edges (that is, reversed edges will point left if edges usually point right).
              /* GREEDY This algorithm reverses edges greedily. The algorithm tries to avoid edges that have the Priority property set.
              INTERACTIVE The interactive algorithm tries to reverse edges that already pointed leftwards in the input graph. This requires node and port coordinates to have been set to sensible values.*/
              direction: 'UNDEFINED', // Overall direction of edges: horizontal (right / left) or vertical (down / up)
              /* UNDEFINED, RIGHT, LEFT, DOWN, UP */
              edgeRouting: 'SPLINES', // Defines how edges are routed (POLYLINE, ORTHOGONAL, SPLINES)
              edgeSpacingFactor: 1.2, // Factor by which the object spacing is multiplied to arrive at the minimal spacing between edges.
              feedbackEdges: false, // Whether feedback edges should be highlighted by routing around the nodes.
              fixedAlignment: 'NONE', // Tells the BK node placer to use a certain alignment instead of taking the optimal result.  This option should usually be left alone.
              /* NONE Chooses the smallest layout from the four possible candidates.
              LEFTUP Chooses the left-up candidate from the four possible candidates.
              RIGHTUP Chooses the right-up candidate from the four possible candidates.
              LEFTDOWN Chooses the left-down candidate from the four possible candidates.
              RIGHTDOWN Chooses the right-down candidate from the four possible candidates.
              BALANCED Creates a balanced layout from the four possible candidates. */
              inLayerSpacingFactor: 3, // Factor by which the usual spacing is multiplied to determine the in-layer spacing between objects.
              layoutHierarchy: false, // Whether the selected layouter should consider the full hierarchy
              linearSegmentsDeflectionDampening: 1.23, // Dampens the movement of nodes to keep the diagram from getting too large.
              mergeEdges: false, // Edges that have no ports are merged so they touch the connected nodes at the same points.
              mergeHierarchyCrossingEdges: true, // If hierarchical layout is active, hierarchy-crossing edges use as few hierarchical ports as possible.
              nodeLayering:'NETWORK_SIMPLEX', // Strategy for node layering.
              /* NETWORK_SIMPLEX This algorithm tries to minimize the length of edges. This is the most computationally intensive algorithm. The number of iterations after which it aborts if it hasn't found a result yet can be set with the Maximal Iterations option.
              LONGEST_PATH A very simple algorithm that distributes nodes along their longest path to a sink node.
              INTERACTIVE Distributes the nodes into layers by comparing their positions before the layout algorithm was started. The idea is that the relative horizontal order of nodes as it was before layout was applied is not changed. This of course requires valid positions for all nodes to have been set on the input graph before calling the layout algorithm. The interactive node layering algorithm uses the Interactive Reference Point option to determine which reference point of nodes are used to compare positions. */
              nodePlacement:'LINEAR_SEGMENTS', // Strategy for Node Placement
              /* BRANDES_KOEPF Minimizes the number of edge bends at the expense of diagram size: diagrams drawn with this algorithm are usually higher than diagrams drawn with other algorithms.
              LINEAR_SEGMENTS Computes a balanced placement.
              INTERACTIVE Tries to keep the preset y coordinates of nodes from the original layout. For dummy nodes, a guess is made to infer their coordinates. Requires the other interactive phase implementations to have run as well.
              SIMPLE Minimizes the area at the expense of... well, pretty much everything else. */
              randomizationSeed: 2342, // Seed used for pseudo-random number generators to control the layout algorithm; 0 means a new seed is generated
              routeSelfLoopInside: false, // Whether a self-loop is routed around or inside its node.
              separateConnectedComponents: false, // Whether each connected component should be processed separately
              spacing: 12, // Overall setting for the minimal amount of space to be left between objects
              thoroughness: 50 // How much effort should be spent to produce a nice layout..
            },
            priority: function( edge ){ return null; }, // Edges with a non-nil value are skipped when greedy edge cycle breaking is enabled
        };


        cy.layout( klayOptions ).run();
        cy.autoungrabify(true)
        cy.autolock(true);
        
        
        //Save cy Container
        this.cyContainer = cy;

        // Add support for Contectual Menus
        //var instance = cy.contextMenus(options);

        return this.cyContainer;
    }

    handleClose( event ) {
        this.props.dispatch( setShowLifecycleModal( false ) );
        this.props.dispatch( setShowLifecyclePromote(false) );
        this.props.dispatch( setShowLifecycleDemote(false) );
        this.props.dispatch( setSelectLCStage(null) );
    }

    cleanForm(  ) {
        this.props.dispatch( setShowLifecyclePromote(false) );
        this.props.dispatch( setShowLifecycleDemote(false) );
        this.props.dispatch( setSelectLCStage(null) );
        this.selectCurrentState(  );
    }
    
    buildGraphElements()
    {
        const aLifecycle = this.selectObjectData.lifecycle.lifecycle;

        // Build Nodes
        let aElements = aLifecycle.map( oCurrentNode => {
            let oDataObj = {};
            oDataObj['id'] = oCurrentNode.state.name;
            oDataObj['label'] = oCurrentNode.state.name;

            return ( { data: oDataObj } );
        } )

        // Build Edges

        let iTransitionCount = 0;
        let aEdges = []
        aLifecycle.forEach( oCurrentNode => {
            oCurrentNode.children.forEach( oCurrChildren => {
                iTransitionCount += 1;

                let oDataCont = {};                
                oDataCont['id'] = "Transition" + iTransitionCount;
                oDataCont['source'] = oCurrentNode.state.name;
                oDataCont['target'] = oCurrChildren.name;

                // Check if edge should be bidirectional
                const oFoundEdge = aEdges.find( oStoredEdge => 
                        ( oStoredEdge.data.source === oDataCont.target ) && 
                        ( oStoredEdge.data.target === oDataCont.source ) 
                    );
                
                const bCond1 = ( oFoundEdge !== null );
                const bCond2 = ( oFoundEdge !== undefined );

                if( bCond1 && bCond2 ) {
                    this.bidirectionalEdges.push( oFoundEdge.data.id );
                } else {
                    let oDataObj = {}
                    oDataObj['data'] = oDataCont;
                    aEdges.push( oDataObj );
                }                
            } )          
        } )

        return aElements.concat( aEdges );
    }


    selectCurrentState( cy ) {
        if( this.highlightedNode !== null ) {
            this.highlightedNode.toggleClass("currentState", false);
            this.highlightedNode = null;
        }

        //Apply bidirectional edges style
        this.bidirectionalEdges.forEach( oBidirecEdge => {
            const oGraphEdge = this.cyContainer.getElementById( oBidirecEdge ); 
            oGraphEdge.toggleClass("bidirectional-edge", true);
        } );        

        let oCurrentState = this.selectObjectData?.status;
        const bCond1 = ( oCurrentState !== null );
        const bCond2 = ( oCurrentState !== undefined );

        if( bCond1 && bCond2 ) {
            let oCurrentStateElement = this.cyContainer.getElementById( oCurrentState.name ); 

            const bCond3 = ( oCurrentStateElement !== null );
            const bCond4 = ( oCurrentStateElement !== undefined );
            if( bCond3 && bCond4 ) {
                oCurrentStateElement.toggleClass("currentState", true);
                this.highlightedNode = oCurrentStateElement;
            }
        }
    }

    onPromote() {
        this.props.dispatch( setShowLifecycleDemote(false) );
        this.props.dispatch( setShowLifecyclePromote(true) );
        this.selectValue('P');
    }
    
    onDemote() {
        this.props.dispatch( setShowLifecyclePromote(false) );
        this.props.dispatch( setShowLifecycleDemote(true) );
        this.selectValue('D');
    }

    selectValue(event){
        let oCurrentState = this.selectObjectData?.status;
        const bCond1 = ( oCurrentState !== null );
        const bCond2 = ( oCurrentState !== undefined );
        if( bCond1 && bCond2 ) {
            let oCurrentStateElement = this.cyContainer.getElementById( oCurrentState.name ); 
            const bCond3 = ( oCurrentStateElement !== null );
            const bCond4 = ( oCurrentStateElement !== undefined );
            if( bCond3 && bCond4 ) {
                //oCurrentStateElement.toggleClass("currentState", true);
                //this.highlightedNode = oCurrentStateElement;
                const oSelProjectLifecycle = this.selectObjectData.lifecycle;
                let oCurrLifecycleStage = oSelProjectLifecycle.lifecycle?.find( oStage => ( oStage.id === oCurrentState.id) );
                if (event == 'D')
                {
                    this.props.dispatch( setSelectLCStage( oCurrLifecycleStage.parents[0] ) );
                }
                else{
                    this.props.dispatch( setSelectLCStage( oCurrLifecycleStage.children[0] ) );        
                }
            }
        }
    }

    async onApplyProjectStatus()
    {
        const oCond1 = ( this.props.selectLCStage !== null );
        const oCond2 = ( this.props.selectLCStage !== undefined );

        if( oCond1 && oCond2 ) {
            let pdmApi = PdmApi.getInstance();

            switch( this.selectObjectType ) {
                case "Project":
                    try {
                        await pdmApi.updateProjectStatus( this.props.selectProject, this.props.selectLCStage ,this.props.showLifecyclePromote )
                        .then((result) => {
                            if (result.status === 200) {
                                this.selectObjectData = result.data;
                                const oUpdatedProject =  pdmApi.filterData([result.data],  this.props.loggedUser.username, roleToString(this.props.rol));
                                this.props.dispatch( updateProject( oUpdatedProject[0] ) );
                                this.props.dispatch( setSelectProject( oUpdatedProject[0] ) );
                                
                                this.cleanForm();
                            };
                        });
                    } catch (error) {
                        console.log("error: " + error);
                    }
                    break;
                case "Document":
                    try {
                        await pdmApi.updateDocumentStatus( this.props.selectDocument, this.props.selectLCStage )
                        .then((result) => {
                            if (result.status === 200) {
                                let oUpdatedDocument = result.data;
                                this.props.dispatch( updateDocument( oUpdatedDocument, this.props.selectProject, this.props.selectFolder  ) );
                                this.props.dispatch( setSelectDocument( oUpdatedDocument ) );                                
                                
                                this.cleanForm();
                            };
                        });
                    } catch (error) {
                        console.log("error: " + error);
                    }
                    break;
                default:
                    break;
            }
            
        }
    }

 
    onSelectLifecycleStage( event, eventKey, oStage )
    {
        this.props.dispatch( setSelectLCStage( oStage ) );
    }

    
    selectedLifecycleStage() 
    {
        const bCond1 = ( this.props.selectLCStage !== null );
        const bCond2 = ( this.props.selectLCStage !== undefined );

        if( bCond1 && bCond2 ) {
            return this.props.selectLCStage.name;
        } else {
            return "Select state...";
        }
    }

    mountPromoteForm() {
        if( this.props.showLifecyclePromote ) {
            const oSelProjectStatus =    this.selectObjectData.status;
            const oSelProjectLifecycle = this.selectObjectData.lifecycle;


            const bCond1 = ( oSelProjectLifecycle !== null );
            const bCond2 = ( oSelProjectLifecycle !== undefined );

            if( bCond1 &&  bCond2) {
                let oCurrLifecycleStage = oSelProjectLifecycle.lifecycle?.find( oStage => ( oStage.id === oSelProjectStatus.id) );

                return ( <div className="container bordered-promote-form">
                            <div className="row">
                                <Form.Label inline="true" key="idProjectID" className="my-0" column >
                                        Move to the next State:
                                </Form.Label>

                                <DropdownButton inline="true"                          
                                    id={`dropdown-button-drop`}
                                    className="mx-2"
                                    variant="outline-dark"
                                    title={this.selectedLifecycleStage()}
                                >
                                    { oCurrLifecycleStage.children.map( oStage => {
                                        return ( <Dropdown.Item key={ "lifecycle-children-stage-" + oStage.id  } 
                                                                eventKey={ "lifecycle-parent-stage-" + oStage.id  } 
                                                                onSelect={(eventKey, event) => this.onSelectLifecycleStage( event, eventKey, oStage )} > 
                                                    { oStage.name }   
                                                </Dropdown.Item>)
                                    } ) }
                                </DropdownButton>                            
                                <Button inline="true" className="mx-2" variant="info" onClick={(event) => this.onApplyProjectStatus(event)}>
                                    Apply
                                </Button>
                            </div>
                            
                        </div>    );
            } else {
                console.log( "No lifecycle assigned to project!" )
                return null;
            }
        } else {
            return null;
        }        
    }


    mountDemoteForm() {
        if( this.props.showLifecycleDemote ) {
            const oSelProjectStatus =    this.selectObjectData.status;
            const oSelProjectLifecycle = this.selectObjectData.lifecycle;

            const bCond1 = ( oSelProjectLifecycle !== null );
            const bCond2 = ( oSelProjectLifecycle !== undefined );

            if( bCond1 &&  bCond2) {
                let oCurrLifecycleStage = oSelProjectLifecycle.lifecycle.find( oStage => ( oStage.id === oSelProjectStatus.id) );

                return ( <div className="container bordered-demote-form">
                            <div className="row">
                                <Form.Label inline="true" key="idProjectID" className="my-0" column >
                                        Move to a previous State:
                                </Form.Label>

                                <DropdownButton inline="true"                          
                                    id={`dropdown-button-drop`}
                                    className="mx-2"
                                    variant="outline-dark"
                                    title={this.selectedLifecycleStage()}
                                >
                                    { oCurrLifecycleStage.parents.map( oStage => {
                                        return ( <Dropdown.Item key={ "lifecycle-parent-stage-" + oStage.id  }
                                                                eventKey={ "lifecycle-parent-stage-" + oStage.id  } 
                                                                onSelect={(eventKey, event) => this.onSelectLifecycleStage( event, eventKey, oStage )} > 
                                                    { oStage.name }   
                                                </Dropdown.Item>)
                                    } ) }
                                </DropdownButton> 
                                <Button inline="true" className="mx-2" variant="warning" onClick={(event) => this.onApplyProjectStatus(event)}>
                                    Apply
                                </Button>
                            </div>
                            
                        </div>    );
            } else {
                console.log( "No lifecycle assigned to project!" )
                return null;
            }
        } else {
            return null;
        }        
    }
   
	

    buildLifecycleManagementSection()
    {
        
        let bIsUserAbleToChangeStatus = false;
        
        if( this.selectObjectType === "Project" ){
            
            // Check if logged user is the same as the Project Leader
            const oPLUser = this.selectObjectData?.projectLeader;        

            const bCond1 = ( oPLUser !== null );
            const bCond2 = ( oPLUser !== undefined );

            if( bCond1 && bCond2 ) {
                if( oPLUser.id === this.props.loggedUser.id ) {
                    bIsUserAbleToChangeStatus = true;
                }
            }
        } else {
            bIsUserAbleToChangeStatus = true;
        }

        if( bIsUserAbleToChangeStatus ) {
            return (    <>
                            <div className="row mb-1">
                                <ButtonGroup className="w-100" aria-label="lifecycle-managenent-buttons">
                                    <Button className="w-50" id="promoteButton" variant="info" onClick={(event) => this.onPromote(event)}>
                                        Promote
                                    </Button>
                                    <Button className="w-50" id="demoteButton"  variant="warning" onClick={(event) => this.onDemote(event)}>
                                        Demote
                                    </Button>
                                </ButtonGroup>
                                    
                            </div>
                                
                            <div className="row mb-1">  
                                {this.mountPromoteForm()}
                                {this.mountDemoteForm()}
                            </div> 
                        </>
                    )
        } else {
            return null;
        }
        
    }

	render() {
        if( this.props.showLifecycleModal === true ) {            
            return ( 
      
                    <Modal show={this.props.showLifecycleModal}  backdrop="static" onHide={(event) => this.handleClose(event)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Project Lifecycle</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Suspense fallback={<div>Loading...</div>}>  
                            <div className="container-fluid w-100">
                                   
                                <div className="row mb-3">                                     
                                    <CytoscapeComponent cy={(cy) => this.InitCyObject(cy)} pan={ { x: 4, y: 50 } }
                                                        elements={this.dummyElements} style={   {  width: '100%', height: '300px',
                                                                                                border: '1px solid gray',
                                                                                                borderRadius: '5px' }}
                                                                                                wheelSensitivity={0.1} />          
                                </div> 
                                { this.buildLifecycleManagementSection() }
                                {/*<div className="row mb-1">
                                <ButtonGroup className="w-100" aria-label="lifecycle-managenent-buttons">
                                    <Button className="w-50" id="promoteButton" variant="info" onClick={(event) => this.onPromote(event)}>
                                        Promote
                                    </Button>
                                    <Button className="w-50" id="demoteButton"  variant="warning" onClick={(event) => this.onDemote(event)}>
                                        Demote
                                    </Button>
                                </ButtonGroup>
                                    
                                </div>
                                
                                <div className="row mb-1">  
                                    {this.mountPromoteForm()}
                                    {this.mountDemoteForm()}
                                </div>  */}
                            </div>
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
        selectProject:        state.ui.selectProject,
        selectLCStage:        state.ui.selectLCStage,
        showLifecycleModal:   state.ui.showLifecycleModal,
        showLifecyclePromote: state.ui.showLifecyclePromote,
        showLifecycleDemote:  state.ui.showLifecycleDemote,
        selectFolder:         state.ui.selectFolder,
        selectDocument:       state.ui.selectDocument,

        loggedUser:           state.loginReducer.loggedUser,
        rol :                 state.loginReducer.rol
	};
};

export default connect(mapStateToProps)(ModalLifecycleViewer);
