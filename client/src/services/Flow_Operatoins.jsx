import axios from 'axios';

const BackendURL = 'http://localhost:3000'; 

export const createWorkflow = async (name,nodes,transitions) => {
  try {

    const formdata = new FormData();
    formdata.append('nodes', JSON.stringify(nodes));
    formdata.append('transitions', JSON.stringify(transitions));
    formdata.append('name', name);

    const response = await axios.post(`${BackendURL}/workflow`, formdata);
    console.log('Workflow created successfully:', response.data);

    alert('Workflow created successfully');
  } catch (error) {
    console.error('Error creating workflow:', error);
    throw error;
  }
}

export const getWorkflows = async (id) => {
  try {
    const response = await axios.get(`${BackendURL}/workflow/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching workflows:', error);
    throw error;
  }
}
