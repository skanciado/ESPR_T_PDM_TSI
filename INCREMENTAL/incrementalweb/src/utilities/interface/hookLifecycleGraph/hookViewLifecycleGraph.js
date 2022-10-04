import "../../../utilities/interface/css/hookViewModal.css";
import {useState, useRef, useEffect} from "react";
import CytoscapeComponent from 'react-cytoscapejs';
import cytoscape from 'cytoscape';
import klay from 'cytoscape-klay';

cytoscape.use( klay );


export default function HookViewLifecycleGraph(props) {
    const StatusChange = {
        "Undefined": 0,
        "Promote" : 1,
        "Demote" : 2
     }

    const [formState] = useState({        
        currentStateId: "",
        currentStateNodeId: "",
        currentStateNodeName: "",
        
        cyContainer: undefined,
        currentStateNode: undefined,
        listOfNodeIds: {},
        listOfNodeNames: {},
        listOfNodeNexts: {},     
        listOfNodePrevs: {}, 
        
        //bPromoteButtonEnabled: false,
        //bDemoteButtonEnabled: false,

    });
    
    const [formVisibleState, showForm] = useState({visibleForm: StatusChange.Undefined});
    const [buttonAvailabState, changeButtonAvailability] = useState({bPromoteButtonEnabled: false, bDemoteButtonEnabled: false});  

  const cyContainerRef = useRef();
  const statusSelectRef = useRef();

  useEffect(() => {
    const modalData = props.modal?.dataAndDesing;

    if( !modalData ) {
        console.log("Error retrieving Status list information")
        return ;
    }
    const aStatusArray = modalData.dialogContent;
    const sCurrentStatus = modalData.currentStatus;
    
    
    const config = {
      container: cyContainerRef.current,
      style: [
        {
          selector: "node",
          style: {  'background-color': '#BBBBBB',
                    'border-color': '#BBBBBB',
                    'border-width': 3,
                    'color': 'white',
                    'content': "data(label)" },
        },
        {
          selector: "edge",
          style: {  "curve-style": 'bezier',
                    'edge-distances': 'node-position',
                    'target-arrow-shape': 'triangle',
                    'line-color': '#0056b3',
                    'target-arrow-color': '#0056b3',
                    'opacity': 0.5 },
        },
        {
            selector: ".currentState",
            style: {  'border-color': '#F22B42' },
          },

      ],
      elements: []
    };

    let cy = cytoscape(config);
    console.log(cy);

    //Add nodes to graph,
    let iCountStatus = 0;
    let iNumStatus = aStatusArray.length;

    let oNodesIdsMap = {};
    let oNodesNamesMap = {};
    let oNodesNexts = {};
    let oNodesPrevs = {};

    //add Nodes
    for( iCountStatus = 0; iCountStatus < iNumStatus; iCountStatus++ ) {
        let elem = aStatusArray[iCountStatus];
        let elemId = elem._id;
        let elemName = elem.name;
        let nodeId = elemName.replace(" ", "_");
        
        oNodesIdsMap[elemId] = nodeId;
        oNodesNamesMap[elemId] = elemName;

        oNodesNexts[elemId] = [];
        oNodesPrevs[elemId] = [];

        cy.add({
            group: 'nodes',
            data: { id: nodeId, label: elemName, dbId: elemId  },
        });
    }

    //Add Edges
    let edgeCount = 0;
    for(iCountStatus = 0; iCountStatus < iNumStatus; iCountStatus++ ) {
        let elem = aStatusArray[iCountStatus];
        let sourceNodeId = elem._id;
        let sourceNodeGraphId = oNodesIdsMap[sourceNodeId];
        let edgeId = "edge_" + edgeCount;
        elem.nextStatusList.forEach((nextElemId, index) => {
            let targetNodeGraphId = oNodesIdsMap[nextElemId];
            oNodesNexts[sourceNodeId].push(nextElemId) ;

            cy.add({
                group: 'edges',
                data: { id: edgeId + "_next_" + index, source: sourceNodeGraphId, target: targetNodeGraphId },
            });            
        })

        elem.previousStatusList.forEach((previousElemId, index) => {
            let targetNodeGraphId = oNodesIdsMap[previousElemId];
            oNodesPrevs[sourceNodeId].push(previousElemId) ;
                     
            cy.add({
                group: 'edges',
                data: { id: edgeId + "_prev_" + index, source: sourceNodeGraphId, target: targetNodeGraphId },
            });            
        })

        edgeCount+=1;
        //if( elem )
    }


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
          fixedAlignment: 'RIGHTUP', // Tells the BK node placer to use a certain alignment instead of taking the optimal result.  This option should usually be left alone.
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
          nodePlacement:'BRANDES_KOEPF', // Strategy for Node Placement
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

    cy.on('resize', () => {
        cy.center();
        cy.fit();
    })
    
    cy.layout( klayOptions ).run();
    cy.center();
    cy.autoungrabify(true)
    cy.autolock(true);
    
    let sCurrentStatusId = oNodesIdsMap[sCurrentStatus];
    let sCurrentStatusName = oNodesNamesMap[sCurrentStatus];
    cy.$('#' + sCurrentStatusId).addClass('currentState');

    //Save current elements in store
    formState.currentStateId = sCurrentStatus;
    formState.currentStateNodeId = sCurrentStatusId;
    formState.currentStateNodeName = sCurrentStatusName;
    formState.cyContainer = cy;
    formState.currentStateNode = cy.$('#' + sCurrentStatusId);       

    formState.listOfNodeIds = oNodesIdsMap;
    formState.listOfNodeNames = oNodesNamesMap;
    formState.listOfNodeNexts = oNodesNexts;
    formState.listOfNodePrevs = oNodesPrevs;

    UpdateButtonsAvailability();
    
  }, []);

  const onPromote = (event) => {
    showForm({visibleForm: StatusChange.Promote});
  }

  const onDemote = (event) => {
    showForm({visibleForm: StatusChange.Demote});   
  }

  const onUpdateStatus = () => {
    showForm({visibleForm: StatusChange.Undefined});  
  }

  const buildSelectValues = () => {
    let sCurrStateId = formState.currentStateId;
    let aStatusList =  undefined; 
    
    // Obtener la listas de Status Siguientes o previos, según el diálogo que mostramos (Promote o Demote)
    if(formVisibleState.visibleForm === StatusChange.Promote) {
        aStatusList = formState.listOfNodeNexts[sCurrStateId];
    } else if (formVisibleState.visibleForm === StatusChange.Demote) {
        aStatusList = formState.listOfNodePrevs[sCurrStateId];
    }

    if( !aStatusList ) {
        return;
    }

    // Construir la lista de options para el desplegable
    let aOptionsList = aStatusList.map( (element, index) => {
        let sNodeName = formState.listOfNodeNames[element] 
        return (<option key={element} value={element}>
                    {sNodeName}
                </option>)
    } )
    return aOptionsList
  }

  const buildPromDemLabelText = () => {
    let sLabelText = "";

    switch (formVisibleState.visibleForm) {
        case StatusChange.Promote:
            sLabelText = "Next Status"
            break;
        case StatusChange.Demote:   
            sLabelText = "Previous Status"         
            break;        
        default:
            break;

    }
    return sLabelText;
  }
  
  const onChangeStatus = (e) => {
    // Recuperar nuevo estado seleccionado
    let oStatusSelect = statusSelectRef.current;
    let iSelectIndex = oStatusSelect.selectedIndex;

    var sNewCurrStatusId = oStatusSelect.options[iSelectIndex]?.value;
    if( !sNewCurrStatusId ) {
        return;
    }

    let oNodesIdsMap = formState.listOfNodeIds;
    let oNodesNamesMap = formState.listOfNodeNames;

    let oNewCurrStatusNodeId =  oNodesIdsMap[sNewCurrStatusId];
    let oNewCurrStatusNodeName =  oNodesNamesMap[sNewCurrStatusId];

    // Eliminar borde rojo en graph del estado seleccionado anterior
    let cyContainer = formState.cyContainer;
    let oOldCurrStatusNodeId = formState.currentStateNodeId;
    //let oOldCurrStatusNodeName = formState.currentStateNodeName;

    cyContainer.$('#' + oOldCurrStatusNodeId).removeClass('currentState');   

    // Añadir  borde rojo en graph del estado seleccionado actual
    cyContainer.$('#' + oNewCurrStatusNodeId).addClass('currentState');   
    
    //var text = oStatusSelect.options[iSelectIndex].text;
    console.log(sNewCurrStatusId);

    // Actualizar estado actual
    formState.currentStateId = sNewCurrStatusId;
    formState.currentStateNodeId = oNewCurrStatusNodeId;
    formState.currentStateNodeName = oNewCurrStatusNodeName;
    formState.currentStateNode = cyContainer.$('#' + oNewCurrStatusNodeId);
      
    onUpdateStatus();
    UpdateButtonsAvailability();       
  }

  const UpdateButtonsAvailability = () => {
    let sCurrStatusId = formState.currentStateId;
    let iCurrStatusNextCount = formState.listOfNodeNexts[sCurrStatusId].length
    let iCurrStatusPrevCount = formState.listOfNodePrevs[sCurrStatusId].length

    let bPromAvailable = ( iCurrStatusNextCount > 0 );
    let bDemAvailable  = ( iCurrStatusPrevCount > 0 );

    if(bPromAvailable && bDemAvailable) {
      changeButtonAvailability({bPromoteButtonEnabled: true, bDemoteButtonEnabled: true});
    } else {
      if(bPromAvailable) {
        changeButtonAvailability({bPromoteButtonEnabled: true, bDemoteButtonEnabled: false});
      } else if(bDemAvailable) {
        changeButtonAvailability({bPromoteButtonEnabled: false, bDemoteButtonEnabled: true});
      } else {
        changeButtonAvailability({bPromoteButtonEnabled: false, bDemoteButtonEnabled: false});
      }
    }
  }


  return (
    <div className="modalBackground-bur" style={{zIndex: 25}}>
      <div className="modalContainer-graph">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              props.setModal({openModal: false, valuesModal: undefined});
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          <h3>{props.lblTitle}</h3>
        </div>
        <div className="body">
            <div ref={cyContainerRef} style={{ height: "45vh",  paddingRight: "25px", paddingLeft: "25px"}} />
        </div>
        <div className="flex flex-row mb-1">
            <button className="w-50 first-button" id="promoteButton" disabled={buttonAvailabState.bPromoteButtonEnabled ? "": "disabled"}  onClick={(event) => onPromote(event)}>
                Promote
            </button>
            <button className="w-50 last-button" id="demoteButton"  disabled={buttonAvailabState.bDemoteButtonEnabled ? "": "disabled"} onClick={(event) => onDemote(event)}>
                Demote
            </button>
                    
            </div>
                
            <div id="promote-demote-div" className="flex flex-row promote-demote-form  mb-1">  
                { (formVisibleState.visibleForm !== StatusChange.Undefined) && 
                    <>
                        <label htmlFor="prom-demo-status-label" className="w-25 px-3">{buildPromDemLabelText() }</label>
                        <select ref={statusSelectRef} id="role" name="role" className="w-50 px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 appearance-none rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm">
                            {buildSelectValues()}
                        </select>

                        <button className="w-25 last-button-with-left-margin px-3" onClick={(event) => onChangeStatus(event)}>Apply change</button>
                    </>
                }         
            </div> 
        <div className="footer">
          {props.twoButtons === true && (
            <button
              onClick={() => {
                props.setModal({openModal: false, valuesModal: undefined});
              }}
            >
              {props.lblCancel}
            </button>
          )}
          <button
            id="modalOK"
            onClick={() => {
              //props.setModal({...props.modal, openModal: false, valuesModal: undefined});
              //const table = document.getElementById("searcherTable");
              //if (table !== undefined) {
                //const selectedRow = table.getElementsByClassName("selected");
                //if (selectedRow.length > 0) {
                  let jsonRow = {};

                  // Recuperar nuevo estado seleccionado
                  let sSelectedNodeName = formState.currentStateNodeName;


                  //for (let cell of selectedRow[0].cells) {
                    const key = props.modal.attributes.cellForm;
                     const val = sSelectedNodeName;
                    jsonRow[key] = val;
                  //}
                  //si el formulario esta desarrollado con el HookViewForm el formulario no tendra un useState y los valores se leeran desde los controles.
                  props.setModal({...props.modal, openModal: false, valuesModal: jsonRow});
                }
              }
            //}}
          >
            {props.lblOk}
          </button>
        </div>
      </div>
    </div>
  );
}
