import WorkflowModel from "../db/workflow";
import r_client from "../redis/redis_client";

export const createWorkflow = async (bodydata: any) => {
  try {
    const Nodes = JSON.parse(bodydata.nodes);
    const Transitions = JSON.parse(bodydata.transitions);

    bodydata.nodes = Nodes;
    bodydata.transitions = Transitions;

    const workflow = new WorkflowModel(bodydata);

    const savedWorkflow = await workflow.save();

    return savedWorkflow;
  } catch (error) {
    console.error("Error creating workflow:", error);
    throw new Error("Failed to create workflow");
  }
};

export const getworkflowById = async (id: string) => {
  try {
    const redisKey = `workflow:${id}`;

    const cached = await r_client.get(redisKey);

    if (cached) {
      console.log("Cache hit for workflow:", id);
      return JSON.parse(cached);
    }
    const workflow = await WorkflowModel.findById(id);

    if (!workflow) {
      return null;
    }
    await r_client.setEx(redisKey, 3600, JSON.stringify(workflow));

    return workflow;
  } catch (error) {
    console.error("Error fetching workflow:", error);
    throw new Error("Failed to fetch workflow");
  }
};
