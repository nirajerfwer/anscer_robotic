// FlowCanvas.jsx
import React, {useCallback, useEffect } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import 'reactflow/dist/style.css';
import TextInputNode from './textinputnode';
import { createWorkflow, getWorkflows } from '../../services/Flow_Operatoins';
import { useParams } from 'react-router-dom';

const nodeTypes = {
  textInput: TextInputNode,
};

let inputstate = false;


const initialNodes = [
  {
    id: '1',
    type: 'textInput',
    data: { label: '', isactive: inputstate },
    position: { x: 100, y: 100 },
  },
  {
    id: '2',
    type: 'textInput',
    data: { label: '', isactive: inputstate },
    position: { x: 400, y: 100 },
  },
];

const initialEdges = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    type: 'default',
  },
];


const FlowCanvas = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const [workflowname, setWorkflowName] = React.useState('');
  const { id } = useParams();

  console.log("Workflow ID:", id);


  // Handle input change for text nodes
  // This function updates the label of a node when the input changes
  const handleInputChange = useCallback((id, newLabel) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id
          ? {
            ...node,
            data: {
              ...node.data,
              label: newLabel,
              onChange: handleInputChange
            },
          }
          : node
      )
    );
  }, [setNodes]);


  //will check the routing id and fetch the workflow data if it exists
  useEffect(() => {
    if (id) {
      getWorkflows(id)
        .then((data) => {
          console.log("Fetched workflow data:", data);
          setWorkflowName(data.data.name);
           console.log("data.data.nodes:", data.data.nodes);
          const updatedNodes = data.data.nodes.map((n) => ({
            id: (n.id).toString(),
            type: 'textInput',
            data: {
              label: n.name,
              isactive: true,
            },
            test:n.name,
            position: n.position[0],
            
          }));
          setNodes(updatedNodes);

          const updatedEdges = data.data.transitions.map((t) => ({
            id: `e${t.from}-${t.to}`,
            source: t.from.toString(),
            target: t.to.toString(),
            type: 'default',
          }));

          setEdges(updatedEdges);
          
        })
        .catch((error) => {
          console.error("Error fetching workflow:", error);
        });
        inputstate = true;
    } else {
      inputstate = false;
    }
  }, [id]);

  // Set up nodes with handlers and input state
  // This will ensure that the nodes have the correct onChange handler and input state
  const setupNodesWithHandlers = nodes.map((node) => ({
    ...node,
    data: {
      ...node.data,
      onChange: handleInputChange,
      isactive: inputstate, // Set isactive based on inputstate
    },
  }));

  const CreateWorkFlow = () => {
    const mynode = [];
    const transition = [];
    nodes.forEach(element => {
      mynode.push({ id: element.id, name: element.data.label, position: { x: element.position.x, y: element.position.y } });
    });

    edges.forEach(element => {
      transition.push({ from: element.source, to: element.target });
    })
    const isnodeEmpty = mynode.some(node => node.name === '');

    if (isnodeEmpty == true) {
      alert("Please enter a node name");
      return;
    }
    else if (workflowname == '') {
      alert("Please enter a workflow name");
      return;
    }
    createWorkflow(workflowname, mynode, transition);
  };

  return (
    <>
      <div className="workflow-wrapper">
        <div style={{ height: '400px', width: '80vw' }}>
          <ReactFlow
            nodes={setupNodesWithHandlers}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            nodeTypes={nodeTypes}
            onConnect={(params) => setEdges((eds) => addEdge(params, eds))}
            fitView
          >
            <MiniMap />
            <Controls />
            <Background />
          </ReactFlow>
        </div>
        <div className="input-group">
          <input type="text"
            placeholder="Enter workflow name"
            disabled={inputstate}
            value={workflowname || ''}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              marginBottom: '10px',
            }}
            onChange={(e) => {
              // Handle workflow name input change if needed
              setWorkflowName(e.target.value);
            }}>
          </input>
          {!inputstate && (
          <div style={{ textAlign: 'center', marginBottom: '10px' }}>
            <button
              onClick={CreateWorkFlow}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: '1px solid #333',
                background: '#4CAF50',
                color: 'white',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              Create Work Flow
            </button>
          </div>
        )}
        </div>
      </div>
    </>
  );
};

export default FlowCanvas;
