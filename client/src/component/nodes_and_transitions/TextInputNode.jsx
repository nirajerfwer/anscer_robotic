// TextInputNode.jsx
import React from 'react';
import { Handle, Position } from 'reactflow';

const TextInputNode = ({ data, id }) => {
  console.log("TextInputNode Rendered", data);
  return (
    <div style={{ padding: 10, border: '1px solid #888', borderRadius: 8, background: 'white' }}>
      <input
        type="text"
        value={data.label}
        disabled={data.isactive}
        onChange={(e) => data.onChange(id, e.target.value)}
        style={{ width: '150px', padding: '4px' }}
      />
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
};

export default TextInputNode;
