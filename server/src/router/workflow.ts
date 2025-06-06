import { Hono } from "hono";

import { createWorkflow, getworkflowById } from "../hanldler/workflow_handler";

export const workflowRouter = new Hono();

// POST /workflow
workflowRouter.post("/", async (c) => {
  const contentType = c.req.header("Content-Type") || "";

  const body = await c.req.parseBody(); // handles both types

  const workflowData = body;
  console.log("workflowData", workflowData);

  if (
    !workflowData ||
    typeof workflowData !== "object" ||
    !("nodes" in workflowData) ||
    !("transitions" in workflowData)
  ) {
    return c.json({ error: "Invalid workflow data" }, 400);
  }

  try {
    const result = await createWorkflow(workflowData);
    console.log("Received workflow data:", workflowData);
    return c.json(
      { message: "Workflow created successfully", data: result },
      201
    );
  } catch (error) {
    console.error("Error creating workflow:", error);
    return c.json({ error: "Failed to create workflow" }, 500);
  }
});

// GET /workflow/:id
workflowRouter.get("/:id", async (c) => {
  const workflowId = c.req.param("id");

  try {
    const workflow = await getworkflowById(workflowId);
    if (!workflow) {
      return c.json({ error: "Workflow not found" }, 404);
    }

    return c.json({ message: "Workflow found", data: workflow }, 200);
  } catch (error) {
    console.error("Error fetching workflow:", error);
    return c.json({ error: "Failed to fetch workflow" }, 500);
  }
});
