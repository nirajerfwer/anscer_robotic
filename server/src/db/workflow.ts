import mongoose, { Model } from "mongoose";

interface IWorkflow extends mongoose.Document {
    nodes: Array<{
        id: number;
        name: string;
        position: Array<{ x: number; y: number }>;
    }>;
    transitions: Array<{
        from: number;
        to: number;
    }>;
    name: string;
}

const workflowSchema = new mongoose.Schema(
  {
    nodes: [
      {
        id: { type: Number, required: true },
        name: { type: String, required: true },
        position:[{x: Number, y: Number,_id: false}],
        _id: false
      },
    ],
    transitions: [
      {
        from: { type: Number, required: true },
        to: { type: Number, required: true },
        _id: false
      },
    ],
    name: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const WorkflowModel: Model<IWorkflow> = mongoose.model<IWorkflow>(
  "Workflow",
  workflowSchema
);

export default WorkflowModel;
